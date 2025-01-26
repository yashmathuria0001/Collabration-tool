import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatCard from "./StatCard";
import EditProfileDialog from "./EditProfileDialog";
import Timeline from "./Timeline";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import Footer from "../shared/Footer";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Full-stack developer passionate about creating amazing web applications.",
    avatar: "https://github.com/shadcn.png",
  });

  const [stats, setStats] = useState({
    projects: 0,
    collaborators: 0,
  });

  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetchUserStats();
    fetchUserUpdates();
  }, []);

  const fetchUserStats = async () => {
    setStats({
      projects: 15,
      collaborators: 23,
    });
  };

  const fetchUserUpdates = async () => {
    setUpdates([
      { action: "Updated profile", date: "2023-06-15 14:30" },
      { action: "Created new project", date: "2023-06-14 10:15" },
      { action: "Collaborated on Project X", date: "2023-06-13 16:45" },
      { action: "Updated project settings", date: "2023-06-12 09:00" },
      { action: "Joined the platform", date: "2023-06-01 11:30" },
    ]);
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser({ ...user, ...updatedUser });
    setUpdates([
      { action: "Updated profile", date: new Date().toLocaleString() },
      ...updates,
    ]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <div>
          <Sidebar className="w-[250px] bg-gray-100 p-4" />
        </div>

        <div className="flex-grow container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Card className="mb-4">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">{user.name}</CardTitle>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                  <EditProfileDialog
                    user={user}
                    onUpdate={handleProfileUpdate}
                  />
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{user.bio}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StatCard title="Projects" value={stats.projects} />
                    <StatCard
                      title="Collaborators"
                      value={stats.collaborators}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Timeline updates={updates} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
