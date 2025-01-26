import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const NewProjectForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const name = formData.get("name")
    const description = formData.get("description")
    onSubmit({ name, description })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Project Name</Label>
        <Input id="name" name="name" placeholder="Enter project name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="Enter project description" rows={4} />
      </div>
      <Button type="submit" className="w-full">
        Create Project
      </Button>
    </form>
  )
}

export default NewProjectForm

