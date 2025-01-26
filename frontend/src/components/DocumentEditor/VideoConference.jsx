import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"

const VideoConference = () => {
  const [meetingCode, setMeetingCode] = useState("")
  const [isJoining, setIsJoining] = useState(false)

  const startMeeting = () => {
    const newMeetingCode = Math.random().toString(36).substring(7)
    toast.success(`Meeting started with code: ${newMeetingCode}`)
    // Here you would typically initiate the video call
  }

  const joinMeeting = (e) => {
    e.preventDefault()
    if (meetingCode.trim()) {
      toast.success(`Joining meeting with code: ${meetingCode}`)
      // Here you would typically join the video call
      setIsJoining(false)
      setMeetingCode("")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="m22 8-6 4 6 4V8Z" />
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
          </svg>
          Video Call
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Video Conference</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={startMeeting} className="w-full">
            Start New Meeting
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>
          <form onSubmit={joinMeeting}>
            <div className="grid gap-2">
              <Label htmlFor="meetingCode">Join Existing Meeting</Label>
              <Input
                id="meetingCode"
                placeholder="Enter meeting code"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
              />
              <Button type="submit">Join Meeting</Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VideoConference

