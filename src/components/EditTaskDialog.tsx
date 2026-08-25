import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/stores/store"
import { updateTask, type Task } from "@/stores/slices/task.slice"

type EditTaskDialogProps = {
  task: Task
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditTaskDialog({
  task,
  open,
  onOpenChange,
}: EditTaskDialogProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [name, setName] = useState(task.name)

  const handleUpdate = () => {
    if (!name.trim()) return

    dispatch(
      updateTask({
        id: task.id,
        name: name.trim(),
      })
    )

    onOpenChange(false)
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>

          <DialogDescription>Update the task details.</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="task-name">Task Name</Label>

          <Input
            id="task-name"
            defaultValue={task.name}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleUpdate}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
