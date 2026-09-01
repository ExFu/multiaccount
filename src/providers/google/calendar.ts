import { google, type Auth, type calendar_v3 } from "googleapis";

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
}

function calendarClient(client: Auth.OAuth2Client): calendar_v3.Calendar {
  return google.calendar({ version: "v3", auth: client });
}

export async function listEvents(
  client: Auth.OAuth2Client,
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

  return (response.data.items ?? []).map((event) => ({
    id: event.id ?? "",
    summary: event.summary ?? "",
    start: event.start?.dateTime ?? event.start?.date ?? "",
    end: event.end?.dateTime ?? event.end?.date ?? "",
    ...(event.location ? { location: event.location } : {}),
    ...(event.organizer?.email ? { organizer: event.organizer.email } : {}),
    ...(event.attendees ? { attendees: event.attendees.length } : {}),
    ...(event.status ? { status: event.status } : {}),
  }));
}
