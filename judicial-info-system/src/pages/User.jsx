import React, { useState } from "react";
import Layout from "../components/Layout";

// Import all actions
import ViewCaseStatus from "../components/userActions/ViewCaseStatus";
import DownloadCaseReports from "../components/userActions/DownloadCaseReports";
import SubmitRequest from "../components/userActions/SubmitRequest";
import ContactLawyer from "../components/userActions/ContactLawyer";
import RequestCaseDetails from "../components/userActions/RequestCaseDetails";

const ACTIONS = [
  "View Case Status",
  "Download Case Reports",
  "Submit Request",
  "Contact Lawyer",
  "Request Case Details",
];

const ACTION_COMPONENTS = {
  "View Case Status": ViewCaseStatus,
  "Download Case Reports": DownloadCaseReports,
  "Submit Request": SubmitRequest,
  "Contact Lawyer": ContactLawyer,
  "Request Case Details": RequestCaseDetails,
};

export default function User() {
  const [active, setActive] = useState(ACTIONS[0]);
  const ActiveComponent = ACTION_COMPONENTS[active];

  return (
    <Layout roleName="User" actions={ACTIONS} active={active} setActive={setActive}>
      <ActiveComponent />
    </Layout>
  );
}
