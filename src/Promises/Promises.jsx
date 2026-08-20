import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Promises.css";

import { FaUserGraduate, FaBullhorn, FaHandsHelping } from "react-icons/fa";

const promises = [
  {
    id: 1,
    icon: <FaUserGraduate />,
    title: "Student First Approach",
    desc: "Ensuring every student's voice is heard with transparent communication, timely support, and equal representation across all departments.",
  },
  {
    id: 2,
    icon: <FaBullhorn />,
    title: "Better Campus Experience",
    desc: "Working towards improved infrastructure, cultural events, sports opportunities, academic resources, and stronger student engagement.",
  },
  {
    id: 3,
    icon: <FaHandsHelping />,
    title: "Transparent Leadership",
    desc: "Building trust through accountability, regular updates, open discussions, and responsible decision-making for every student.",
  },
];

function KeyPromises() {
  const navigate = useNavigate();

  return (
    <section className="promises">
      <div className="section-heading">
        <span></span>

        <h2>
          OUR <span>KEY PROMISES</span>
        </h2>

        <span></span>
      </div>

      <p className="section-subtitle">
        Together, we aim to create a campus where every student gets equal
        opportunities, better facilities, and a stronger voice.
      </p>

      <div className="promise-container">
        {promises.map((item) => (
          <div className="promise-card" key={item.id}>
            <div className="promise-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            <button type="button" onClick={() => navigate("/manifesto")}>
              Learn More →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default KeyPromises;
