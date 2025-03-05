import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(localStorage.getItem('posts')) || []


export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.unshift(action.payload);
      localStorage.setItem('posts', JSON.stringify(state));
    },
    deletePost: (state, action) => {
      state.splice(action.payload, 1);
      localStorage.setItem('posts', JSON.stringify(state));
    },

    deleteall: () => {
      localStorage.setItem('posts', JSON.stringify());
      return []
    },

    modPost: (state, action) => {
      const item = {
        id: action.payload.id,
        post: action.payload.post,
        imageSrc: action.payload.imageSrc,
        like: action.payload.like,
        dislike: action.payload.dislike,
        comments: action.payload.comments,
      }
      const index = state.findIndex((post) => post.id === action.payload.id);

      if (index !== -1) {
        state[index] = item;
      }
      localStorage.setItem('posts', JSON.stringify(state));
    },
  },
})

export const { addPost, deletePost, deleteall, modPost } = postSlice.actions

export default postSlice.reducer