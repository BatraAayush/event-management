import "./VolunteerForm.css";
import "../../App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addVolunteerAsync,
  updateVolunteerAsync,
} from "../../features/volunteers/volunteerSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { validateVolunteerInput } from "./utils";
import { fetchEvents } from "../../features/events/eventSlice";

export const VolunteerForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const events = useSelector((state) => state.events.events);

  const volunteer = state ? state : null;

  const [volunteerInput, setVolunteerInput] = useState({
    name: volunteer ? volunteer.name : "",
    contact: volunteer ? volunteer.contact : 0,
    availability: volunteer ? volunteer.availability : false,
    skills: volunteer ? volunteer.skills : [],
    areasOfInterest: volunteer ? volunteer.areasOfInterest : [],
    assignedEvents: volunteer
      ? [volunteer.assignedEvents[0]?._id]
      : events.length > 0
      ? [events[0]._id]
      : [],
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidated = validateVolunteerInput(volunteerInput);

    if (isValidated) {
      setError("");

      if (volunteer) {
        dispatch(
          updateVolunteerAsync({
            id: volunteer._id,
            updatedVolunteer: volunteerInput,
          })
        );
        navigate(`/volunteers/${volunteer._id}`);
      } else {
        dispatch(addVolunteerAsync(volunteerInput));
        navigate("/volunteers");
      }
    } else {
      setError("Please fill all the required fields");
    }
  };

  return (
    <div className="volunteer-form-container">
      <h2>{volunteer ? "Edit Volunteer" : "Add Volunteer"}</h2>

      <form className="volunteer-form">
        <label className="label">
          Name:
          <input
            placeholder="Enter Name"
            type="text"
            value={volunteerInput.name}
            onChange={(e) =>
              setVolunteerInput({ ...volunteerInput, name: e.target.value })
            }
            required
          />
        </label>

        <label className="label">
          Contact:
          <input
            placeholder="Enter Contact No."
            name="contact"
            type="number"
            value={volunteerInput.contact}
            onChange={(e) =>
              setVolunteerInput({
                ...volunteerInput,
                contact: e.target.value,
              })
            }
            required
          />
        </label>

        <label className="label">
          Availability:
          <input
            placeholder="Enter Name"
            type="checkbox"
            checked={
              volunteerInput.availability === "true" ||
              volunteerInput.availability === true
                ? true
                : false
            }
            value={volunteerInput.availability}
            onChange={(e) =>
              setVolunteerInput({
                ...volunteerInput,
                availability: !volunteerInput.availability,
              })
            }
            required
          />
        </label>

        <label className="label">
          Skills: (seperated by comma)
          <input
            placeholder="Enter Skills"
            type="text"
            value={volunteerInput.skills.join(",")}
            onChange={(e) =>
              setVolunteerInput({
                ...volunteerInput,
                skills: e.target.value.split(","),
              })
            }
            required
          />
        </label>

        <label className="label">
          Areas of Interest: (seperated by comma)
          <input
            placeholder="Enter Interests"
            type="text"
            value={volunteerInput.areasOfInterest.join(",")}
            onChange={(e) =>
              setVolunteerInput({
                ...volunteerInput,
                areasOfInterest: e.target.value.split(","),
              })
            }
            required
          />
        </label>

        <label className="label">
          Assign Event:
          {events.length === 0 && <p className="error">* No event available</p>}
          {events.length > 0 && (
            <select
              onChange={(e) => {
                setVolunteerInput({
                  ...volunteerInput,
                  assignedEvents: [e.target.value],
                });
              }}
              value={volunteerInput.assignedEvents[0] || ""}
            >
              {events.map(({ _id, name }) => {
                return (
                  <option value={_id} key={_id}>
                    {name}
                  </option>
                );
              })}
            </select>
          )}
        </label>

        {error && <small className="error">{error}</small>}

        <button className="volunteer-add-button" onClick={handleSubmit}>
          {volunteer ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};
