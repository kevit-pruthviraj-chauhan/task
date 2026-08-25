import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { EditTaskDialog } from "./EditTaskDialog";

type Task = {
	id: number;
	name: string;
	status: string;
};

type TaskActionsProps = {
	task: Task;
};

export function TaskActions({ task }: TaskActionsProps) {
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button variant="ghost" size="icon" className="h-8 w-8">
						<MoreHorizontal className="h-4 w-4" />

						<span className="sr-only">Open actions</span>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => setEditOpen(true)}>
						<Pencil className="mr-2 h-4 w-4" />
						Edit
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						className="text-destructive focus:text-destructive"
						onClick={() => setDeleteOpen(true)}
					>
						<Trash2 className="mr-2 h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<EditTaskDialog task={task} open={editOpen} onOpenChange={setEditOpen} />

			<DeleteTaskDialog
				task={task}
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
			/>
		</>
	);
}
