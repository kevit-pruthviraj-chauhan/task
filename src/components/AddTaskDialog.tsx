import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addTask } from "@/stores/slices/task.slice";
import type { AppDispatch } from "@/stores/store";

export function AddTaskDialog() {
	const dispatch = useDispatch<AppDispatch>();

	const [name, setName] = useState("");
	const [open, setOpen] = useState(false);

	const handleAdd = () => {
		if (!name.trim()) return;

		dispatch(addTask(name.trim()));

		setName("");
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger>
				<Button size="sm">Add Task</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Task</DialogTitle>

					<DialogDescription>
						Add a new task to your task list.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-2">
					<Label htmlFor="task-name">Task Name</Label>

					<Input
						id="task-name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Enter task name"
					/>
				</div>

				<div className="flex justify-end">
					<Button onClick={handleAdd}>Add Task</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
