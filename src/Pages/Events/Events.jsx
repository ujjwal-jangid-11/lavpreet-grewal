import { useEffect, useRef, useState } from "react";
import "./Events.css";
import events from "./EventData";
import {
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineUserGroup,
  HiOutlineChatBubbleLeftRight,
  HiOutlinePresentationChartBar,
  HiOutlineClock,
} from "react-icons/hi2";

function Events() {

  // ================= EVENT DATA =================

  const upcomingEvent =
    events.find((event) => event.status === "upcoming") || events[0];

  // ALL completed events will automatically appear here
  const pastEvents = events.filter(
    (event) => event.status === "completed"
  );


  // ================= IMAGE LAZY LOADING =================

  const galleryRef = useRef(null);
  const [galleryImagesLoaded, setGalleryImagesLoaded] = useState(false);

  useEffect(() => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryImagesLoaded(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.01,
      }
    );

    observer.observe(gallery);

    return () => observer.disconnect();
  }, []);


  return (
    <main className="events-page">

      {/* ================= HERO ================= */}

      <section className="events-hero">

        <span className="hero-tag">
          CAMPAIGN JOURNEY
        </span>

        <h1>
          Every Step Tells
          <br />
          A Story Of Progress
        </h1>

        <p>
          Every interaction, classroom visit, discussion, and campaign activity
          reflects our commitment to creating a better campus for every student.
          Explore the journey through the moments that define our campaign.
        </p>

      </section>


      {/* ================= UPCOMING EVENT ================= */}

      <section className="featured-event">

        <div className="featured-image">

          <img
            src={upcomingEvent.image}
            alt={upcomingEvent.title}
            decoding="async"
          />

        </div>

        <div className="featured-content">

          <span className="featured-badge">
            Upcoming Event
          </span>

          <h2>
            {upcomingEvent.title}
          </h2>

          <div className="featured-meta">

            <div>
              <HiOutlineCalendarDays />
              <span>{upcomingEvent.date}</span>
            </div>

            {upcomingEvent.time && (
              <div>
                <HiOutlineClock />
                <span>{upcomingEvent.time}</span>
              </div>
            )}

            <div>
              <HiOutlineMapPin />
              <span>{upcomingEvent.location}</span>
            </div>

          </div>

          <p>
            {upcomingEvent.description}
          </p>

        </div>

      </section>


      {/* ================= TIMELINE ================= */}

      <section className="timeline-section">

        <div className="section-heading">

          <span>
            Campaign Timeline
          </span>

          <h2>
            Journey So Far
          </h2>

        </div>

        <div className="journey-grid">

          {pastEvents.map((event) => (

            <div
              className="journey-card"
              key={event.id}
            >

              <h3>
                {event.title}
              </h3>

              <p>
                {event.date}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats-section">

        <div className="stat-card">
          <HiOutlineUserGroup />
          <h3>600+</h3>
          <p>Students Reached</p>
        </div>

        <div className="stat-card">
          <HiOutlinePresentationChartBar />
          <h3>17</h3>
          <p>Campaign Activities</p>
        </div>

        <div className="stat-card">
          <HiOutlineChatBubbleLeftRight />
          <h3>250+</h3>
          <p>Suggestions Received</p>
        </div>

        <div className="stat-card">
          <HiOutlineClock />
          <h3>11</h3>
          <p>Events Conducted</p>
        </div>

      </section>


      {/* ================= EVENTS GALLERY ================= */}

      <section
        className="events-gallery"
        ref={galleryRef}
      >

        <div className="section-heading">

          <span>
            Past Events
          </span>

          <h2>
            Moments That Matter
          </h2>

          <p>
            Every campaign activity reflects our dedication to listening,
            engaging and working together with students for a better campus.
          </p>

        </div>

        <div className="events-grid">

          {pastEvents.map((event) => (

            <article
              className="event-card"
              key={event.id}
            >

              <div className="event-image">

                {galleryImagesLoaded && (
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    decoding="async"
                  />
                )}

              </div>

              <div className="event-body">

                <h3>
                  {event.title}
                </h3>

                <div className="event-meta">

                  <span>
                    <HiOutlineCalendarDays />
                    {event.date}
                  </span>

                  <span>
                    <HiOutlineMapPin />
                    {event.location}
                  </span>

                </div>

                <p>
                  {event.description}
                </p>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* ================= STUDENT VOICES ================= */}

      <section className="student-voices">

        <div className="section-heading">

          <span>
            Student Voices
          </span>

          <h2>
            What Students Say
          </h2>

        </div>

        <div className="voices-grid">

          <div className="voice-card">

            <p>
              "The campaign focused on listening rather than making promises.
              Every discussion felt genuine and transparent."
            </p>

            <h4>
              — Faculty of Law Student
            </h4>

          </div>

          <div className="voice-card">

            <p>
              "It was great to see direct interaction with students instead of
              only posters and speeches."
            </p>

            <h4>
              — Third Year Student
            </h4>

          </div>

          <div className="voice-card">

            <p>
              "Suggestions were taken seriously and every student was given an
              opportunity to express their opinion."
            </p>

            <h4>
              — First Year Student
            </h4>

          </div>

        </div>

      </section>


      {/* ================= CLOSING ================= */}

      <section className="events-closing">

        <span>
          OUR COMMITMENT
        </span>

        <h2>
          Every Conversation Matters.
          <br />
          Every Suggestion Counts.
        </h2>

        <p>
          Real leadership is built through trust, participation and continuous
          engagement. Every event strengthens our vision of creating a campus
          where every student's voice is heard, respected and represented.
        </p>

      </section>

    </main>
  );
}

export default Events;