import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, lazy, Suspense, useEffect } from "react";

import ScrollToTop from "./ScrollToTop";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Loader from "./Loader/Loader";
import PageTransition from "./PageTransition";

const Home = lazy(() => import("./Pages/Home/Home"));
const About = lazy(() => import("./Pages/About/About"));
const Connect = lazy(() => import("./Pages/Connect/Connect"));
const Manifesto = lazy(() => import("./Pages/Manifesto/Manifesto"));
const Events = lazy(() => import("./Pages/Events/Events"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));

const StudyMaterial = lazy(
  () => import("./Pages/Study Material/StudyMaterial"),
);

const Semester = lazy(() => import("./Pages/Study Material/Semester"));

const Subject = lazy(() => import("./Pages/Study Material/Subject"));

const Resource = lazy(() => import("./Pages/Study Material/Resource"));

import "./App.css";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  function toggleTheme() {
    setDarkMode((currentState) => !currentState);
  }

  return (
    <BrowserRouter>
      <ScrollToTop />

      <div className={darkMode ? "app dark" : "app light"}>
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />

        <Suspense fallback={<Loader />}>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/study-material" element={<StudyMaterial />} />
              <Route path="/manifesto" element={<Manifesto />} />
              <Route path="/events" element={<Events />} />

              <Route
                path="/study-material/:semester"
                element={<Semester />}
              />

              <Route
                path="/study-material/:semester/:subject"
                element={<Subject />}
              />

              <Route
                path="/study-material/:semester/:subject/:resource"
                element={<Resource />}
              />

              <Route path="/connect" element={<Connect />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </Suspense>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;