import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, lazy, Suspense, useEffect } from "react";

import ScrollToTop from "./ScrollToTop";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Loader from "./Loader/Loader";
import PageTransition from "./PageTransition";

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
        <Header
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />

            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />

            <Route
              path="/study-material"
              element={
                <PageTransition>
                  <StudyMaterial />
                </PageTransition>
              }
            />

            <Route
              path="/manifesto"
              element={
                <PageTransition>
                  <Manifesto />
                </PageTransition>
              }
            />

            <Route
              path="/events"
              element={
                <PageTransition>
                  <Events />
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

            <Route
              path="/connect"
              element={
                <PageTransition>
                  <Connect />
                </PageTransition>
              }
            />

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