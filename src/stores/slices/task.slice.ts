import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from "@reduxjs/toolkit";

export type Task = {
	id: string;
	name: string;
	status: "Pending" | "In Progress" | "Completed";
};

type TaskState = {
	tasks: Task[];
	loading: boolean;
	error: string | null;
};

const initialState: TaskState = {
	tasks: [],
	loading: false,
	error: null,
};

// GET /tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
	const response = await fetch("http://localhost:3000/tasks");

	if (!response.ok) {
		throw new Error("Failed to fetch tasks");
	}

	return (await response.json()) as Task[];
});

// POST /tasks
export const addTask = createAsyncThunk(
	"tasks/addTask",
	async (name: string) => {
		const response = await fetch("http://localhost:3000/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to create task");
		}

		return (await response.json()) as Task;
	},
);

const taskSlice = createSlice({
	name: "tasks",
	initialState,

	reducers: {
		updateTask: (
			state,
			action: PayloadAction<{
				id: string;
				name: string;
			}>,
		) => {
			const task = state.tasks.find((task) => task.id === action.payload.id);

			if (task) {
				task.name = action.payload.name;
			}
		},

		deleteTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload);
		},

		toggleTask: (state, action: PayloadAction<string>) => {
			const task = state.tasks.find((task) => task.id === action.payload);

			if (!task) return;

			task.status =
				task.status === "Pending"
					? "In Progress"
					: task.status === "In Progress"
						? "Completed"
						: "Pending";
		},
	},

	extraReducers: (builder) => {
		// GET /tasks
		builder
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = action.payload;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message ?? "Failed to fetch tasks";
			});

		// POST /tasks
		builder
			.addCase(addTask.pending, (state) => {
				state.error = null;
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state.tasks.push(action.payload);
			})
			.addCase(addTask.rejected, (state, action) => {
				state.error = action.error.message ?? "Failed to create task";
			});
	},
});

export const { updateTask, deleteTask, toggleTask } = taskSlice.actions;

export default taskSlice.reducer;
