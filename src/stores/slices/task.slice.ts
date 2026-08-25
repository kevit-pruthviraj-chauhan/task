import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
export type Task = {
  id: number
  name: string
  status: "Pending" | "In Progress" | "Completed"
}

type TaskState = {
  tasks: Task[]
}

const initialState: TaskState = {
  tasks: [
    {
      id: 1,
      name: "Complete assignment",
      status: "Completed",
    },
    {
      id: 2,
      name: "Get User Profile",
      status: "In Progress",
    },
    {
      id: 3,
      name: "Delete User",
      status: "Pending",
    },
    {
      id: 4,
      name: "Update Restaurant",
      status: "Completed",
    },
  ],
}

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: state.tasks.length + 1,
        name: action.payload,
        status: "Pending",
      }

      state.tasks.push(newTask)
    },

    updateTask: (
      state,
      action: PayloadAction<{
        id: number
        name: string
      }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id)

      if (task) {
        task.name = action.payload.name
      }
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },

    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((task) => task.id === action.payload)

      if (!task) return

      task.status =
        task.status === "Pending"
          ? "In Progress"
          : task.status === "In Progress"
            ? "Completed"
            : "Pending"
    },
  },
})

export const { addTask, updateTask, deleteTask, toggleTask } = taskSlice.actions

export default taskSlice.reducer
