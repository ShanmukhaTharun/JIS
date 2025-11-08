import React, { useState } from "react";
import Layout from "../components/Layout";

// Import action components
import RegisterNewCase from "../components/registrarActions/RegisterNewCase";
import UpdateCaseInfo from "../components/registrarActions/UpdateCaseInfo";
import ApproveCaseFiles from "../components/registrarActions/ApproveCaseFiles";
import AssignCaseToJudge from "../components/registrarActions/AssignCaseToJudge";
import ManageCourtSchedule from "../components/registrarActions/ManageCourtSchedule";

const ACTIONS = [
  "Register New Case",
  "Update Case Information",
  "Approve Case Files",
  "Assign Case to Judge",
  "Manage Court Schedule",
];

export default function Registrar() {
  const [active, setActive] = useState(ACTIONS[0]);

  const renderAction = () => {
    switch (active) {
      case "Register New Case":
        return <RegisterNewCase />;
      case "Update Case Information":
        return <UpdateCaseInfo />;
      case "Approve Case Files":
        return <ApproveCaseFiles />;
      case "Assign Case to Judge":
        return <AssignCaseToJudge />;
      case "Manage Court Schedule":
        return <ManageCourtSchedule />;
      default:
        return <p>Select an action from the sidebar.</p>;
    }
  };

  return (
    <Layout roleName="Registrar" actions={ACTIONS} active={active} setActive={setActive}>
      {renderAction()}
    </Layout>
  );
}
