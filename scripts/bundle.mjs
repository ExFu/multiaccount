import { createRequire } from "node:module";
import { mkdir, readFile } from "node:fs/promises";
import { dirname } from "node:path";
import { build } from "esbuild";

const outputs = [
  ["src/index.ts", "plugins/exfu-multiaccount/server/index.mjs"],
  ["src/cli.ts", "plugins/exfu-multiaccount/server/cli.mjs"],
];

const createRequireBanner =
  "import { createRequire } from 'node:module'; const require = createRequire(import.meta.url);";
const require = createRequire(import.meta.url);
const googleapisCommonPath = require.resolve("googleapis-common", {
  paths: [dirname(require.resolve("@googleapis/gmail"))],
});
const googleAuthPath = require.resolve("google-auth-library");
const googleApiSpecs = {
  "@googleapis/calendar": ["calendar", "calendar_v3", "v3", "Calendar"],
  "@googleapis/docs": ["docs", "docs_v1", "v1", "Docs"],
  "@googleapis/drive": ["drive", "drive_v3", "v3", "Drive"],
  "@googleapis/gmail": ["gmail", "gmail_v1", "v1", "Gmail"],
};

const selectedGoogleApiVersions = {
  name: "selected-google-api-versions",
  setup(esbuild) {
    esbuild.onResolve(
      { filter: /^@googleapis\/(?:calendar|docs|drive|gmail)$/ },
      (args) => ({ path: args.path, namespace: "selected-google-api" }),
    );
    esbuild.onLoad({ filter: /.*/, namespace: "selected-google-api" }, (args) => {
      const [factory, apiNamespace, version, className] = googleApiSpecs[args.path];
      const versionModule = `${dirname(require.resolve(args.path))}/${version}.js`;
      return {
        contents: [
          'import { getAPI } from "googleapis-common";',
          `import { ${apiNamespace} } from ${JSON.stringify(versionModule)};`,
          `const versions = { ${version}: ${apiNamespace}.${className} };`,
          `export function ${factory}(versionOrOptions) {`,
          `  return getAPI(${JSON.stringify(factory)}, versionOrOptions, versions, this);`,
          "}",
        ].join("\n"),
        loader: "js",
        resolveDir: "/",
      };
    });
  },
};

const leanGoogleRuntime = {
  name: "lean-google-runtime",
  setup(esbuild) {
    esbuild.onResolve({ filter: /^googleapis-common$/ }, () => ({
      path: "common",
      namespace: "lean-google-runtime",
    }));
    esbuild.onResolve({ filter: /^google-auth-library$/ }, () => ({
      path: "auth",
      namespace: "lean-google-runtime",
    }));
    esbuild.onLoad({ filter: /.*/, namespace: "lean-google-runtime" }, (args) => {
      if (args.path === "auth") {
        const oauth2Client = `${dirname(googleAuthPath)}/auth/oauth2client.js`;
        return {
          contents:
            `import { OAuth2Client } from ${JSON.stringify(oauth2Client)};\n` +
            "export { OAuth2Client };",
          loader: "js",
          resolveDir: "/",
        };
      }
      const commonDirectory = dirname(googleapisCommonPath);
      return {
        contents:
          `export { getAPI } from ${JSON.stringify(`${commonDirectory}/apiIndex.js`)};\n` +
          `export { createAPIRequest } from ${JSON.stringify(`${commonDirectory}/apirequest.js`)};`,
        loader: "js",
        resolveDir: "/",
      };
    });
  },
};

const compactPdfParse = {
  name: "compact-pdf-parse",
  setup(esbuild) {
    esbuild.onLoad({ filter: /pdf-parse[/\\]lib[/\\]pdf-parse\.js$/ }, async (args) => {
      const dynamicLoader = "require(`./pdf.js/${options.version}/build/pdf.js`)";
      const source = await readFile(args.path, "utf8");
      if (!source.includes(dynamicLoader)) {
        throw new Error("pdf-parse default loader was not found");
      }
      return {
        contents: source.replace(
          dynamicLoader,
          'require("./pdf.js/v1.10.100/build/pdf.js")',
        ),
        loader: "js",
      };
    });
    esbuild.onResolve({ filter: /^\.\/pdf\.worker\.js$/ }, (args) => {
      if (
        /pdf-parse[/\\]lib[/\\]pdf\.js[/\\]v1\.10\.100[/\\]build[/\\]pdf\.js$/.test(
          args.importer,
        )
      ) {
        return { path: "disabled", namespace: "disabled-pdf-worker" };
      }
      return undefined;
    });
    esbuild.onLoad({ filter: /.*/, namespace: "disabled-pdf-worker" }, () => ({
      contents: "module.exports = {};",
      loader: "js",
    }));
  },
};

await Promise.all(
  outputs.map(async ([entryPoint, outfile]) => {
    await mkdir(dirname(outfile), { recursive: true });
    await build({
      entryPoints: [entryPoint],
      outfile,
      bundle: true,
      platform: "node",
      format: "esm",
      target: "node20",
      minify: false,
      sourcemap: false,
      external: ["canvas"],
      banner: { js: createRequireBanner },
      charset: "utf8",
      legalComments: "none",
      plugins: [selectedGoogleApiVersions, leanGoogleRuntime, compactPdfParse],
    });
  }),
);
