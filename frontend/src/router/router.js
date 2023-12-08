import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UpdateForm from "@/components/UpdateForm"; // Make sure to adjust the import paths
import Dashboard from "@/components/UserList";
import CreateForm from "@/components/CreateForm";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit-user/:userId" element={<UpdateForm />} />
        <Route path="/create-user" element={<CreateForm />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
