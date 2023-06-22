import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  data:
  {
    question: "", answer: "", id: null,
    is_image: false,
    images: [], isChatting: false, isEditing:false,
    imagesLength:0
  }
};



const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    getType(state, action) {

      state.data.is_image = action.payload.is_image
      state.data.images = action.payload.images
    },
    getEditing(state, action) {
   
      state.data.isEditing = action.payload
    },
    getId(state, action) {
   
      state.data.id = action.payload
    },
    getQuestion(state, action) {
      state.data.isChatting = true
      state.data.question = action.payload
    },
    getAnswer(state, action) {
      state.data.answer = action.payload.answer
      state.data.is_image = action.payload.is_image
      state.data.images = action.payload.images
    },
    setChat(state, action) {
      state.data = {
        id: null, question: "", answer: "",
        is_image: false,
        images: [], isChatting: false
      }
    },
    getChatting(state, action) {
   
      state.data.isChatting = action.payload
    },
    setImageLength(state, action) {
   
      state.data.imagesLength = action.payload
    },


  },
});

export const { getQuestion, getAnswer, setChat, getType,getId,getEditing,getChatting,setImageLength } = chatSlice.actions;

export default chatSlice.reducer;
