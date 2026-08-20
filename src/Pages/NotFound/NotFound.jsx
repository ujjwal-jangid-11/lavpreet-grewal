import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft, HiHome } from "react-icons/hi2";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <main className="not-found-page">
      <div className="not-found-content">

        <span className="not-found-code">404</span>

        <h1>Page Not Found</h1>

        <p>
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="not-found-actions">
          <button
            className="not-found-primary"
            onClick={() => navigate("/")}
          >
            <HiHome />
            Back to Home
          </button>

          <button
            className="not-found-secondary"
            onClick={handleGoBack}
          >
            <HiArrowLeft />
            Go Back
          </button>
        </div>

      </div>
    </main>
  );
}

export default NotFound;