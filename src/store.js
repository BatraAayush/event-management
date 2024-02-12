import { configureStore } from "@reduxjs/toolkit";
import { eventSlice } from "./features/events/eventSlice";
import { volunteerSlice } from "./features/volunteers/volunteerSlice";

export default configureStore({
  reducer: {
    events: eventSlice.reducer,
    volunteers: volunteerSlice.reducer,
  },
});
