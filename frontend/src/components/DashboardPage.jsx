import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";

const data = [
  { name: "Jan", projects: 4, collaborators: 2 },
  { name: "Feb", projects: 3, collaborators: 3 },
  { name: "Mar", projects: 5, collaborators: 4 },
  { name: "Apr", projects: 7, collaborators: 5 },
  { name: "May", projects: 6, collaborators: 4 },
  { name: "Jun", projects: 8, collaborators: 6 },
];

const DashboardPage = () => {
  const totalProjects = 15;
  const totalCollaborators = 8;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex">
        {/* Sidebar Section */}
        <Sidebar className="w-[250px] bg-gray-100 p-4" />
        {/* Main Content Section */}
        <div className="flex-grow container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{totalProjects}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Collaborators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{totalCollaborators}</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="projects" stroke="#8884d8" />
                  <Line
                    type="monotone"
                    dataKey="collaborators"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
