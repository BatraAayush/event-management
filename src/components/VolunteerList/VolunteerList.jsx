import "./VolunteerList.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

export const VolunteerList = ({ volunteers }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="volunteer-list-container">
        <table className="table">
          <thead className="table-head">
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.map((volunteer) => (
              <tr
                key={volunteer._id}
                onClick={() => navigate(`/volunteers/${volunteer._id}`)}
                className="table-row"
              >
                <td>{volunteer.name}</td>
                <td>{volunteer.contact}</td>
                <td>
                  {volunteer.availability === "true"
                    ? "Available"
                    : "Not available"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
