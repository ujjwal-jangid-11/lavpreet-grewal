import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, lazy, Suspense, useEffect } from "react";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Loader from "./Loader/Loader";
import PageTransition from "./PageTransition";
import AdminRoute from "./AdminLogin/AdminRoute";
import "./App.css";

const Home = lazy(() => import("./Pages/Home/Home"));

const About = lazy(() => import("./Pages/About/About"));

const Connect = lazy(() => import("./Pages/Connect/Connect"));

const Manifesto = lazy(() => import("./Pages/Manifesto/Manifesto"));

const Events = lazy(() => import("./Pages/Events/Events"));

const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

const StudyMaterial = lazy(
  () => import("./Pages/Study Material/StudyMaterial")
);

const Semester = lazy(
  () => import("./Pages/Study Material/Semester")
);

const Subject = lazy(
  () => import("./Pages/Study Material/Subject")
);

const Resource = lazy(
  () => import("./Pages/Study Material/Resource")
);

const Bulletin = lazy(
  () => import("./Pages/Bulletin/Bulletin")
);

/* =====================================================
                    ADMIN PANEL
===================================================== */

const AdminPanel = lazy(
  () => import("./Pages/Admin/AdminPanel")
);

const BulletinManager = lazy(
  () => import("./Pages/Admin/BulletinManager")
);

const InternshipApplications = lazy(
  () => import("./Pages/Admin/InternshipApplications")
);

/* =====================================================
                 PUBLIC INTERNSHIP
===================================================== */

const Internship = lazy(
  () => import("./Pages/Internship Form/InternshipForm")
);

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem(
      "theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((currentState) => !currentState);
  }

  return (
    <BrowserRouter>
      <ScrollToTop />

      <div
        className={
          darkMode
            ? "app dark"
            : "app light"
        }
      >
        <Header
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        <Suspense fallback={<Loader />}>
          <Routes>

            {/* =================================================
                                HOME
            ================================================= */}

            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />

            {/* =================================================
                                ABOUT
            ================================================= */}

            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />

            {/* =================================================
                            STUDY MATERIAL
            ================================================= */}

            <Route
              path="/study-material"
              element={
                <PageTransition>
                  <StudyMaterial />
                </PageTransition>
              }
            />

            <Route
              path="/study-material/:semester"
              element={
                <PageTransition>
                  <Semester />
                </PageTransition>
              }
            />

            <Route
              path="/study-material/:semester/:subject"
              element={
                <PageTransition>
                  <Subject />
                </PageTransition>
              }
            />

            <Route
              path="/study-material/:semester/:subject/:resource"
              element={
                <PageTransition>
                  <Resource />
                </PageTransition>
              }
            />

            {/* =================================================
                              BULLETIN
            ================================================= */}

            <Route
              path="/bulletin"
              element={
                <PageTransition>
                  <Bulletin />
                </PageTransition>
              }
            />

            {/* =================================================
                        PUBLIC INTERNSHIP
            ================================================= */}

            <Route
              path="/internship"
              element={
                <PageTransition>
                  <Internship />
                </PageTransition>
              }
            />

            {/* =================================================
                              MANIFESTO
            ================================================= */}

            <Route
              path="/manifesto"
              element={
                <PageTransition>
                  <Manifesto />
                </PageTransition>
              }
            />

            {/* =================================================
                                EVENTS
            ================================================= */}

            <Route
              path="/events"
              element={
                <PageTransition>
                  <Events />
                </PageTransition>
              }
            />

            {/* =================================================
                                CONNECT
            ================================================= */}

            <Route
              path="/connect"
              element={
                <PageTransition>
                  <Connect />
                </PageTransition>
              }
            />

            {/* =================================================
                         PROTECTED ADMIN PANEL
            ================================================= */}

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <PageTransition>
                    <AdminPanel />
                  </PageTransition>
                </AdminRoute>
              }
            />

            {/* =================================================
                    UNIFIED CONTENT MANAGEMENT
            ================================================= */}

            <Route
              path="/admin/content"
              element={
                <AdminRoute>
                  <PageTransition>
                    <BulletinManager />
                  </PageTransition>
                </AdminRoute>
              }
            />

            {/* =================================================
                    INTERNSHIP APPLICATIONS
            ================================================= */}

            <Route
              path="/admin/internship-applications"
              element={
                <AdminRoute>
                  <PageTransition>
                    <InternshipApplications />
                  </PageTransition>
                </AdminRoute>
              }
            />

            {/* =================================================
                              NOT FOUND
            ================================================= */}

            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />

          </Routes>
        </Suspense>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;