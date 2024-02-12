import "./EventView.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../features/events/eventSlice";
import { fetchVolunteers } from "../../features/volunteers/volunteerSlice";
import { EventList } from "../EventList/EventList";
import { Link } from "react-router-dom";

export const EventView = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
      dispatch(fetchVolunteers());
    }
  }, []);

  return (
    <div className="events-view">
      <h2>Event View</h2>

      <Link to={`/events/add`}>
        <button className="primary-button">Add event</button>
      </Link>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}

      <EventList events={events} />
    </div>
  );
};
