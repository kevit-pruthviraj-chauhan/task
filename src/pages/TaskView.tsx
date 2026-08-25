import { useDispatch, useSelector } from "react-redux";
import { AddTaskDialog } from "@/components/AddTaskDialog";
import { TaskActions } from "@/components/TaskActions";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { toggleTask } from "@/stores/slices/task.slice";
import type { AppDispatch, RootState } from "@/stores/store";

export function TaskView() {
	const dispatch = useDispatch<AppDispatch>();
	const tasks = useSelector((state: RootState) => state.tasks.tasks);
	return (
		<div className="w-full px-4 py-6">
			<div className="mx-auto w-fit">
				<div className="mb-4 flex items-center justify-between">
					<div>
						<h1 className="text-xl font-semibold">Tasks</h1>
						<p className="text-sm text-muted-foreground">Manage your tasks</p>
					</div>

					<AddTaskDialog />
				</div>

				<div className="rounded-lg border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-15">ID</TableHead>
								<TableHead className="w-70">Task Name</TableHead>
								<TableHead className="w-32.5">Status</TableHead>
								<TableHead className="w-15 text-right">Action</TableHead>
							</TableRow>
						</TableHeader>

						<TableBody>
							{tasks.map((task) => (
								<TableRow key={task.id}>
									<TableCell>#{task.id}</TableCell>

									<TableCell className="font-medium">{task.name}</TableCell>

									<TableCell>
										<Badge
											variant={
												task.status === "Completed"
													? "default"
													: task.status === "In Progress"
														? "secondary"
														: "outline"
											}
											className="cursor-pointer"
											onClick={() => dispatch(toggleTask(task.id))}
										>
											{task.status}
										</Badge>
									</TableCell>

									<TableCell className="text-right">
										<TaskActions task={task} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
