import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";

const ProjectCard = ({ project }) => (
  <Card className="w-[300px]">
    <CardHeader>
      <CardTitle>{project.title}</CardTitle>
      <CardDescription>Last edited: {project.lastEdited}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>{project.description}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline">Edit</Button>
      <Button>Open</Button>
    </CardFooter>
  </Card>
);

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "Project 1",
      description: "This is project 1",
      lastEdited: "2023-04-01",
    },
    {
      id: 2,
      title: "Project 2",
      description: "This is project 2",
      lastEdited: "2023-04-02",
    },
    {
      id: 3,
      title: "Project 3",
      description: "This is project 3",
      lastEdited: "2023-04-03",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex">
        {/* Sidebar Section */}
        <Sidebar className="w-[250px] bg-gray-100 p-4" />
        {/* Main Content Section */}
        <div className="flex-grow container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">My Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
