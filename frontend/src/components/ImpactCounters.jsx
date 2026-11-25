function ImpactCounters() {
  const stats = [
    {
      id: "volunteers",
      icon: "👥",
      count: "1,500+",
      label: "Enrolled Volunteers",
      sub: "Active student volunteers",
    },
    {
      id: "units",
      icon: "🏛️",
      count: "4 Units",
      label: "Operational Units",
      sub: "Dedicated faculty officers",
    },
    {
      id: "blood",
      icon: "🩸",
      count: "2,840+",
      label: "Blood Units Donated",
      sub: "Life-saving donor camps",
    },
    {
      id: "trees",
      icon: "🌱",
      count: "12,500+",
      label: "Tree Saplings Planted",
      sub: "Telangana Ku Haritha Haram",
    },
    {
      id: "hours",
      icon: "⏱️",
      count: "1,20,000+",
      label: "Service Hours Logged",
      sub: "Verified community service",
    },
    {
      id: "camps",
      icon: "⛺",
      count: "85+",
      label: "Special Village Camps",
      sub: "Rural development initiatives",
    },
  ];

  return (
    <section className="gov-impact-section" aria-label="National Service Scheme Impact Dashboard">
      <div className="gov-impact-container">
        <div className="gov-impact-header">
          <span className="gov-section-tag-light">NATIONAL SERVICE SCHEME AT A GLANCE</span>
          <h2 className="gov-impact-title">Institutional Impact & Community Reach</h2>
          <p className="gov-impact-subtitle">
            Demonstrating our commitment to society and nation-building through measurable community outcomes.
          </p>
        </div>

        <div className="gov-impact-grid">
          {stats.map((item) => (
            <div key={item.id} className="gov-impact-card">
              <div className="impact-icon-circle" aria-hidden="true">
                {item.icon}
              </div>
              <div className="impact-number">{item.count}</div>
              <div className="impact-label">{item.label}</div>
              <div className="impact-subtext">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImpactCounters;
