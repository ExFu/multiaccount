import { calendar as calendarApi, type calendar_v3 } from "@googleapis/calendar";
import type { OAuth2Client } from "google-auth-library";

export interface CalendarEventOptions {
  timeMin?: string;
  timeMax?: string;
  query?: string;
  maxResults: number;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
  location?: string;
  organizer?: string;
  attendees?: number;
  status?: string;
  htmlLink?: string;
}

export interface CalendarEventInput {
  summary: string;
  start: string;
  end: string;
  timeZone?: string;
  description?: string;
  location?: string;
  attendees?: string[];
}

export interface CalendarEventPatch {
  summary?: string;
  start?: string;
  end?: string;
  timeZone?: string;
  description?: string;
  location?: string;
  attendees?: string[];
}

export interface DeletedCalendarEvent {
  eventId: string;
  deleted: true;
}

function calendarClient(client: OAuth2Client): calendar_v3.Calendar {
  return calendarApi({
    version: "v3",
    auth: client as unknown as calendar_v3.Options["auth"],
  });
}

function eventTime(value: string, timeZone?: string): calendar_v3.Schema$EventDateTime {
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return { date: value };
  }
  return { dateTime: value, ...(timeZone ? { timeZone } : {}) };
}

function mappedEvent(event: calendar_v3.Schema$Event): CalendarEvent {
  return {
    id: event.id ?? "",
    summary: event.summary ?? "",
    start: event.start?.dateTime ?? event.start?.date ?? "",
    end: event.end?.dateTime ?? event.end?.date ?? "",
    ...(event.location ? { location: event.location } : {}),
    ...(event.organizer?.email ? { organizer: event.organizer.email } : {}),
    ...(event.attendees ? { attendees: event.attendees.length } : {}),
    ...(event.status ? { status: event.status } : {}),
    ...(event.htmlLink ? { htmlLink: event.htmlLink } : {}),
  };
}

export async function listEvents(
  client: OAuth2Client,
  options: CalendarEventOptions,
): Promise<CalendarEvent[]> {
  const timeMin = !options.timeMin && !options.timeMax ? new Date().toISOString() : options.timeMin;
  const response = await calendarClient(client).events.list({
    calendarId: "primary",
    singleEvents: true,
    orderBy: "startTime",
    maxResults: options.maxResults,
    ...(timeMin ? { timeMin } : {}),
    ...(options.timeMax ? { timeMax: options.timeMax } : {}),
    ...(options.query ? { q: options.query } : {}),
  });

  return (response.data.items ?? []).map(mappedEvent);
}

export async function createEvent(
  client: OAuth2Client,
  input: CalendarEventInput,
): Promise<CalendarEvent> {
  const response = await calendarClient(client).events.insert({
    calendarId: "primary",
    sendUpdates: "none",
    requestBody: {
      summary: input.summary,
      start: eventTime(input.start, input.timeZone),
      end: eventTime(input.end, input.timeZone),
      ...(input.description !== undefined ? { description: input.description } : {}),
      ...(input.location !== undefined ? { location: input.location } : {}),
      ...(input.attendees !== undefined
        ? { attendees: input.attendees.map((email) => ({ email })) }
        : {}),
    },
  });
  return mappedEvent(response.data);
}

export async function updateEvent(
  client: OAuth2Client,
  eventId: string,
  patch: CalendarEventPatch,
): Promise<CalendarEvent> {
  const response = await calendarClient(client).events.patch({
    calendarId: "primary",
    eventId,
    sendUpdates: "none",
    requestBody: {
      ...(patch.summary !== undefined ? { summary: patch.summary } : {}),
      ...(patch.start !== undefined ? { start: eventTime(patch.start, patch.timeZone) } : {}),
      ...(patch.end !== undefined ? { end: eventTime(patch.end, patch.timeZone) } : {}),
      ...(patch.description !== undefined ? { description: patch.description } : {}),
      ...(patch.location !== undefined ? { location: patch.location } : {}),
      ...(patch.attendees !== undefined
        ? { attendees: patch.attendees.map((email) => ({ email })) }
        : {}),
    },
  });
  return mappedEvent(response.data);
}

export async function deleteEvent(
  client: OAuth2Client,
  eventId: string,
): Promise<DeletedCalendarEvent> {
  await calendarClient(client).events.delete({
    calendarId: "primary",
    eventId,
    sendUpdates: "none",
  });
  return { eventId, deleted: true };
}
