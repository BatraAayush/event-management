import "./EventList.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export const EventList = ({ events }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="event-list-container">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const date = new Date(event.date);
              return (
                <tr
                  key={event._id}
                  onClick={() => navigate(`/events/${event._id}`)}
                  className="table-row"
                >
                  <td>{event.name}</td>
                  <td>{`${date.getDate()}-${
                    date.getMonth() + 1
                  }-${date.getFullYear()}`}</td>
                  <td>{event.location}</td>
                  <td>{event.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
