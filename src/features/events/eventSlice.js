import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils";

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const response = await axios.get(`${BASE_URL}/events`);
  return response.data.events;
});

export const addEventAsync = createAsyncThunk(
  "events/addEventAsync",
  async (newEvent) => {
    const response = await axios.post(`${BASE_URL}/events`, newEvent);
    return response.data.event;
  }
);

export const updateEventAsync = createAsyncThunk(
  "events/updateEventAsync",
  async ({ id, updatedEvent }) => {
    const response = await axios.post(`${BASE_URL}/events/${id}`, updatedEvent);
    return response.data.event;
  }
);

export const deleteEventAsync = createAsyncThunk(
  "events/deleteEventAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/events/${id}`);
    return response.data.event;
  }
);

export const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchEvents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = "success";
      state.events = action.payload;
      state.error = "";
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.events.push(action.payload);
      state.error = "";
    },
    [addEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedEvent = action.payload;
      const index = state.events.findIndex(
        (event) => event._id === updatedEvent._id
      );

      if (index !== -1) {
        state.events[index] = updatedEvent;
      }
      state.error = "";
    },
    [updateEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteEventAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteEventAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const deletedEvent = action.payload;
      state.events = state.events.filter(
        (event) => event._id !== deletedEvent._id
      );
      state.error = "";
    },
    [deleteEventAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default eventSlice.reducer;
