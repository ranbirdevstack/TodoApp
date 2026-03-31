import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: [{ id: '123', task: 'Learn Redux', isDone: false }],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: nanoid(),
        task: action.payload,
        isDone: false,
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    markasDone: (state, action) => {
      // preferred RTK draft mutation:
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.isDone = true;
      }

      // alternative immutable:
      // state.todos = state.todos.map((todo) =>
      //   todo.id === action.payload ? { ...todo, isDone: true } : todo
      // );
    },
  },
});

export const { addTodo, deleteTodo, markasDone } = todoSlice.actions;
export default todoSlice.reducer;
