import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProjectCard from "./ProjectCard";
import NewProjectCard from "./NewProjectCard";
import NewProjectForm from "./NewProjectForm";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import Footer from "../shared/Footer";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([
    {
      _id: 1,
      name: "Project 1",
      description: "This is project 1",
      updatedAt: new Date(),
    },
    {
      _id: 2,
      name: "Project 2",
      description: "This is project 2",
      updatedAt: new Date(),
    },
    {
      _id: 3,
      name: "Project 3",
      description: "This is project 3",
      updatedAt: new Date(),
    },
  ]);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);

  const handleCreateProject = (projectData) => {
    const newProject = {
      _id: projects.length + 1,
      ...projectData,
      updatedAt: new Date(),
    };
    setProjects([...projects, newProject]);
    setIsNewProjectDialogOpen(false);
  };

  const handleEditProject = (project) => {
    console.log("Edit project:", project);
  };

  const handleOpenProject = (project) => {
    console.log("Open project:", project);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex">
        <div>
          <Sidebar className="w-64 bg-background border-r" />
        </div>

        <main className="flex-grow p-6">
          <h1 className="text-3xl font-bold mb-6">My Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <NewProjectCard onCreate={() => setIsNewProjectDialogOpen(true)} />
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEditProject}
                onOpen={handleOpenProject}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
      <Dialog
        open={isNewProjectDialogOpen}
        onOpenChange={setIsNewProjectDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <NewProjectForm onSubmit={handleCreateProject} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectsPage;
