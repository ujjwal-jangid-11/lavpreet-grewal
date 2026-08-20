import "./Manifesto.css";

import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineBuildingOffice2,
  HiOutlineComputerDesktop,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineHeart,
  HiOutlineMegaphone,
  HiOutlineSparkles,
  HiOutlineTrophy,
  HiOutlineCheckBadge,
  HiOutlineDocumentMagnifyingGlass,
  HiOutlineBuildingOffice,
  HiOutlineArrowTrendingUp,
  HiOutlinePrinter,
  HiOutlineRocketLaunch,
} from "react-icons/hi2";

function Manifesto() {
  const manifestoPoints = [
    {
      icon: <HiOutlineAcademicCap />,
      title: "Academic Excellence",
      description:
        "Promote a stronger academic environment through workshops, guest lectures, moot court sessions, research opportunities, and practical learning experiences that prepare every student for the legal profession.",
    },

    {
      icon: <HiOutlineBookOpen />,
      title: "Digital Study Resources",
      description:
        "Build a well-organized digital study material platform with notes, previous year papers, case laws, bare acts, reference books, and important updates that remain accessible to every student anytime.",
    },

    {
      icon: <HiOutlineBuildingOffice2 />,
      title: "Better Campus Infrastructure",
      description:
        "Work towards improving classrooms, library facilities, Wi-Fi accessibility, seating arrangements, cleanliness, and common spaces to create a comfortable and productive learning environment.",
    },

    {
      icon: <HiOutlineComputerDesktop />,
      title: "Technology & Innovation",
      description:
        "Encourage digital initiatives including AI awareness, legal technology workshops, online resources, and smart communication channels to make our campus future-ready.",
    },

    {
      icon: <HiOutlineUserGroup />,
      title: "Student Representation",
      description:
        "Maintain transparent communication with every batch, actively listen to concerns, and ensure that every genuine student issue is represented before the concerned authorities.",
    },

    {
      icon: <HiOutlineShieldCheck />,
      title: "Campus Safety",
      description:
        "Advocate for a safe, respectful, and inclusive campus where every student feels secure and confident while participating in academic and extracurricular activities.",
    },

    {
      icon: <HiOutlineMegaphone />,
      title: "Transparent Communication",
      description:
        "Share regular updates regarding initiatives, meetings, progress, and student concerns so everyone stays informed through clear and honest communication.",
    },

    {
      icon: <HiOutlineTrophy />,
      title: "Sports & Cultural Activities",
      description:
        "Encourage greater participation in sports, debates, cultural events, legal competitions, and student-led activities to create a vibrant campus experience.",
    },

    {
      icon: <HiOutlineBriefcase />,
      title: "Internships & Career Opportunities",
      description:
        "Create meaningful internship and career opportunities by organising dedicated internship drives, connecting students with law firms, advocates, chambers, and legal organisations, while providing career guidance and practical exposure to help students confidently prepare for the legal profession.",
    },

    {
      icon: <HiOutlineSparkles />,
      title: "Inclusive Growth",
      description:
        "Ensure that opportunities, resources, and participation remain accessible to every student irrespective of background, semester, or experience.",
    },

    {
      icon: <HiOutlineCheckBadge />,
      title: "Accountability",
      description:
        "Leadership is built on responsibility. Every promise should be followed by measurable action, regular updates, and continuous efforts towards meaningful results.",
    },
    {
      icon: <HiOutlineDocumentMagnifyingGlass />,
      title: "Research & Drafting Society",
      description:
        "Establish a dedicated society to promote legal research, drafting skills, academic writing, and collaborative projects, helping students develop practical and analytical legal skills.",
    },
    {
      icon: <HiOutlineBuildingOffice />,
      title: "Strengthening Existing Societies",
      description:
        "Ensure that all existing societies function efficiently through regular activities, active student participation, clear responsibilities, and better coordination, making them more productive and engaging.",
    },
    {
      icon: <HiOutlineRocketLaunch />,
      title: "Activating the Placement Cell",
      description:
        "Revive and strengthen the Placement Cell to create meaningful placement opportunities, connect students with recruiters, and provide proper career guidance and support.",
    },

    {
      icon: <HiOutlinePrinter />,
      title: "On-Campus Photocopy Shop",
      description:
        "Establish a photocopy and printing facility on campus to provide students with convenient and affordable access to essential academic services.",
    },
  ];

  return (
    <main className="manifesto-page">
      {/* ================= HERO ================= */}

      <section className="manifesto-hero">
        <span className="hero-tag">OUR COMMITMENT</span>

        <h1>
          A Manifesto Built
          <br />
          For Every Student
        </h1>

        <p>
          This manifesto represents practical goals, transparent leadership, and
          a commitment to creating an academic environment where every student
          has equal opportunities to learn, grow, and succeed.
        </p>
      </section>

      {/* ================= CARDS ================= */}

      <section className="manifesto-grid">
        {manifestoPoints.map((item, index) => (
          <div className="manifesto-card" key={index}>
            <div className="card-icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.description}</p>
          </div>
        ))}
      </section>

      {/* ================= VISION ================= */}

      <section className="vision-section">
        <span>OUR VISION</span>

        <h2>
          Leadership Through Action,
          <br />
          Not Just Promises.
        </h2>

        <p>
          Every initiative in this manifesto is guided by transparency,
          accountability, and consistent action. Together, we can create a
          campus where opportunities are accessible, every voice is respected,
          and meaningful progress becomes a shared achievement.
        </p>
      </section>
    </main>
  );
}

export default Manifesto;
