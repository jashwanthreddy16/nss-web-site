import { useState } from "react";
import { Link } from "react-router-dom";

function BloodDonors() {
  const [selectedGroup, setSelectedGroup] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const bloodGroups = ["ALL", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const donors = [
    {
      id: "BD-01",
      name: "Sai Krishna V.",
      rollNo: "B201102",
      bloodGroup: "O+",
      unit: "Unit-I",
      phone: "+91 98480 XXXXX",
      city: "Basar / Nirmal",
      availability: "Available",
      lastDonated: "15-Aug-2026",
    },
    {
      id: "BD-02",
      name: "Ananya Reddy P.",
      rollNo: "B210450",
      bloodGroup: "A+",
      unit: "Unit-II",
      phone: "+91 94401 XXXXX",
      city: "Nizamabad",
      availability: "Available",
      lastDonated: "02-Jul-2026",
    },
    {
      id: "BD-03",
      name: "Ramesh Kumar M.",
      rollNo: "B190812",
      bloodGroup: "B+",
      unit: "Unit-III",
      phone: "+91 99890 XXXXX",
      city: "Basar Campus",
      availability: "Available",
      lastDonated: "24-Sep-2026",
    },
    {
      id: "BD-04",
      name: "Kavitha Sharma",
      rollNo: "B210992",
      bloodGroup: "O-",
      unit: "Unit-IV",
      phone: "+91 98665 XXXXX",
      city: "Nirmal Town",
      availability: "Available (Rare)",
      lastDonated: "10-Jun-2026",
    },
    {
      id: "BD-05",
      name: "Vinay Chandra B.",
      rollNo: "B201455",
      bloodGroup: "AB+",
      unit: "Unit-I",
      phone: "+91 97012 XXXXX",
      city: "Basar Campus",
      availability: "Available",
      lastDonated: "05-May-2026",
    },
    {
      id: "BD-06",
      name: "Divya Teja K.",
      rollNo: "B220311",
      bloodGroup: "B-",
      unit: "Unit-II",
      phone: "+91 98499 XXXXX",
      city: "Bodhan / Nizamabad",
      availability: "Available (Rare)",
      lastDonated: "18-Sep-2026",
    },
    {
      id: "BD-07",
      name: "Naveen Goud E.",
      rollNo: "B191244",
      bloodGroup: "A-",
      unit: "Unit-III",
      phone: "+91 94902 XXXXX",
      city: "Basar Campus",
      availability: "Available (Rare)",
      lastDonated: "01-Aug-2026",
    },
    {
      id: "BD-08",
      name: "Pooja Sri V.",
      rollNo: "B211780",
      bloodGroup: "AB-",
      unit: "Unit-IV",
      phone: "+91 99488 XXXXX",
      city: "Adilabad / Basar",
      availability: "Available (Rare)",
      lastDonated: "12-Apr-2026",
    },
  ];

  const filteredDonors = donors.filter((donor) => {
    const matchesGroup = selectedGroup === "ALL" || donor.bloodGroup === selectedGroup;
    const matchesQuery =
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesQuery;
  });

  return (
    <div className="gov-page-container">
      {/* Breadcrumb */}
      <nav className="gov-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Emergency Blood Donors</span>
      </nav>

      <div className="gov-page-header">
        <span className="gov-page-tag">24/7 CAMPUS EMERGENCY DESK</span>
        <h1 className="gov-page-title">Voluntary Blood Donors Directory</h1>
        <p className="gov-page-subtitle">
          Search verified volunteer blood donors across RGUKT Basar units for urgent and emergency hospital requirements.
        </p>
        <div className="gov-title-underline">
          <span className="underline-tricolor-saffron"></span>
          <span className="underline-tricolor-white"></span>
          <span className="underline-tricolor-green"></span>
        </div>
      </div>

      {/* Emergency Helpline Banner */}
      <div className="gov-emergency-banner">
        <div className="emergency-banner-left">
          <span className="emergency-icon">🚨</span>
          <div>
            <h3>Urgent Blood Requirement Helpline</h3>
            <p>For immediate emergency cases in Nirmal, Nizamabad, or Adilabad hospitals:</p>
          </div>
        </div>
        <div className="emergency-banner-actions">
          <a href="tel:08752255588" className="emergency-call-btn">
            📞 Call Campus Helpline: 08752-255588
          </a>
          <button
            type="button"
            className="emergency-request-btn"
            onClick={() => setShowRequestModal(true)}
          >
            📋 Post Blood Request
          </button>
        </div>
      </div>

      {/* Blood Group Filter Tiles */}
      <div className="blood-group-selector">
        <span className="selector-label">Filter by Blood Group:</span>
        <div className="blood-group-buttons">
          {bloodGroups.map((group) => (
            <button
              key={group}
              type="button"
              className={`blood-group-btn ${selectedGroup === group ? "active" : ""}`}
              onClick={() => setSelectedGroup(group)}
            >
              <span className="drop-icon">🩸</span>
              <strong>{group}</strong>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="gov-filter-bar">
        <div className="gov-search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by student name, roll number, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gov-search-input"
          />
        </div>
        <div className="gov-donor-count">
          Showing <strong>{filteredDonors.length}</strong> verified donors
        </div>
      </div>

      {/* Donors Grid */}
      <div className="gov-donors-grid">
        {filteredDonors.length > 0 ? (
          filteredDonors.map((donor) => (
            <div key={donor.id} className="donor-card">
              <div className="donor-card-top">
                <div className="donor-blood-badge">{donor.bloodGroup}</div>
                <div className="donor-unit-tag">{donor.unit}</div>
              </div>

              <div className="donor-info">
                <h3 className="donor-name">{donor.name}</h3>
                <p className="donor-id">ID: {donor.rollNo}</p>
                <div className="donor-details">
                  <p>📍 Location: <strong>{donor.city}</strong></p>
                  <p>🗓️ Last Donated: <strong>{donor.lastDonated}</strong></p>
                </div>
              </div>

              <div className="donor-card-footer">
                <span className="donor-status-chip">
                  <span className="status-dot"></span>
                  {donor.availability}
                </span>
                <button
                  type="button"
                  className="donor-contact-btn"
                  onClick={() =>
                    alert(
                      `Emergency request dispatched for donor ${donor.name} (${donor.bloodGroup}). The NSS Nodal Officer has been notified to coordinate.`
                    )
                  }
                >
                  Request Contact ✉️
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-donors-found">
            <p>No donors found matching criteria &quot;{selectedGroup}&quot; / &quot;{searchQuery}&quot;.</p>
            <p>Please call the 24/7 NSS emergency helpline at <strong>08752-255588</strong> for manual coordination.</p>
          </div>
        )}
      </div>

      {/* Blood Request Modal */}
      {showRequestModal && (
        <div className="gov-modal-backdrop" onClick={() => setShowRequestModal(false)}>
          <div className="gov-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="gov-modal-header">
              <h3>🚨 Emergency Blood Requirement Form</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setShowRequestModal(false)}
              >
                ✕
              </button>
            </div>

            {requestSubmitted ? (
              <div className="modal-success-state">
                <span className="success-icon">✅</span>
                <h4>Emergency Request Received!</h4>
                <p>
                  The NSS Blood Coordinator and registered campus volunteers with the required blood group have been alerted. You will receive an emergency call within 10 minutes.
                </p>
                <button
                  type="button"
                  className="modal-submit-btn"
                  onClick={() => {
                    setShowRequestModal(false);
                    setRequestSubmitted(false);
                  }}
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                className="gov-modal-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setRequestSubmitted(true);
                }}
              >
                <div className="form-group">
                  <label htmlFor="patient-name">Patient Name *</label>
                  <input id="patient-name" type="text" required placeholder="Full name of patient" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="req-group">Required Blood Group *</label>
                    <select id="req-group" required defaultValue="O+">
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="req-units">Units Required *</label>
                    <input id="req-units" type="number" min="1" max="10" defaultValue="1" required />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="hospital-name">Hospital Name & City *</label>
                  <input id="hospital-name" type="text" required placeholder="e.g. Area Hospital Nirmal / GGH Nizamabad" />
                </div>

                <div className="form-group">
                  <label htmlFor="attendant-phone">Attendant / Doctor Contact Number *</label>
                  <input id="attendant-phone" type="tel" required placeholder="10-digit mobile number" pattern="[0-9]{10}" />
                </div>

                <div className="modal-actions">
                  <button type="button" className="modal-cancel-btn" onClick={() => setShowRequestModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="modal-submit-btn">
                    Submit Emergency Request 🚨
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default BloodDonors;
