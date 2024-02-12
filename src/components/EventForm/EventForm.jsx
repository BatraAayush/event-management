import "./EventForm.css";
import "../../App.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addEventAsync,
  updateEventAsync,
} from "../../features/events/eventSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { validateEventInput, volunteerRoles, validateRoleInput } from "./utils";

export const EventForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [roleRequirements, setRoleRequirements] = useState({
    role: "",
    requiredVolunteers: 0,
  });

  const event = state ? state : null;

  const [eventInput, setEventInput] = useState({
    name: event ? event.name : "",
    date: event
      ? `${new Date(event.date).getFullYear()}-${
          new Date(event.date).getMonth() + 1
        }-${String(new Date(event.date).getDate()).padStart(2, "0")}`
      : "",
    location: event ? event.location : "",
    description: event ? event.description : "",
    volunteerRoleRequirements: event ? event.volunteerRoleRequirements : [],
  });

  const handleAddRole = (e) => {
    e.preventDefault();

    const isRoleValidate = validateRoleInput(roleRequirements);

    if (isRoleValidate) {
      setError("");

      eventInput.volunteerRoleRequirements = [
        ...eventInput.volunteerRoleRequirements,
        roleRequirements,
      ];

      setRoleRequirements({
        role: "",
        requiredVolunteers: 0,
      });
    } else {
      setError("Please select the role and required number of volunteers");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = validateEventInput(eventInput);

    if (isValidated) {
      setError("");

      if (event) {
        dispatch(updateEventAsync({ id: event._id, updatedEvent: eventInput }));
        navigate(`/events/${event._id}`);
      } else {
        dispatch(addEventAsync(eventInput));
        navigate("/");
      }
    } else {
      setError("Please fill all the required fields");
    }
  };

  return (
    <div className="event-form-container">
      <h2>{event ? "Edit Event" : "Add Event"}</h2>

      <form className="event-form">
        <label className="label">
          Name:
          <input
            placeholder="Enter Name"
            type="text"
            value={eventInput.name}
            onChange={(e) =>
              setEventInput({ ...eventInput, name: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Date:
          <input
            onChange={(e) =>
              setEventInput({
                ...eventInput,
                date: e.target.value,
              })
            }
            value={eventInput.date}
            type="date"
          />
        </label>

        <label className="label">
          Location:
          <input
            placeholder="Enter Location"
            type="text"
            value={eventInput.location}
            onChange={(e) =>
              setEventInput({ ...eventInput, location: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Description:
          <input
            placeholder="Enter Description"
            type="text"
            value={eventInput.description}
            onChange={(e) =>
              setEventInput({ ...eventInput, description: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Role:
          <select
            onChange={(e) =>
              setRoleRequirements({
                ...roleRequirements,
                role: e.target.value,
              })
            }
            value={roleRequirements.role}
          >
            {volunteerRoles.map((role) => {
              return <option key={role}>{role}</option>;
            })}
          </select>
        </label>

        <label className="label">
          Required Volunteers:
          <input
            placeholder="Enter required volunteers"
            type="number"
            min={0}
            value={roleRequirements.requiredVolunteers}
            onChange={(e) =>
              setRoleRequirements({
                ...roleRequirements,
                requiredVolunteers: e.target.value,
              })
            }
            required
          />
        </label>

        <button className="event-add-button" onClick={handleAddRole}>
          Add role
        </button>

        <div className="all-roles-list">
          <p>All roles:</p>
          <ol>
            {eventInput.volunteerRoleRequirements.map((role) => {
              return (
                <li key={role.role}>
                  {role.role}: {role.requiredVolunteers}
                </li>
              );
            })}
          </ol>
        </div>

        {error && <small className="error">{error}</small>}

        <button className="event-add-button" onClick={handleSubmit}>
          {event ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
