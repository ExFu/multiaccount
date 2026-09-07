import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { calendarFactory, eventsList } = vi.hoisted(() => {
  const eventsList = vi.fn();
  return {
    calendarFactory: vi.fn(() => ({ events: { list: eventsList } })),
    eventsList,
  };
});

vi.mock("@googleapis/calendar", () => ({
  calendar: calendarFactory,
}));

import { listEvents } from "../src/providers/google/calendar.js";

const client = {} as never;
let home: string;

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-calendar-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-09-01T10:15:30.000Z"));
  vi.clearAllMocks();
});

afterEach(async () => {
  vi.useRealTimers();
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("Google Calendar provider", () => {
  it("maps timed and all-day event fields", async () => {
    eventsList.mockResolvedValue({
      data: {
        items: [
          {
            id: "event-1",
            summary: "Planning",
            start: { dateTime: "2026-09-02T09:00:00+01:00" },
            end: { dateTime: "2026-09-02T10:00:00+01:00" },
            location: "Meeting room",
            organizer: { email: "organizer@example.com" },
            attendees: [{ email: "one@example.com" }, { email: "two@example.com" }],
            status: "confirmed",
          },
          {
            id: "event-2",
            summary: "Holiday",
            start: { date: "2026-09-03" },
            end: { date: "2026-09-04" },
          },
        ],
      },
    });

    await expect(
      listEvents(client, {
        timeMin: "2026-09-02T00:00:00Z",
        timeMax: "2026-09-05T00:00:00Z",
        query: "planning",
        maxResults: 12,
      }),
    ).resolves.toEqual([
      {
        id: "event-1",
        summary: "Planning",
        start: "2026-09-02T09:00:00+01:00",
        end: "2026-09-02T10:00:00+01:00",
        location: "Meeting room",
        organizer: "organizer@example.com",
        attendees: 2,
        status: "confirmed",
      },
      {
        id: "event-2",
        summary: "Holiday",
        start: "2026-09-03",
        end: "2026-09-04",
      },
    ]);
    expect(eventsList).toHaveBeenCalledWith({
      calendarId: "primary",
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 12,
      timeMin: "2026-09-02T00:00:00Z",
      timeMax: "2026-09-05T00:00:00Z",
      q: "planning",
    });
  });

  it("defaults timeMin to now when neither time bound is provided", async () => {
    eventsList.mockResolvedValue({ data: { items: [] } });

    await listEvents(client, { maxResults: 25 });

    expect(eventsList).toHaveBeenCalledWith({
      calendarId: "primary",
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 25,
      timeMin: "2026-09-01T10:15:30.000Z",
    });
  });
});
