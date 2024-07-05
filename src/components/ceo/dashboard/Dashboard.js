import React from "react";
import MyLineChart from "./Charts/LineChart";
import MyBarChart from "./Charts/BarChart";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="charts">
        <MyLineChart />
        <MyBarChart />
      </div>
    </div>
  );
};

export default Dashboard;
