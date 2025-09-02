import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
}

interface TaskState {
  list: Task[];
}

const initialState: TaskState = {
  list: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: Date.now().toString(),
        title: action.payload,
      };
      state.list.push(newTask);
    },
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
