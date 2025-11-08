import React from "react";
import "../styles/Sidebar.css"; // global sidebar styles

export default function Sidebar({ actions = [], active, onAction }) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Actions</h3>
      <ul>
        {actions.map((action) => (
          <li key={action}>
            <button
              className={`sidebar-btn ${active === action ? "active" : ""}`}
              onClick={() => onAction(action)}
            >
              {action}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
