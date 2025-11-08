import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/Layout.css"; // create this next!

export default function Layout({ roleName, actions, active, setActive, children }) {
  return (
    <div className="layout">
      <Navbar roleName={roleName} />
      <div className="layout-body">
        <Sidebar actions={actions} onAction={setActive} active={active} />
        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}
