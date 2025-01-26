import React, { useState, useCallback } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import VideoConference from "./VideoConference"
import InviteCollaboratorForm from "./InviteCollaboratorForm"
import CollaboratorsList from "./CollaboratorsList"

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

const DocumentEditor = ({ documentId }) => {
  const [quill, setQuill] = useState(null)
  const [collaborators, setCollaborators] = useState([
    { email: "alice@example.com", role: "editor" },
    { email: "bob@example.com", role: "reader" },
  ])
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const [saveDescription, setSaveDescription] = useState("")

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return

    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    setQuill(q)
  }, [])

  const inviteCollaborator = (email, role) => {
    setCollaborators([...collaborators, { email, role }])
    toast.success(`Invited ${email} as ${role}`)
  }

  const openSaveDialog = () => {
    setIsSaveDialogOpen(true)
  }

  const saveChanges = () => {
    if (quill) {
      const content = quill.getContents()
      console.log("Saving document:", content)
      console.log("Save description:", saveDescription)
      toast.success("Changes saved successfully")
      setIsSaveDialogOpen(false)
      setSaveDescription("")
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Document Editor</h1>
        <div className="flex flex-wrap gap-2">
          <VideoConference />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Invite Collaborator</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Collaborator</DialogTitle>
              </DialogHeader>
              <InviteCollaboratorForm onInvite={inviteCollaborator} />
            </DialogContent>
          </Dialog>
          <Button onClick={openSaveDialog}>Save Changes</Button>
        </div>
      </div>
      <div className="border rounded-lg mb-4">
        <div ref={wrapperRef} className="h-[calc(100vh-300px)] min-h-[400px]"></div>
      </div>
      <CollaboratorsList collaborators={collaborators} />

      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Changes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="saveDescription">Description</Label>
              <Textarea
                id="saveDescription"
                placeholder="Describe your changes..."
                value={saveDescription}
                onChange={(e) => setSaveDescription(e.target.value)}
              />
            </div>
            <Button onClick={saveChanges}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DocumentEditor

