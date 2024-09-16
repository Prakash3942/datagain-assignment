export interface CalendarEvent {
    id: string;
    date: string;
    title: string;
    type: 'event' | 'reminder';
}