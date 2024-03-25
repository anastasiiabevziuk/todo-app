import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';


let authToken:string = "my id";

export const authSlice = createSlice({
    name:"auth",
    initialState: authToken,
    reducers:{
        changeAuthToken: (state, action: PayloadAction<string>) => {
          state = action.payload
          return state;
        },
    
   
    }
  });


export default authSlice.reducer;
export const selectIsAuthenticated = (state: RootState) =>
  state

