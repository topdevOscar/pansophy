import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {data:null };


const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {  
    getPages(state, action) {  
     state.data=action.payload
    },
  },
});

export const { getPages} = pagesSlice.actions;

export default pagesSlice.reducer;