import "./VolunteerView.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVolunteers } from "../../features/volunteers/volunteerSlice";
import { VolunteerList } from "../VolunteerList/VolunteerList";
import { Link } from "react-router-dom";

export const VolunteerView = () => {
  const dispatch = useDispatch();
  const volunteers = useSelector((state) => state.volunteers.volunteers);
  const status = useSelector((state) => state.volunteers.status);
  const error = useSelector((state) => state.volunteers.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVolunteers());
    }
  }, []);

  return (
    <div className="volunteers-view">
      <h2>Volunteer View</h2>

      <Link to={`/volunteers/add`}>
        <button className="primary-button">Add volunteer</button>
      </Link>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}

      <VolunteerList volunteers={volunteers} />
    </div>
  );
};
