import "./EventDetail.css";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteEventAsync } from "../../features/events/eventSlice";

export const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const event = useSelector((state) =>
    state.events.events.find((event) => event._id === id)
  );
  const volunteers = useSelector((state) => state.volunteers.volunteers);

  const registeredVolunteers = volunteers.filter((volunteer) =>
    volunteer.assignedEvents.some((e) => e._id === event._id)
  );

  if (!event) {
    return <div>Event not found.</div>;
  }

  const date = new Date(event.date);

  const handleDelete = (id) => {
    dispatch(deleteEventAsync(id));
    navigate("/");
  };

  return (
    <div className="event-details-page">
      <h2>Event Detail</h2>

      <div className="event-details-container">
        <table className="horizontal-table">
          <tr>
            <th>Name:</th>
            <td>{event.name}</td>
          </tr>
          <tr>
            <th>Date:</th>
            <td>{`${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}</td>
          </tr>
          <tr>
            <th>Location:</th>
            <td>{event.location}</td>
          </tr>
          <tr>
            <th>Description:</th>
            <td>{event.description}</td>
          </tr>
          <tr>
            <th>Volunteer Role Requirements:</th>
            <td>
              <ul className="list">
                {event.volunteerRoleRequirements.map((requirement) => {
                  return (
                    <li key={requirement.role}>
                      {requirement.role}: {requirement.requiredVolunteers}{" "}
                      volunteers
                    </li>
                  );
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Registered Volunteers:</th>
            <td>
              {registeredVolunteers.length === 0 && "No volunteers registered"}
              <ul className="list">
                {registeredVolunteers.map((volunteer) => {
                  return <li key={volunteer?._id}>{volunteer?.name}</li>;
                })}
              </ul>
            </td>
          </tr>
        </table>
      </div>

      <div className="buttons-container">
        <Link to={`/events/edit/${event._id}`} state={event}>
          <button className="primary-button">Edit Details</button>
        </Link>
        <button
          className="secondary-button"
          onClick={() => handleDelete(event._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
