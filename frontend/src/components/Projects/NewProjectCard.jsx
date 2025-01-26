import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

const NewProjectCard = ({ onCreate }) => (
  <Card
    className="w-full h-full flex items-center justify-center cursor-pointer hover:bg-accent transition-colors group"
    onClick={onCreate}
  >
    <CardContent>
      <div className="text-center">
        <Plus className="w-12 h-12 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
        <p className="text-lg font-medium text-muted-foreground group-hover:text-primary transition-colors">
          Create New Project
        </p>
      </div>
    </CardContent>
  </Card>
)

export default NewProjectCard

