import "./Marquee.css";

import {
  FaUsers,
  FaBolt,
  FaComments,
  FaSeedling,
  FaBullseye,
  FaHeart,
  FaRocket,
  FaGlobeAsia,
} from "react-icons/fa";

const values = [
  {
    icon: <FaUsers />,
    title: "Listening First",
    desc: "Every voice matters before every decision.",
  },
  {
    icon: <FaBolt />,
    title: "Action Driven",
    desc: "Promises backed by meaningful action.",
  },
  {
    icon: <FaComments />,
    title: "Open Dialogue",
    desc: "Real conversations create real change.",
  },
  {
    icon: <FaSeedling />,
    title: "Growth Mindset",
    desc: "Small improvements. Big impact.",
  },
  {
    icon: <FaBullseye />,
    title: "Student Focus",
    desc: "Every initiative starts with students.",
  },
  {
    icon: <FaHeart />,
    title: "Respect Always",
    desc: "Unity, equality and mutual respect.",
  },
  {
    icon: <FaRocket />,
    title: "Innovation",
    desc: "Fresh ideas for a smarter campus.",
  },
  {
    icon: <FaGlobeAsia />,
    title: "Together We Rise",
    desc: "Progress becomes stronger together.",
  },
];

// Duplicate for infinite loop
const marqueeItems = [...values, ...values];

function Marquee() {
  return (
    <section className="campaign-section">

      <div className="campaign-heading">

        <span className="campaign-tag">
          WHAT DEFINES US
        </span>

        <h2>
          More Than Just <span>Promises</span>
        </h2>

        <p>
          Leadership is not about making promises.
          It is about creating trust through actions,
          responsibility and consistency.
        </p>

      </div>

      <div className="marquee-wrapper">

        <div className="fade-left"></div>
        <div className="fade-right"></div>

        <div className="marquee-track marquee-track-left">

          {marqueeItems.map((item, index) => (

            <div className="value-card" key={index}>

              <div className="value-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.desc}</p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Marquee;