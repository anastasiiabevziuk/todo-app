import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface List {
    id: number;
    name: string;
    activeItems: boolean;
  }


let idCount = 100;

export const listSlice = createSlice({
    name:"list",
    initialState: [] as List[],
    reducers:{
        addList: (state, action: PayloadAction<string>) => {
            state.push({ id: idCount++, name: action.payload, activeItems: false });
          },
        deleteList: (state, action: PayloadAction<string>) =>
            state.filter(list => String(list.id) !== action.payload),
        activeItems: (state, action: PayloadAction<string>) => {   
            const activeItems :any = state.find(list => String(list.id) === action.payload);
            activeItems.activeItems =  true;
    
        }
   
    }
  });


export default listSlice.reducer;