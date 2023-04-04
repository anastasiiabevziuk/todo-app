import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface Todo {
    id: number;
    message: string;
    completed: boolean;
  }


let idCount = 0;

export const todoSlice = createSlice({
    name:"todos",
    initialState: [] as Todo[],
    reducers:{
        addTodo: (state, action: PayloadAction<string>) => {
            state.push({ id: idCount++, message: action.payload, completed: false });

          },
          
        deleteTodo: (state, action: PayloadAction<string>) =>
            state.filter(todo => String(todo.id) !== action.payload),
        completeTodo: (state, action: PayloadAction<string>) => {
                
            const completedTodo:any = state.find(todo => String(todo.id) === action.payload);
            completedTodo.completed = !(completedTodo.completed);

        }
    }
  });


export default todoSlice.reducer;