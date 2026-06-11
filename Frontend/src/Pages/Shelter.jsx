import React, { useState } from "react";
import { Home, Search, MapPin, Star, CheckCircle, AlertCircle } from "lucide-react";


const Shelter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const config = {
    title: "Live Shelter Availability",
    sub: "Relief camps, community halls and verified host families with open beds tonight.",
    icon: Home,
    searchPlaceholder: "Search shelter, camp or host...",
    filterChips: ["Family", "Women only", "Children", "Senior care", "Pet-friendly", "Accessible"],
    unitLabel: "beds free",
    critical: {
      title: "Fire evacuation · 26 displaced from Govindpuri need shelter tonight",
      meta: "Need family + senior-friendly beds within 3 km",
      cta: "Offer space",
    },
    items: [
      {
        name: "Indira Gandhi Community Hall",
        meta: "Govt. relief camp · Hot food + bedding",
        distanceKm: 2.1,
        available: 38,
        capacity: 120,
        unit: "beds",
        rating: 4.6,
        verified: true,
        status: "live",
        tags: ["Family", "Children", "Accessible"],
      },
      {
        name: "Sakhi Home — Women & Children",
        meta: "Staffed 24×7 · Counselor on site",
        distanceKm: 3.4,
        available: 12,
        capacity: 30,
        unit: "beds",
        rating: 4.9,
        verified: true,
        status: "live",
        tags: ["Women only", "Children"],
      },
      {
        name: "St. Mary's School (relief mode)",
        meta: "Auditorium · Power backup + medical post",
        distanceKm: 1.6,
        available: 80,
        capacity: 200,
        unit: "beds",
        rating: 4.7,
        verified: true,
        status: "live",
        tags: ["Family", "Pet-friendly"],
      },
      {
        name: "Verified host · Mehra family",
        meta: "1 room + bath · 1 week max · Vegetarian home",
        distanceKm: 0.9,
        available: 3,
        unit: "beds",
        rating: 5.0,
        verified: true,
        status: "live",
        tags: ["Family", "Senior care"],
        eta: "15 min",
      },
      {
        name: "Old Age Care Centre · HelpAge",
        meta: "Senior medical care + physiotherapy",
        distanceKm: 4.7,
        available: 4,
        capacity: 25,
        unit: "beds",
        rating: 4.8,
        verified: true,
        status: "low",
        tags: ["Senior care", "Accessible"],
      },
    ],
    stats: [
      { label: "Shelters live", value: "18", tone: "ok" },
      { label: "Beds free", value: "412", tone: "ok" },
      { label: "Urgent needs", value: "3", tone: "bad" },
      { label: "Sheltered today", value: "1,247" },
    ],
    tips: [
      { title: "Verified hosts", body: "All host families pass background + address verification." },
      { title: "Stay duration", body: "Standard stay is 72 hours, extendable based on situation." },
      { title: "Bring essentials", body: "Carry ID, medicines and one change of clothes if possible." },
    ],
  };

  const filteredItems = config.items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meta.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => item.tags.includes(filter));
    return matchesSearch && matchesFilter;
  });

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="availability-container">
      <header className="header">
        <div className="header-content">
          <h1>{config.title}</h1>
          <p className="subtitle">{config.sub}</p>
        </div>
      </header>

      {/* Critical Alert */}
      <section className="critical-alert">
        <AlertCircle className="critical-icon" />
        <div className="critical-content">
          <h3>{config.critical.title}</h3>
          <p>{config.critical.meta}</p>
        </div>
        <button className="cta-button">{config.critical.cta}</button>
      </section>

      {/* Stats */}
      <section className="stats-grid">
        {config.stats.map((stat, idx) => (
          <div key={idx} className={`stat-card stat-${stat.tone || "default"}`}>
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* Search & Filters */}
      <section className="search-section">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder={config.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          {config.filterChips.map((chip) => (
            <button
              key={chip}
              className={`filter-chip ${selectedFilters.includes(chip) ? "active" : ""}`}
              onClick={() => toggleFilter(chip)}
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* Items List */}
      <section className="items-section">
        <div className="items-count">
          Showing {filteredItems.length} of {config.items.length} shelters
        </div>

        <div className="items-list">
          {filteredItems.map((item, idx) => (
            <div key={idx} className={`item-card status-${item.status}`}>
              <div className="item-header">
                <div className="item-title-section">
                  <h3>{item.name}</h3>
                  {item.verified && <CheckCircle size={16} className="verified-badge" />}
                </div>
                <div className="item-distance">
                  <MapPin size={16} />
                  {item.distanceKm} km
                </div>
              </div>

              <p className="item-meta">{item.meta}</p>

              <div className="item-tags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="item-footer">
                <div className="item-availability">
                  <span className="available-count">
                    {item.available} {item.unit}
                  </span>
                  {item.capacity && (
                    <span className="capacity">
                      / {item.capacity} total
                    </span>
                  )}
                </div>

                <div className="item-rating">
                  <Star size={16} className="star" />
                  <span>{item.rating}</span>
                </div>

                {item.eta && <span className="eta">{item.eta}</span>}
              </div>

              <button className="request-button">Request Space</button>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="tips-section">
        <h2>Quick Tips</h2>
        <div className="tips-grid">
          {config.tips.map((tip, idx) => (
            <div key={idx} className="tip-card">
              <h4>{tip.title}</h4>
              <p>{tip.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Shelter;