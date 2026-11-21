import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        padding: "80px 24px",
        textAlign: "center",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontSize: "72px",
          fontWeight: "800",
          color: "#174a7e",
          lineHeight: 1,
          marginBottom: "16px",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: "28px",
          color: "#2d3748",
          marginBottom: "16px",
          fontWeight: "700",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "#4a5568",
          lineHeight: "1.6",
          marginBottom: "32px",
        }}
      >
        The page you are looking for might have been moved, removed, or does not exist.
      </p>
      <Link
        to="/"
        style={{
          display: "inline-block",
          backgroundColor: "#174a7e",
          color: "#ffffff",
          padding: "12px 28px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "600",
          fontSize: "15px",
          transition: "background 0.2s",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
