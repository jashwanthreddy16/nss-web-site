import { useState } from "react";
import { Link } from "react-router-dom";

function YuvaMitraAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Namaste! 🙏 I am **Yuva Mitra**, your official virtual guide for NSS RGUKT Basar. How can I assist you today?",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");

  const faqs = [
    {
      q: "How do I register as an NSS Volunteer?",
      a: "Online enrolments for the 2026-27 cohort are currently open! Head over to the **[Join NSS](/join)** page, fill in your University ID, department, contact details, and blood group. The selection list will be published under **[Circulars](/circulars)**.",
    },
    {
      q: "How are the 240 Service Hours completed?",
      a: "According to the Ministry of Youth Affairs (MYAS) guidelines, volunteers must complete **120 hours of regular service per year** for 2 consecutive years (total 240 hours), plus participate in at least one **7-day Special Rural Immersion Camp** to qualify for the Central NSS Certificate.",
    },
    {
      q: "How can I request emergency blood?",
      a: "You can search campus volunteers by blood group in our **[Emergency Blood Donors Directory](/blood-donors)** or call the 24/7 SAC emergency desk at **08752-255588**.",
    },
    {
      q: "What are the 4 NSS Units at RGUKT Basar?",
      a: "RGUKT Basar operates 4 sanctioned units (Unit-I to Unit-IV) under the university coordinator. Each unit is led by a dedicated faculty Program Officer and adopts neighboring villages for social upliftment. Details are on the **[NSS Units](/units)** page.",
    },
    {
      q: "How do I request a student scribe for exams?",
      a: "Specially-abled students requiring exam scribes can submit a request through the NSS Office at SAC Building or email `nss@rgukt.ac.in`. Our verified student volunteers are paired for academic exam assistance.",
    },
  ];

  const handleAsk = (question, answer) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      { sender: "bot", text: answer },
    ]);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userText = inputQuery.trim();
    setInputQuery("");

    // Simple keyword matching for common queries
    let botReply =
      "Thank you for contacting Yuva Mitra. For detailed inquiries or official endorsements, please visit the NSS Cell at Student Activity Center (SAC) or email `nss@rgukt.ac.in`.";

    const lower = userText.toLowerCase();
    if (lower.includes("join") || lower.includes("register") || lower.includes("enrol") || lower.includes("apply")) {
      botReply =
        "You can apply for the 2-Year NSS certification program on our [Join NSS page](/join). Registration is open for B.Tech students!";
    } else if (lower.includes("blood") || lower.includes("donor")) {
      botReply =
        "We have an active [Emergency Blood Donors Directory](/blood-donors) with 24/7 volunteer contact coordinators across all blood groups!";
    } else if (lower.includes("hour") || lower.includes("certificate") || lower.includes("credit")) {
      botReply =
        "Volunteers must log 120 regular service hours per academic year and attend a 7-day special camp to receive the official NSS certificate from the Ministry of Youth Affairs.";
    } else if (lower.includes("camp") || lower.includes("village")) {
      botReply =
        "NSS RGUKT Basar organizes 7-day rural immersion camps in adopted villages (Saleguda, Gangadhar, Bidrelli) focusing on sanitation, education, and social audits. Check [Activities](/activities).";
    } else if (lower.includes("circular") || lower.includes("order") || lower.includes("manual")) {
      botReply =
        "All official orders, circulars, and the NSS Manual PDF are available on the [Circulars & Downloads](/circulars) repository.";
    }

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userText },
      { sender: "bot", text: botReply },
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        className={`gov-yuva-mitra-fab ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        title="Yuva Mitra — Virtual NSS Assistant (nss.gov.in standard)"
        aria-label="Open Yuva Mitra NSS Virtual Assistant"
      >
        <span className="fab-avatar" role="img" aria-label="Yuva Mitra Mascot">
          🇮🇳
        </span>
        <span className="fab-label">Yuva Mitra</span>
        <span className="fab-tag">AI Guide</span>
      </button>

      {/* Assistant Modal / Drawer */}
      {isOpen && (
        <div className="gov-yuva-mitra-window" role="dialog" aria-label="Yuva Mitra Helpdesk">
          {/* Header */}
          <div className="ym-header">
            <div className="ym-header-info">
              <span className="ym-emblem">🇮🇳</span>
              <div>
                <h3 className="ym-title">Yuva Mitra | युवा मित्र</h3>
                <p className="ym-sub">Official NSS Virtual Assistant • RGUKT Basar</p>
              </div>
            </div>
            <button
              type="button"
              className="ym-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant"
            >
              ✕
            </button>
          </div>

          {/* Chat Transcript */}
          <div className="ym-body">
            {messages.map((msg, index) => (
              <div key={index} className={`ym-message ${msg.sender}`}>
                {msg.sender === "bot" && <span className="ym-bot-icon">🏛️</span>}
                <div className="ym-bubble">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: msg.text
                        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>'),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Quick FAQ Pills */}
          <div className="ym-faq-tray">
            <span className="faq-tray-label">Frequently Asked Questions:</span>
            <div className="faq-pills">
              {faqs.map((faq, i) => (
                <button
                  key={i}
                  type="button"
                  className="faq-pill-btn"
                  onClick={() => handleAsk(faq.q, faq.a)}
                >
                  {faq.q}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form className="ym-footer" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Ask anything about NSS RGUKT Basar..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="ym-input"
            />
            <button type="submit" className="ym-send-btn" aria-label="Send message">
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default YuvaMitraAssistant;
