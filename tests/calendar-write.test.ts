import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { calendarFactory, eventsInsert, eventsPatch } = vi.hoisted(() => {
  const eventsInsert = vi.fn();
  const eventsPatch = vi.fn();
  return {
    calendarFactory: vi.fn(() => ({ events: { insert: eventsInsert, patch: eventsPatch } })),
    eventsInsert,
    eventsPatch,
  };
});

vi.mock("@googleapis/calendar", () => ({
  calendar: calendarFactory,
}));

import { createEvent, updateEvent } from "../src/providers/google/calendar.js";

const client = {} as never;
let home: string;

beforeEach(async () => {
  home = await mkdtemp(join(tmpdir(), "exfu-calendar-write-"));
  process.env.EXFU_MULTIACCOUNT_HOME = home;
  vi.clearAllMocks();
});

afterEach(async () => {
  delete process.env.EXFU_MULTIACCOUNT_HOME;
  await rm(home, { recursive: true, force: true });
});

describe("Google Calendar writes", () => {
  it("creates a date-time event without sending attendee updates", async () => {
    eventsInsert.mockResolvedValue({
      data: {
        id: "event-1",
        summary: "Planning",
        start: { dateTime: "2026-09-02T09:00:00+01:00" },
        end: { dateTime: "2026-09-02T10:00:00+01:00" },
        attendees: [{ email: "one@example.com" }],
        htmlLink: "https://calendar.google.com/event?eid=event-1",
      },
    });

    await expect(
      createEvent(client, {
        summary: "Planning",
        start: "2026-09-02T09:00:00+01:00",
        end: "2026-09-02T10:00:00+01:00",
        timeZone: "Europe/London",
        attendees: ["one@example.com"],
      }),
    ).resolves.toEqual({
      id: "event-1",
      summary: "Planning",
      start: "2026-09-02T09:00:00+01:00",
      end: "2026-09-02T10:00:00+01:00",
      attendees: 1,
      htmlLink: "https://calendar.google.com/event?eid=event-1",
    });
    expect(eventsInsert).toHaveBeenCalledWith({
      calendarId: "primary",
      sendUpdates: "none",
      requestBody: {
        summary: "Planning",
        start: { dateTime: "2026-09-02T09:00:00+01:00", timeZone: "Europe/London" },
        end: { dateTime: "2026-09-02T10:00:00+01:00", timeZone: "Europe/London" },
        attendees: [{ email: "one@example.com" }],
      },
    });
  });

  it("patches only provided fields and detects all-day dates", async () => {
    eventsPatch.mockResolvedValue({
      data: {
        id: "event-2",
        summary: "Holiday",
        start: { date: "2026-09-03" },
        end: { date: "2026-09-04" },
        location: "",
      },
    });

    await updateEvent(client, "event-2", {
      start: "2026-09-03",
      end: "2026-09-04",
      timeZone: "Europe/London",
      location: "",
    });

    expect(eventsPatch).toHaveBeenCalledWith({
      calendarId: "primary",
      eventId: "event-2",
      sendUpdates: "none",
      requestBody: {
        start: { date: "2026-09-03" },
        end: { date: "2026-09-04" },
        location: "",
      },
    });
  });
});
