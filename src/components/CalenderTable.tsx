import React, { useState } from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { addEvent } from "../store/calenderSlice";
import { Dialog, Button, TextField, Box } from "@mui/material";
import moment from "moment";
import { styled } from "@mui/material/styles";

const localizer = momentLocalizer(moment);

const StyledEvent = styled("div")<{ eventType: "event" | "reminder" }>(
  ({ eventType }) => ({
    backgroundColor: eventType === "event" ? "blue" : "orange",
    color: "white",
    borderRadius: "4px",
    padding: "5px",
    textAlign: "center",
    fontSize: "0.8rem",
  })
);

const CalendarComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.calendar.events);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"event" | "reminder">("event");
  const [formData, setFormData] = useState<{
    title: string;
    start: Date | null;
    end: Date | null;
  }>({
    title: "",
    start: null,
    end: null,
  });

  const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setOpenDialog(true);
    setFormData({ ...formData, start: slotInfo.start, end: slotInfo.end });
  };

  const handleSave = () => {
    if (formData.title && formData.start && formData.end) {
      dispatch(
        addEvent({ ...formData, id: `${Date.now()}`, type: dialogType })
      );
      setOpenDialog(false);
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        components={{
          event: ({ event }: { event: Event }) => (
            <StyledEvent eventType={event.type}>{event.title}</StyledEvent>
          ),
        }}
        style={{ height: 600 }}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div style={{ padding: 20 }}>
          <TextField
            label="Title"
            fullWidth
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Box sx={{ mt: 1, display: "flex", gap: "10px" }}>
            <Button
              variant="outlined"
              sx={{
                border: "2px solid #a6eced",
                color: "#000",
                fontWeight: 500,
              }}
              onClick={() => {
                setDialogType("event");
                handleSave();
              }}
            >
              Add Event
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: " #a6eced",
                color: "#000",
                fontWeight: 500,
              }}
              onClick={() => {
                setDialogType("reminder");
                handleSave();
              }}
            >
              Add Reminder
            </Button>
          </Box>
        </div>
      </Dialog>
    </div>
  );
};

export default CalendarComponent;
