import React, { useState } from "react";
import Layout from "../components/Layout";
import styles from "./Judge.module.css";

import ViewCaseDetails from "../components/judgeActions/ViewCaseDetails";
import AssignLawyer from "../components/judgeActions/AssignLawyer";
import ScheduleHearing from "../components/judgeActions/ScheduleHearing";
import ReviewEvidence from "../components/judgeActions/ReviewEvidence";
import DeliverJudgement from "../components/judgeActions/DeliverJudgement";

const ACTIONS = [
  "View Case Details",
  "Assign Lawyer",
  "Schedule Hearing",
  "Review Evidence",
  "Deliver Judgement",
];

export default function Judge() {
  const [active, setActive] = useState(ACTIONS[0]);

  const renderContent = () => {
    switch (active) {
      case "View Case Details":
        return <ViewCaseDetails />;
      case "Assign Lawyer":
        return <AssignLawyer />;
      case "Schedule Hearing":
        return <ScheduleHearing />;
      case "Review Evidence":
        return <ReviewEvidence />;
      case "Deliver Judgement":
        return <DeliverJudgement />;
      default:
        return <div>Select an action</div>;
    }
  };

  return (
    <Layout roleName="Judge" actions={ACTIONS} active={active} setActive={setActive}>
      <div className={styles.main}>
        <h2 className={styles.heading}>{active}</h2>
        <div className={styles.placeholder}>{renderContent()}</div>
      </div>
    </Layout>
  );
}
