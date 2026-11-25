import { useState, useEffect } from "react";

function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/gallery")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load gallery photos (${res.status})`);
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setPhotos(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load gallery photos");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    "All",
    "Environment & Plantation",
    "Community Service",
    "Health & Well-being",
    "Youth & National",
    "Social Awareness",
  ];

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showNext = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null && filteredPhotos.length > 0) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const showPrev = (e) => {
    e.stopPropagation();
    if (lightboxIndex !== null && filteredPhotos.length > 0) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext(e);
      if (e.key === "ArrowLeft") showPrev(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="responsive-page-container">
      {/* Header */}
      <div className="responsive-page-header">
        <span className="responsive-page-eyebrow">
          Moments of Action • RGUKT Basar
        </span>
        <h1 className="responsive-page-title">
          NSS Photo Gallery
        </h1>
        <p className="responsive-page-subtitle">
          Capturing our volunteers in action across community service drives,
          environmental initiatives, blood donation camps, and youth celebrations.
        </p>
      </div>

      {/* Category Filter Pills (Horizontal swipeable on mobile) */}
      <div className="filter-pills-scroll" style={{ justifyContent: "center" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-pill-btn ${activeCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading & Error States */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#174a7e" }}>
          <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>Loading gallery...</div>
          <p style={{ color: "#718096", fontSize: "14px" }}>Fetching photos from NSS archives</p>
        </div>
      )}

      {error && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "24px",
            backgroundColor: "#fff5f5",
            borderRadius: "8px",
            color: "#c53030",
            maxWidth: "500px",
            margin: "20px auto",
          }}
        >
          <p style={{ margin: 0, fontWeight: "600" }}>{error}</p>
        </div>
      )}

      {/* Photo Grid */}
      {!loading && !error && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
            gap: "20px",
          }}
        >
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo._id || idx}
              onClick={() => openLightbox(idx)}
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                overflow: "hidden",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(23, 74, 126, 0.08)",
                cursor: "pointer",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div style={{ height: "220px", overflow: "hidden", backgroundColor: "#f0f4f8" }}>
                <img
                  src={photo.imagePath}
                  alt={photo.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#174a7e",
                      backgroundColor: "#ebf4ff",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      textTransform: "uppercase",
                    }}
                  >
                    {photo.category}
                  </span>
                  {photo.date && (
                    <span style={{ fontSize: "12px", color: "#718096" }}>{photo.date}</span>
                  )}
                </div>
                <h3 style={{ margin: "0 0 6px", fontSize: "16px", color: "#1f2937", fontWeight: "600" }}>
                  {photo.title}
                </h3>
                {photo.description && (
                  <p style={{ margin: 0, fontSize: "13px", color: "#6b7280", lineHeight: "1.4" }}>
                    {photo.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.88)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              background: "transparent",
              color: "#ffffff",
              border: "none",
              fontSize: "36px",
              cursor: "pointer",
              lineHeight: 1,
            }}
            aria-label="Close lightbox"
          >
            &times;
          </button>

          {/* Previous Button */}
          <button
            onClick={showPrev}
            style={{
              position: "absolute",
              left: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              border: "none",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Previous image"
          >
            &#10094;
          </button>

          {/* Image & Caption Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "85vw",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={filteredPhotos[lightboxIndex].imagePath}
              alt={filteredPhotos[lightboxIndex].title}
              style={{
                maxWidth: "100%",
                maxHeight: "72vh",
                objectFit: "contain",
                borderRadius: "4px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
              }}
            />
            <div style={{ textAlign: "center", color: "#ffffff", marginTop: "14px" }}>
              <h2 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: "600" }}>
                {filteredPhotos[lightboxIndex].title}
              </h2>
              <p style={{ margin: 0, color: "#cbd5e0", fontSize: "14px" }}>
                {filteredPhotos[lightboxIndex].category} {filteredPhotos[lightboxIndex].date && `• ${filteredPhotos[lightboxIndex].date}`}
              </p>
              <div style={{ marginTop: "6px", fontSize: "12px", color: "#a0aec0" }}>
                {lightboxIndex + 1} of {filteredPhotos.length}
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={showNext}
            style={{
              position: "absolute",
              right: "20px",
              background: "rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              border: "none",
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              fontSize: "24px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Next image"
          >
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
}

export default Gallery;
