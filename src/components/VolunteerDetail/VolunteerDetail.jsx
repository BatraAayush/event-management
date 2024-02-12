import "./VolunteerDetail.css";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteVolunteerAsync } from "../../features/volunteers/volunteerSlice";

export const VolunteerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const volunteer = useSelector((state) =>
    state.volunteers.volunteers.find((volunteer) => volunteer._id === id)
  );

  if (!volunteer) {
    return <div>Volunteer not found.</div>;
  }

  const handleDelete = (id) => {
    dispatch(deleteVolunteerAsync(id));
    navigate("/volunteers");
  };

  return (
    <div className="volunteer-details-page">
      <h2>Volunteer Detail</h2>

      <div className="event-details-container">
        <table className="horizontal-table">
          <tr>
            <th>Name:</th>
            <td>{volunteer.name}</td>
          </tr>
          <tr>
            <th>Contact:</th>
            <td>{volunteer.contact}</td>
          </tr>
          <tr>
            <th>Availability:</th>
            <td>
              {volunteer.availability === "true"
                ? "Available"
                : "Not available"}
            </td>
          </tr>
          <tr>
            <th>Skills:</th>
            <td>
              <ul className="list">
                {volunteer.skills.map((skill) => {
                  return <li key={skill}>{skill}</li>;
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Areas of Interest:</th>
            <td>
              <ul className="list">
                {volunteer.areasOfInterest.map((interest) => {
                  return <li key={interest}>{interest}</li>;
                })}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Registered Events:</th>
            <td>
              {volunteer.assignedEvents.length === 0 &&
                "Not registered for any events"}
              <ul className="list">
                {volunteer.assignedEvents.map((event) => {
                  return <li key={event?._id}>{event?.name}</li>;
                })}
              </ul>
            </td>
          </tr>
        </table>
      </div>

      <div className="buttons-container">
        <Link to={`/volunteers/edit/${volunteer._id}`} state={volunteer}>
          <button className="primary-button">Edit Details</button>
        </Link>
        <button
          className="secondary-button"
          onClick={() => handleDelete(volunteer._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
