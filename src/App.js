import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import {
  EventView,
  EventForm,
  EventDetail,
  VolunteerView,
  VolunteerForm,
  VolunteerDetail,
} from "./components/index";

export default function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<EventView />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events/add" element={<EventForm />} />
        <Route path="/events/edit/:id" element={<EventForm />} />
        <Route path="/volunteers" element={<VolunteerView />} />
        <Route path="/volunteers/:id" element={<VolunteerDetail />} />
        <Route path="/volunteers/add" element={<VolunteerForm />} />
        <Route path="/volunteers/edit/:id" element={<VolunteerForm />} />
      </Routes>
    </div>
  );
}
