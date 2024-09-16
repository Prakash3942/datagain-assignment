// src/redux/calendarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
    id: string;
    title: string;
    start: Date;
    end: Date;
    type: 'event' | 'reminder';
}

interface CalendarState {
    events: Event[];
}

const initialState: CalendarState = {
    events: [],
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<Event>) => {
            state.events.push(action.payload);
        },
    },
});

export const { addEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
