import React, { useState } from "react";
import { Truck, Search, MapPin, Star, CheckCircle, AlertCircle } from "lucide-react";


const Transport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const config = {
    title: "Live Emergency Transport",
    sub: "Ambulances, evacuation vans and volunteer driver fleet updated in real-time.",
    icon: Truck,
    searchPlaceholder: "Search vehicle type, hospital or driver...",
    filterChips: ["Ambulance", "ICU Van", "Evacuation", "Wheelchair", "Volunteer car"],
    unitLabel: "available",
    critical: {
      title: "ICU ambulance needed — Lajpat Nagar accident scene",
      meta: "Cardiac patient · Within 8 minutes",
      cta: "Dispatch nearest",
    },
    items: [
      {
        name: "ALS Ambulance · DL-08-AM-2241",
        meta: "GTB Hospital fleet · Paramedic on board",
        distanceKm: 1.2,
        available: 1,
        unit: "vehicle",
        rating: 4.9,
        verified: true,
        status: "live",
        tags: ["Ambulance", "ICU Van"],
        eta: "4 min",
      },
      {
        name: "Rescue Van · Civil Defence",
        meta: "Multi-stretcher · Flood evacuation ready",
        distanceKm: 2.0,
        available: 2,
        unit: "vehicles",
        rating: 4.7,
        verified: true,
        status: "live",
        tags: ["Evacuation"],
        eta: "9 min",
      },
      {
        name: "Aditya — Volunteer driver",
        meta: "Sedan · Wheelchair foldable · Free 6-10 PM",
        distanceKm: 0.9,
        available: 1,
        unit: "ride",
        rating: 4.8,
        verified: true,
        status: "live",
        tags: ["Volunteer car", "Wheelchair"],
        eta: "6 min",
      },
      {
        name: "BLS Ambulance · DL-12-AM-0098",
        meta: "Apollo network · Oxygen + AED",
        distanceKm: 3.6,
        available: 1,
        unit: "vehicle",
        rating: 4.6,
        verified: true,
        status: "low",
        tags: ["Ambulance"],
        eta: "11 min",
      },
      {
        name: "Community Mini-bus",
        meta: "12 seats · Group evacuation · Diesel",
        distanceKm: 5.1,
        available: 1,
        unit: "vehicle",
        rating: 4.5,
        verified: false,
        status: "live",
        tags: ["Evacuation"],
        eta: "17 min",
      },
    ],
    stats: [
      { label: "Vehicles online", value: "37", tone: "ok" },
      { label: "Avg dispatch", value: "5.4m" },
      { label: "ICU units free", value: "4", tone: "warn" },
      { label: "Rides today", value: "126", tone: "ok" },
    ],
    tips: [
      { title: "Free for emergencies", body: "Volunteer rides waive fare during declared emergencies." },
      { title: "Share location", body: "Tap 'Request' to auto-share GPS with the responder." },
      { title: "Pre-hospital care", body: "ALS units include a trained paramedic, BLS do not." },
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
          Showing {filteredItems.length} of {config.items.length} vehicles
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
                    {item.available} {item.unit}{item.available > 1 && "s"}
                  </span>
                </div>

                <div className="item-rating">
                  <Star size={16} className="star" />
                  <span>{item.rating}</span>
                </div>

                {item.eta && <span className="eta">{item.eta}</span>}
              </div>

              <button className="request-button">Request Transport</button>
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

export default Transport;