import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";

const images = [
  "/images/slide1.webp",
  "/images/slide2.webp",
  "/images/slide3.webp",
  "/images/slide4.webp",
  "/images/slide5.webp",
  "/images/slide6.webp",
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState([
    {
      src: images[0],
      index: 0,
    },
    null,
  ]);

  const activeSlot = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const nextIndex = (current + 1) % images.length;
    const nextSlot = activeSlot.current === 0 ? 1 : 0;

    /*
      Load the next slide after the current page has rendered.
      This uses the actual <img> element instead of creating
      another Image() request.
    */
    const preloadTimer = setTimeout(() => {
      setSlides((prev) => {
        const updated = [...prev];

        updated[nextSlot] = {
          src: images[nextIndex],
          index: nextIndex,
        };

        return updated;
      });
    }, 800);

    /*
      Change to the already-loaded next slide.
    */
    const sliderTimer = setTimeout(() => {
      activeSlot.current = nextSlot;
      setCurrent(nextIndex);
    }, 4500);

    return () => {
      clearTimeout(preloadTimer);
      clearTimeout(sliderTimer);
    };
  }, [current]);

  return (
    <section className="hero">
      {/* IMAGE */}
      <div className="hero-visual">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${
              activeSlot.current === index ? "active" : ""
            }`}
          >
            {slide && (
              <img
                src={slide.src}
                alt={`Campaign moment ${slide.index + 1}`}
                fetchPriority={slide.index === 0 ? "high" : "auto"}
                decoding="async"
              />
            )}
          </div>
        ))}

        <div className="hero-visual-shade"></div>

        <div className="hero-counter">
          <strong>{String(current + 1).padStart(2, "0")}</strong>
          <span></span>
          <small>{String(images.length).padStart(2, "0")}</small>
        </div>
      </div>

      {/* CONTENT */}
      <div className="hero-content">
        <div className="hero-content-inner">
          <div className="hero-label">
            <span></span>
            LC-II ELECTIONS 2026
          </div>

          <h1>
            A Voice
            <br />
            <em>That Matters.</em>
          </h1>

          <p>
            Representation that listens, leadership that acts, and a vision
            built around every student's voice.
          </p>

          {/* BUTTONS */}
          <div className="hero-actions">
            <button
              type="button"
              onClick={() => navigate("/study-material")}
            >
              <span>Study Material</span>
              <strong>↗</strong>
            </button>

            <button
              type="button"
              onClick={() => navigate("/connect")}
            >
              <span>Help & Feedback</span>
              <strong>↗</strong>
            </button>

            <button
              type="button"
              onClick={() => navigate("/internship")}
            >
              <span>Apply Internship</span>
              <strong>↗</strong>
            </button>

            <button
              type="button"
              onClick={() => navigate("/bulletin")}
            >
              <span>Bulletin</span>
              <strong>↗</strong>
            </button>
          </div>

          <div className="hero-values">
            <span>LISTEN</span>
            <i></i>
            <span>REPRESENT</span>
            <i></i>
            <span>DELIVER</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;