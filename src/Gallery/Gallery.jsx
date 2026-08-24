import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";
import { FaCamera, FaArrowRight } from "react-icons/fa";

const images = [
  {
    id: 1,
    image: "/images/img1.webp",
    title: "India TV Debate Show Visit",
    desc: "Witnessing live arguments and engaging with new perspectives.",
  },
  {
    id: 2,
    image: "/images/img2.webp",
    title: "Fingerprints for Freedom Drive",
    desc: "Uniting students through a symbol of freedom.",
  },
  {
    id: 3,
    image: "/images/event2.webp",
    title: "Study Material Donation",
    desc: "Supporting students with accessible study resources.",
  },
  {
    id: 4,
    image: "/images/img4.webp",
    title: "Classroom Interaction",
    desc: "Listening to students and addressing their concerns.",
  },
  {
    id: 5,
    image: "/images/img7.webp",
    title: "Supreme Court Visit",
    desc: "Giving students new experiences beyond the campus.",
  },
  {
    id: 6,
    image: "/images/img6.webp",
    title: "Community Outreach",
    desc: "Reaching Out, listening, and creating meaningful change.",
  },
];

function Gallery() {
  const navigate = useNavigate();

  const cardRefs = useRef([]);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setLoadedImages((prev) => ({
              ...prev,
              [index]: true,
            }));

            observer.disconnect();
          }
        },
        {
          rootMargin: "200px 0px",
          threshold: 0,
        }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  return (
    <section className="gallery">
      <div className="gallery-heading">
        <span className="tag">OUR MOMENTS</span>

        <h2>
          Campaign <span>Gallery</span>
        </h2>

        <p>
          Every campaign begins with listening, every achievement begins with
          action. Here are some memorable moments from our journey.
        </p>
      </div>

      <div className="gallery-grid">
        {images.map((item, index) => (
          <div
            className="gallery-card"
            key={item.id}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
          >
            {loadedImages[index] && (
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                decoding="async"
              />
            )}

            <div className="overlay">
              <div className="overlay-content">
                <div className="camera">
                  <FaCamera />
                </div>

                <h3>{item.title}</h3>

                <p>{item.desc}</p>

                <button
                  type="button"
                  onClick={() => navigate("/events")}
                >
                  Explore
                  <FaArrowRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;