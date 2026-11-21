import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const verticalsList = [
  "Sustainable Development & Environment",
  "Community Service & Social Responsibility",
  "Skill Development & Capacity Building",
  "Awareness & Social Outreach",
  "Youth & Nation Building",
  "Health, Well-being & Lifestyle",
  "Events, Collaboration & Special Initiatives",
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("activities");

  // Initialize authentication state directly from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("nss_admin_token") || "");
  const [user] = useState(() => {
    try {
      const stored = localStorage.getItem("nss_admin_user");
      return stored ? JSON.parse(stored) : { email: "admin@rgukt.ac.in" };
    } catch {
      return { email: "admin@rgukt.ac.in" };
    }
  });

  // Data states
  const [activities, setActivities] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [actionFeedback, setActionFeedback] = useState({ type: "", text: "" });

  // Activity Modal State
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [activityForm, setActivityForm] = useState({
    title: "",
    date: "",
    vertical: verticalsList[0],
    hours: 4,
    objective: "",
    impact: "",
    images: "",
  });

  // Gallery Add Form State
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "General",
    imagePath: "",
    date: "",
    description: "",
  });

  const handleLogout = useCallback(() => {
    localStorage.removeItem("nss_admin_token");
    localStorage.removeItem("nss_admin_user");
    setToken("");
    navigate("/admin/login");
  }, [navigate]);

  // Re-fetch helpers
  const refreshActivities = async () => {
    try {
      const res = await fetch("/api/activities");
      const data = await res.json();
      setActivities(data);
    } catch {
      setActionFeedback({ type: "error", text: "Failed to fetch activities" });
    }
  };

  const refreshVolunteers = async () => {
    try {
      const res = await fetch("/api/volunteers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        handleLogout();
        return;
      }
      const data = await res.json();
      setVolunteers(data);
    } catch {
      setActionFeedback({ type: "error", text: "Failed to fetch volunteers" });
    }
  };

  const refreshGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGallery(data);
    } catch {
      setActionFeedback({ type: "error", text: "Failed to fetch gallery" });
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    let isMounted = true;

    if (activeTab === "activities") {
      fetch("/api/activities")
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) setActivities(data);
        })
        .catch(() => {
          if (isMounted) setActionFeedback({ type: "error", text: "Failed to fetch activities" });
        });
    } else if (activeTab === "volunteers") {
      fetch("/api/volunteers", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.status === 401) {
            handleLogout();
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (isMounted && data) setVolunteers(data);
        })
        .catch(() => {
          if (isMounted) setActionFeedback({ type: "error", text: "Failed to fetch volunteers" });
        });
    } else if (activeTab === "messages") {
      fetch("/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.status === 401) {
            handleLogout();
            return null;
          }
          return res.json();
        })
        .then((data) => {
          if (isMounted && data) setMessages(data);
        })
        .catch(() => {
          if (isMounted) setActionFeedback({ type: "error", text: "Failed to fetch messages" });
        });
    } else if (activeTab === "gallery") {
      fetch("/api/gallery")
        .then((res) => res.json())
        .then((data) => {
          if (isMounted) setGallery(data);
        })
        .catch(() => {
          if (isMounted) setActionFeedback({ type: "error", text: "Failed to fetch gallery" });
        });
    }

    return () => {
      isMounted = false;
    };
  }, [activeTab, token, navigate, handleLogout]);

  // Activity CRUD Handlers
  const openNewActivityModal = () => {
    setEditingActivity(null);
    setActivityForm({
      title: "",
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      vertical: verticalsList[0],
      hours: 4,
      objective: "",
      impact: "",
      images: "",
    });
    setIsActivityModalOpen(true);
  };

  const openEditActivityModal = (act) => {
    setEditingActivity(act);
    setActivityForm({
      title: act.title,
      date: act.date,
      vertical: act.vertical,
      hours: act.hours,
      objective: act.objective || "",
      impact: act.impact || "",
      images: Array.isArray(act.images) ? act.images.join(", ") : "",
    });
    setIsActivityModalOpen(true);
  };

  const handleSaveActivity = async (e) => {
    e.preventDefault();
    setActionFeedback({ type: "", text: "" });

    const payload = {
      ...activityForm,
      hours: Number(activityForm.hours),
      images: activityForm.images
        ? activityForm.images.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    };

    try {
      let res;
      if (editingActivity) {
        res = await fetch(`/api/activities/${editingActivity._id || editingActivity.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/activities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setActionFeedback({
          type: "success",
          text: `Activity ${editingActivity ? "updated" : "added"} successfully!`,
        });
        setIsActivityModalOpen(false);
        refreshActivities();
      } else {
        const err = await res.json();
        setActionFeedback({ type: "error", text: err.message || "Operation failed" });
      }
    } catch {
      setActionFeedback({ type: "error", text: "Network error occurred" });
    }
  };

  const handleDeleteActivity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;
    try {
      const res = await fetch(`/api/activities/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setActionFeedback({ type: "success", text: "Activity deleted successfully" });
        refreshActivities();
      }
    } catch {
      setActionFeedback({ type: "error", text: "Failed to delete activity" });
    }
  };

  // Volunteer Delete Handler
  const handleDeleteVolunteer = async (id) => {
    if (!window.confirm("Are you sure you want to remove this volunteer record?")) return;
    try {
      const res = await fetch(`/api/volunteers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setActionFeedback({ type: "success", text: "Volunteer record removed" });
        refreshVolunteers();
      }
    } catch {
      setActionFeedback({ type: "error", text: "Failed to delete volunteer" });
    }
  };

  // Gallery Add & Delete Handlers
  const handleAddGalleryPhoto = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(galleryForm),
      });

      if (res.ok) {
        setActionFeedback({ type: "success", text: "Photo added to gallery!" });
        setGalleryForm({ title: "", category: "General", imagePath: "", date: "", description: "" });
        refreshGallery();
      }
    } catch {
      setActionFeedback({ type: "error", text: "Failed to add photo" });
    }
  };

  const handleDeleteGalleryPhoto = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo from the gallery?")) return;
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setActionFeedback({ type: "success", text: "Photo removed from gallery" });
        refreshGallery();
      }
    } catch {
      setActionFeedback({ type: "error", text: "Failed to delete photo" });
    }
  };

  return (
    <div style={{ padding: "30px 24px", maxWidth: "1300px", margin: "0 auto" }}>
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#174a7e",
          color: "#ffffff",
          padding: "20px 28px",
          borderRadius: "10px",
          marginBottom: "28px",
          boxShadow: "0 4px 16px rgba(23, 74, 126, 0.15)",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "700" }}>NSS Admin Dashboard</h1>
          <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#dbeafe" }}>
            Signed in as: {user ? user.email : "admin@rgukt.ac.in"}
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <a
            href="/"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              color: "#ffffff",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            View Website
          </a>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#ef4444",
              color: "#ffffff",
              border: "none",
              padding: "8px 18px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Feedback Alert */}
      {actionFeedback.text && (
        <div
          style={{
            padding: "12px 20px",
            borderRadius: "6px",
            marginBottom: "20px",
            backgroundColor: actionFeedback.type === "success" ? "#def7ec" : "#fde8e8",
            color: actionFeedback.type === "success" ? "#03543f" : "#9b1c1c",
            border: `1px solid ${actionFeedback.type === "success" ? "#bcf0da" : "#f8b4b4"}`,
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>{actionFeedback.text}</span>
          <button
            onClick={() => setActionFeedback({ type: "", text: "" })}
            style={{ background: "transparent", border: "none", cursor: "pointer", fontWeight: "700" }}
          >
            &times;
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          borderBottom: "2px solid #e2e8f0",
          marginBottom: "24px",
        }}
      >
        {[
          { id: "activities", label: `Activities (${activities.length})` },
          { id: "volunteers", label: `Volunteers (${volunteers.length})` },
          { id: "messages", label: `Contact Messages (${messages.length})` },
          { id: "gallery", label: `Gallery (${gallery.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "12px 24px",
              border: "none",
              borderBottom: activeTab === tab.id ? "3px solid #174a7e" : "3px solid transparent",
              backgroundColor: "transparent",
              color: activeTab === tab.id ? "#174a7e" : "#64748b",
              fontWeight: activeTab === tab.id ? "700" : "500",
              fontSize: "15px",
              cursor: "pointer",
              marginBottom: "-2px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ACTIVITIES */}
      {activeTab === "activities" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "20px", color: "#174a7e" }}>Manage Activities & Events</h2>
            <button
              onClick={openNewActivityModal}
              style={{
                backgroundColor: "#174a7e",
                color: "#ffffff",
                border: "none",
                borderRadius: "6px",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              + Add New Activity
            </button>
          </div>

          {activities.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px 0", color: "#64748b" }}>No activities recorded yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "12px 16px" }}>Date</th>
                    <th style={{ padding: "12px 16px" }}>Title</th>
                    <th style={{ padding: "12px 16px" }}>Vertical</th>
                    <th style={{ padding: "12px 16px" }}>Hours</th>
                    <th style={{ padding: "12px 16px" }}>Photos</th>
                    <th style={{ padding: "12px 16px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((act) => (
                    <tr key={act._id || act.id} style={{ borderBottom: "1px solid #edf2f7" }}>
                      <td style={{ padding: "12px 16px", whiteSpace: "nowrap", color: "#64748b" }}>{act.date}</td>
                      <td style={{ padding: "12px 16px", fontWeight: "600", color: "#1f2937" }}>{act.title}</td>
                      <td style={{ padding: "12px 16px", color: "#174a7e" }}>{act.vertical}</td>
                      <td style={{ padding: "12px 16px" }}>{act.hours} hrs</td>
                      <td style={{ padding: "12px 16px" }}>{act.images ? act.images.length : 0}</td>
                      <td style={{ padding: "12px 16px", textAlign: "right", whiteSpace: "nowrap" }}>
                        <button
                          onClick={() => openEditActivityModal(act)}
                          style={{
                            backgroundColor: "#e0f2fe",
                            color: "#0369a1",
                            border: "none",
                            borderRadius: "4px",
                            padding: "6px 12px",
                            marginRight: "8px",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteActivity(act._id || act.id)}
                          style={{
                            backgroundColor: "#fee2e2",
                            color: "#b91c1c",
                            border: "none",
                            borderRadius: "4px",
                            padding: "6px 12px",
                            cursor: "pointer",
                            fontSize: "13px",
                            fontWeight: "600",
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: VOLUNTEERS */}
      {activeTab === "volunteers" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
          }}
        >
          <h2 style={{ margin: "0 0 20px", fontSize: "20px", color: "#174a7e" }}>Registered Volunteers</h2>
          {volunteers.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px 0", color: "#64748b" }}>No volunteers registered yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                <thead>
                  <tr style={{ backgroundColor: "#f8fafc", textAlign: "left", borderBottom: "2px solid #e2e8f0" }}>
                    <th style={{ padding: "12px 14px" }}>Roll No</th>
                    <th style={{ padding: "12px 14px" }}>Name</th>
                    <th style={{ padding: "12px 14px" }}>Branch & Year</th>
                    <th style={{ padding: "12px 14px" }}>Email</th>
                    <th style={{ padding: "12px 14px" }}>Phone</th>
                    <th style={{ padding: "12px 14px" }}>Unit Pref</th>
                    <th style={{ padding: "12px 14px", textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {volunteers.map((vol) => (
                    <tr key={vol._id} style={{ borderBottom: "1px solid #edf2f7" }}>
                      <td style={{ padding: "12px 14px", fontWeight: "700", color: "#174a7e" }}>{vol.rollNumber}</td>
                      <td style={{ padding: "12px 14px", fontWeight: "600" }}>{vol.name}</td>
                      <td style={{ padding: "12px 14px" }}>
                        {vol.branch} <small style={{ color: "#64748b" }}>({vol.year})</small>
                      </td>
                      <td style={{ padding: "12px 14px" }}>{vol.email}</td>
                      <td style={{ padding: "12px 14px" }}>{vol.phone}</td>
                      <td style={{ padding: "12px 14px" }}>{vol.unit}</td>
                      <td style={{ padding: "12px 14px", textAlign: "right" }}>
                        <button
                          onClick={() => handleDeleteVolunteer(vol._id)}
                          style={{
                            backgroundColor: "#fee2e2",
                            color: "#b91c1c",
                            border: "none",
                            borderRadius: "4px",
                            padding: "6px 12px",
                            cursor: "pointer",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: CONTACT MESSAGES */}
      {activeTab === "messages" && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.04)",
          }}
        >
          <h2 style={{ margin: "0 0 20px", fontSize: "20px", color: "#174a7e" }}>Contact Inquiries</h2>
          {messages.length === 0 ? (
            <p style={{ textAlign: "center", padding: "40px 0", color: "#64748b" }}>No inquiries received yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    padding: "20px",
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: "16px", color: "#174a7e" }}>{msg.subject}</h3>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ""}
                    </span>
                  </div>
                  <div style={{ fontSize: "13px", color: "#475569", marginBottom: "10px" }}>
                    From: <strong>{msg.name}</strong> ({msg.email}) {msg.phone && `• Phone: ${msg.phone}`}
                  </div>
                  <p style={{ margin: 0, fontSize: "14px", color: "#334155", lineHeight: "1.5" }}>{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: GALLERY MANAGEMENT */}
      {activeTab === "gallery" && (
        <div>
          {/* Add Photo Form */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "24px",
              border: "1px solid #e2e8f0",
              marginBottom: "24px",
            }}
          >
            <h2 style={{ margin: "0 0 16px", fontSize: "18px", color: "#174a7e" }}>Add Photo to Gallery</h2>
            <form onSubmit={handleAddGalleryPhoto} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
                <div>
                  <label htmlFor="gallery-title" style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                    Photo Title *
                  </label>
                  <input
                    id="gallery-title"
                    type="text"
                    required
                    value={galleryForm.title}
                    onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                    placeholder="e.g. Swachh Bharat Drive"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                  />
                </div>
                <div>
                  <label htmlFor="gallery-category" style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                    Category *
                  </label>
                  <input
                    id="gallery-category"
                    type="text"
                    required
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                    placeholder="e.g. Environment & Plantation"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                  />
                </div>
                <div>
                  <label htmlFor="gallery-imagePath" style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                    Image Path or URL *
                  </label>
                  <input
                    id="gallery-imagePath"
                    type="text"
                    required
                    value={galleryForm.imagePath}
                    onChange={(e) => setGalleryForm({ ...galleryForm, imagePath: e.target.value })}
                    placeholder="e.g. /IMG-20250712-WA0035.jpg"
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                  />
                </div>
              </div>
              <button
                type="submit"
                style={{
                  alignSelf: "flex-start",
                  backgroundColor: "#174a7e",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "10px 20px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Upload Photo Entry
              </button>
            </form>
          </div>

          {/* Photos Grid */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "24px",
              border: "1px solid #e2e8f0",
            }}
          >
            <h2 style={{ margin: "0 0 16px", fontSize: "18px", color: "#174a7e" }}>Gallery Photos</h2>
            {gallery.length === 0 ? (
              <p style={{ color: "#64748b" }}>No photos in gallery.</p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "16px",
                }}
              >
                {gallery.map((p) => (
                  <div
                    key={p._id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      overflow: "hidden",
                      backgroundColor: "#f8fafc",
                    }}
                  >
                    <div style={{ height: "130px", overflow: "hidden" }}>
                      <img
                        src={p.imagePath}
                        alt={p.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "10px" }}>
                      <h4 style={{ margin: "0 0 4px", fontSize: "14px" }}>{p.title}</h4>
                      <p style={{ margin: "0 0 8px", fontSize: "12px", color: "#64748b" }}>{p.category}</p>
                      <button
                        onClick={() => handleDeleteGalleryPhoto(p._id)}
                        style={{
                          backgroundColor: "#fee2e2",
                          color: "#b91c1c",
                          border: "none",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: "600",
                          width: "100%",
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ACTIVITY MODAL (Add / Edit) */}
      {isActivityModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              maxWidth: "650px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "28px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "20px", color: "#174a7e" }}>
                {editingActivity ? "Edit Activity" : "Add New Activity"}
              </h2>
              <button
                onClick={() => setIsActivityModalOpen(false)}
                style={{ background: "transparent", border: "none", fontSize: "24px", cursor: "pointer" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveActivity} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label htmlFor="modal-activity-title" style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Title *</label>
                <input
                  id="modal-activity-title"
                  type="text"
                  required
                  value={activityForm.title}
                  onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label htmlFor="modal-activity-date" style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Date *</label>
                  <input
                    id="modal-activity-date"
                    type="text"
                    required
                    value={activityForm.date}
                    onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                  />
                </div>
                <div>
                  <label htmlFor="modal-activity-hours" style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Hours *</label>
                  <input
                    id="modal-activity-hours"
                    type="number"
                    min="0"
                    required
                    value={activityForm.hours}
                    onChange={(e) => setActivityForm({ ...activityForm, hours: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="modal-activity-vertical" style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Vertical *</label>
                <select
                  id="modal-activity-vertical"
                  value={activityForm.vertical}
                  onChange={(e) => setActivityForm({ ...activityForm, vertical: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                >
                  {verticalsList.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="modal-activity-objective" style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Objective</label>
                <input
                  id="modal-activity-objective"
                  type="text"
                  value={activityForm.objective}
                  onChange={(e) => setActivityForm({ ...activityForm, objective: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                />
              </div>

              <div>
                <label htmlFor="modal-activity-impact" style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>Impact</label>
                <input
                  id="modal-activity-impact"
                  type="text"
                  value={activityForm.impact}
                  onChange={(e) => setActivityForm({ ...activityForm, impact: e.target.value })}
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                />
              </div>

              <div>
                <label htmlFor="modal-activity-images" style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
                  Images (comma separated paths)
                </label>
                <input
                  id="modal-activity-images"
                  type="text"
                  value={activityForm.images}
                  onChange={(e) => setActivityForm({ ...activityForm, images: e.target.value })}
                  placeholder="/IMG-20250712-WA0035.jpg, /IMG-20250819-WA0009.jpg"
                  style={{ width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e0" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsActivityModalOpen(false)}
                  style={{ padding: "8px 16px", borderRadius: "4px", border: "1px solid #cbd5e0", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#174a7e",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "8px 20px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
