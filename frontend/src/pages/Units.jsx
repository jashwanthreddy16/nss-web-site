function Units() {
  const unitsData = [
    {
      unit: "Unit I",
      officer: "Faculty Programme Officer - Unit I",
      volunteers: "100+ Volunteers",
      focus: "Environmental Sustainability & Cleanliness Drives",
      description:
        "Unit I leads regular plantation drives, campus cleanliness campaigns (Swachh Bharat), and waste management awareness programs across RGUKT Basar and neighboring villages.",
    },
    {
      unit: "Unit II",
      officer: "Faculty Programme Officer - Unit II",
      volunteers: "100+ Volunteers",
      focus: "Health, Blood Donation & Medical Camps",
      description:
        "Unit II organizes mega blood donation camps, free medical check-up camps, nutrition awareness, and mental health workshops for campus students and local communities.",
    },
    {
      unit: "Unit III",
      officer: "Faculty Programme Officer - Unit III",
      volunteers: "100+ Volunteers",
      focus: "Rural Literacy & Youth Empowerment",
      description:
        "Unit III volunteers visit rural schools in Basar mandal, providing coaching in STEM and basic computer literacy, along with career guidance for school students.",
    },
    {
      unit: "Unit IV",
      officer: "Faculty Programme Officer - Unit IV",
      volunteers: "100+ Volunteers",
      focus: "Social Awareness, Gender Equity & Disaster Management",
      description:
        "Unit IV is dedicated to street plays, gender equity workshops, voter awareness rallies, disaster preparedness drills, and national day celebrations.",
    },
  ];

  return (
    <div style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <span
          style={{
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "3px",
            color: "#174a7e",
            textTransform: "uppercase",
          }}
        >
          National Service Scheme • RGUKT Basar
        </span>
        <h1
          style={{
            fontSize: "36px",
            color: "#174a7e",
            margin: "12px 0 16px",
            fontWeight: "700",
          }}
        >
          NSS Units
        </h1>
        <p
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            color: "#4a5568",
            fontSize: "16px",
            lineHeight: "1.6",
          }}
        >
          The National Service Scheme at RGUKT Basar is organized into functional units,
          each fostering leadership, social responsibility, and community outreach.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {unitsData.map((item) => (
          <div
            key={item.unit}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "28px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(23, 74, 126, 0.08)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                borderBottom: "2px solid #e2e8f0",
                paddingBottom: "12px",
              }}
            >
              <h3 style={{ margin: 0, color: "#174a7e", fontSize: "22px" }}>
                {item.unit}
              </h3>
              <span
                style={{
                  background: "#ebf4ff",
                  color: "#174a7e",
                  fontSize: "12px",
                  fontWeight: "600",
                  padding: "4px 10px",
                  borderRadius: "20px",
                }}
              >
                {item.volunteers}
              </span>
            </div>

            <p style={{ margin: "0 0 12px", fontWeight: "600", color: "#2d3748" }}>
              {item.officer}
            </p>
            <p
              style={{
                margin: "0 0 14px",
                fontSize: "13px",
                color: "#174a7e",
                fontWeight: "600",
              }}
            >
              Focus: {item.focus}
            </p>
            <p
              style={{
                margin: 0,
                color: "#4a5568",
                fontSize: "14px",
                lineHeight: "1.6",
                flexGrow: 1,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Units;
