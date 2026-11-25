import { useState } from "react";
import { Link } from "react-router-dom";

function Circulars() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const documents = [
    {
      id: "DOC-2026-01",
      title: "Central NSS Volunteer Enrolment Guidelines for Academic Year 2026-27",
      number: "NSS/RGUKT/2026/CIR-14",
      date: "25-Nov-2026",
      category: "enrolment",
      size: "340 KB",
      format: "PDF",
      isNew: true,
      desc: "Detailed instructions, eligibility criteria, and selection procedure for joining NSS Unit-I to Unit-IV.",
    },
    {
      id: "DOC-2026-02",
      title: "Guidelines & Standard Operating Procedure for 7-Day Special Rural Camps",
      number: "NSS/RGUKT/2026/SOP-03",
      date: "18-Nov-2026",
      category: "camps",
      size: "520 KB",
      format: "PDF",
      isNew: true,
      desc: "SOP for camp management, daily schedule, survey methodology, and safety protocols in adopted villages.",
    },
    {
      id: "DOC-2026-03",
      title: "National Service Scheme (NSS) Manual — Ministry of Youth Affairs and Sports",
      number: "MYAS/NSS/GOI/MANUAL",
      date: "15-Oct-2026",
      category: "manual",
      size: "2.4 MB",
      format: "PDF",
      isNew: false,
      desc: "The official revised manual containing aims, administrative structure, emblem significance, and certificate criteria.",
    },
    {
      id: "DOC-2026-04",
      title: "Standard NSS Volunteer Work Diary & Logbook Template",
      number: "NSS/RGUKT/FORM-01",
      date: "10-Oct-2026",
      category: "forms",
      size: "180 KB",
      format: "PDF",
      isNew: false,
      desc: "Mandatory logbook for recording 240 hours of regular service and 7 days special camp activities.",
    },
    {
      id: "DOC-2026-05",
      title: "Proforma for Camp Medical Fitness & Parental Undertaking Form",
      number: "NSS/RGUKT/FORM-02",
      date: "02-Oct-2026",
      category: "forms",
      size: "145 KB",
      format: "PDF",
      isNew: false,
      desc: "Prescribed consent form required to be submitted by volunteers prior to departing for outstation rural camps.",
    },
    {
      id: "DOC-2026-06",
      title: "NSS Song, Pledge and National Youth Anthem (Sheet & Lyrics)",
      number: "NSS/RGUKT/DOC-06",
      date: "24-Sep-2026",
      category: "manual",
      size: "95 KB",
      format: "PDF",
      isNew: false,
      desc: "Official Hindi and English text of 'Uthe Samaj Ke Liye Uthe' and National Youth Pledge.",
    },
    {
      id: "DOC-2026-07",
      title: "Advisory on Plastic-Free Green Campus & E-Waste Management",
      number: "NSS/RGUKT/2026/ADV-09",
      date: "12-Sep-2026",
      category: "orders",
      size: "290 KB",
      format: "PDF",
      isNew: false,
      desc: "University executive order regarding ban on single-use plastics and bi-weekly cleanup schedule.",
    },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="gov-page-container">
      {/* Breadcrumb */}
      <nav className="gov-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">Circulars & Downloads</span>
      </nav>

      <div className="gov-page-header">
        <span className="gov-page-tag">OFFICIAL REPOSITORY</span>
        <h1 className="gov-page-title">Circulars, Notifications & Downloadable Forms</h1>
        <p className="gov-page-subtitle">
          Official orders, manuals, guidelines, and prescribed forms issued by the NSS Cell, RGUKT Basar and Ministry of Youth Affairs.
        </p>
        <div className="gov-title-underline">
          <span className="underline-tricolor-saffron"></span>
          <span className="underline-tricolor-white"></span>
          <span className="underline-tricolor-green"></span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="gov-filter-bar">
        <div className="gov-search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search circular by title or reference number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gov-search-input"
          />
        </div>

        <div className="gov-category-pills">
          <button
            type="button"
            className={`category-pill ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Documents ({documents.length})
          </button>
          <button
            type="button"
            className={`category-pill ${selectedCategory === "enrolment" ? "active" : ""}`}
            onClick={() => setSelectedCategory("enrolment")}
          >
            Enrolment
          </button>
          <button
            type="button"
            className={`category-pill ${selectedCategory === "camps" ? "active" : ""}`}
            onClick={() => setSelectedCategory("camps")}
          >
            Camps & SOP
          </button>
          <button
            type="button"
            className={`category-pill ${selectedCategory === "forms" ? "active" : ""}`}
            onClick={() => setSelectedCategory("forms")}
          >
            Prescribed Forms
          </button>
          <button
            type="button"
            className={`category-pill ${selectedCategory === "manual" ? "active" : ""}`}
            onClick={() => setSelectedCategory("manual")}
          >
            NSS Manuals
          </button>
        </div>
      </div>

      {/* Documents Table */}
      <div className="gov-table-wrapper" id="downloads">
        <table className="gov-table">
          <thead>
            <tr>
              <th scope="col" style={{ width: "60px" }}>S.No.</th>
              <th scope="col" style={{ width: "120px" }}>Date</th>
              <th scope="col" style={{ width: "160px" }}>Reference No.</th>
              <th scope="col">Document Title & Details</th>
              <th scope="col" style={{ width: "110px" }}>File Details</th>
              <th scope="col" style={{ width: "140px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc, idx) => (
                <tr key={doc.id}>
                  <td className="text-center"><strong>{idx + 1}</strong></td>
                  <td>
                    <span className="table-date">{doc.date}</span>
                  </td>
                  <td>
                    <code className="table-ref-code">{doc.number}</code>
                  </td>
                  <td>
                    <div className="table-doc-title">
                      <strong>{doc.title}</strong>
                      {doc.isNew && <span className="table-new-badge">NEW</span>}
                    </div>
                    <p className="table-doc-desc">{doc.desc}</p>
                  </td>
                  <td>
                    <span className="table-file-badge">
                      📄 {doc.format} ({doc.size})
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="table-download-action"
                      onClick={() => alert(`Downloading official document: ${doc.title} (${doc.number})`)}
                    >
                      <span>📥 Download</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="table-no-results">
                  No official documents found matching &quot;{searchQuery}&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Compliance Note */}
      <div className="gov-info-card">
        <div className="info-card-icon">🏛️</div>
        <div className="info-card-content">
          <h4>Official Document Policy</h4>
          <p>
            All circulars and office orders published on this portal are authentic and verified by the Nodal Officer, NSS RGUKT Basar. In case of any discrepancy or query regarding circular interpretations, please contact the NSS Office at SAC Building or email <code>nss@rgukt.ac.in</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Circulars;
