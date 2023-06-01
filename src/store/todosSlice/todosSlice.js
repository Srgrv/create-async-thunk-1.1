//packages
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodosAsync = createAsyncThunk(
  "todos/addTaskAsync",
  async (_, { rejectWithValue, dispatch }) => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=10`
    );

    return response.data;
  }
);

export const addTodosAsync = createAsyncThunk(
  "todos/addTodosAsync",
  async (value, { rejectWithValue, dispatch }) => {
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/todos`,
      {
        body: {
          title: value,
          completed: false,
          userId: 1,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    dispatch(addTodos({ value }));
  }
);

export const deleteTodosAsync = createAsyncThunk(
  "todos/deleteTodosAsync",
  async (id, { rejectWithValue, dispatch }) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );

    dispatch(deleteTodos({ id }));
  }
);

export const toggleTodosAsync = createAsyncThunk(
  "todos/toggleTodosAsync",
  async (id, { dispatch }) => {
    const response = await axios.patch(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    dispatch(toggleTodos({ id }));
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    list: [],
  },
  reducers: {
    addTodos(state, action) {
      const todo = {
        id: new Date().toISOString(),
        title: action.payload.value,
        completed: false,
      };
      state.list.push(todo);
    },
    deleteTodos(state, action) {
      state.list = state.list.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodos(state, action) {
      const change = state.list.find((todo) => todo.id === action.payload.id);

      change.completed = !change.completed;
    },
  },
  extraReducers: (build) => {
    build.addCase(getTodosAsync.fulfilled, (state, action) => {
      console.log("getTodosAsync - fulfilled");
      state.list = action.payload;
    });
    build.addCase(addTodosAsync.fulfilled, (state, action) => {
      console.log("addTodosAsync - fulfilled");
    });
  },
});

export const { addTodos, deleteTodos, toggleTodos } = todoSlice.actions;
export default todoSlice.reducer;
