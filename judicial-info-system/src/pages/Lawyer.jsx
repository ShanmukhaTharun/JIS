import React, { useState } from "react";
import Layout from "../components/Layout";
import ProfileSummary from "../components/ProfileSummary";

import ViewAssignedCases from "../components/lawyerActions/ViewAssignedCases";
import SubmitCaseReport from "../components/lawyerActions/SubmitCaseReport";
import UploadDocuments from "../components/lawyerActions/UploadDocuments";
import ViewHearingSchedule from "../components/lawyerActions/ViewHearingSchedule";
import CommunicateWithJudge from "../components/lawyerActions/CommunicateWithJudge";

const ACTIONS = [
  "View Assigned Cases",
  "Submit Case Report",
  "Upload Documents",
  "View Hearing Schedule",
  "Communicate with Judge",
];

export default function Lawyer() {
  const [active, setActive] = useState(ACTIONS[0]);

  const renderContent = () => {
    switch (active) {
      case "View Assigned Cases":
        return <ViewAssignedCases />;
      case "Submit Case Report":
        return <SubmitCaseReport />;
      case "Upload Documents":
        return <UploadDocuments />;
      case "View Hearing Schedule":
        return <ViewHearingSchedule />;
      case "Communicate with Judge":
        return <CommunicateWithJudge />;
      default:
        return <p>Select an action from the sidebar.</p>;
    }
  };

  return (
    <Layout roleName="Lawyer" actions={ACTIONS} active={active} setActive={setActive}>
      <ProfileSummary />
      {renderContent()}
    </Layout>
  );
}
