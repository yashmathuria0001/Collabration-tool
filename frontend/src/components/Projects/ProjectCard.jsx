import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"

const ProjectCard = ({ project, onEdit, onOpen }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-lg">{project.name}</CardTitle>
      <CardDescription className="flex items-center text-sm text-muted-foreground">
        <CalendarIcon className="mr-1 h-3 w-3" />
        Last edited: {new Date(project.updatedAt).toLocaleDateString()}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="line-clamp-3 text-sm">{project.description}</p>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Button variant="outline" size="sm" onClick={() => onEdit(project)}>
        Edit
      </Button>
      <Button size="sm" onClick={() => onOpen(project)}>
        Open
      </Button>
    </CardFooter>
  </Card>
)

export default ProjectCard

