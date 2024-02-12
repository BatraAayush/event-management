import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils";

const initialState = {
  volunteers: [],
  status: "idle",
  error: null,
};

export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async () => {
    const response = await axios.get(`${BASE_URL}/volunteers`);
    return response.data.volunteers;
  }
);

export const addVolunteerAsync = createAsyncThunk(
  "volunteers/addVolunteerAsync",
  async (newVolunteer) => {
    const response = await axios.post(`${BASE_URL}/volunteers`, newVolunteer);
    return response.data.volunteer;
  }
);

export const updateVolunteerAsync = createAsyncThunk(
  "volunteers/updateVolunteerAsync",
  async ({ id, updatedVolunteer }) => {
    const response = await axios.post(
      `${BASE_URL}/volunteers/${id}`,
      updatedVolunteer
    );
    return response.data.volunteer;
  }
);

export const deleteVolunteerAsync = createAsyncThunk(
  "volunteers/deleteVolunteerAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/volunteers/${id}`);
    return response.data.volunteer;
  }
);

export const volunteerSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchVolunteers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchVolunteers.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers = action.payload;
      state.error = "";
    },
    [fetchVolunteers.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.volunteers.push(action.payload);
      state.error = "";
    },
    [addVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedVolunteer = action.payload;
      const index = state.volunteers.findIndex(
        (volunteer) => volunteer._id === updatedVolunteer._id
      );
      if (index !== -1) {
        state.volunteers[index] = updatedVolunteer;
      }
      state.error = "";
    },
    [updateVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteVolunteerAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteVolunteerAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const deletedVolunteer = action.payload;
      state.volunteers = state.volunteers.filter(
        (volunteer) => volunteer._id !== deletedVolunteer._id
      );
      state.error = "";
    },
    [deleteVolunteerAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default volunteerSlice.reducer;
