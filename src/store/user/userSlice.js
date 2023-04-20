import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserList = createAsyncThunk("user/getUserList", async () => {
  try {
    const { data } = await axios.get(`https://dummyjson.com/posts`);
    console.log("Data :-----", data);
    return data;
  } catch (error) {
    console.log(`The error has been occured in the getuser slice ${error}`);
    // return rejectWithValue(error);
  }
});

// export const getAuthorData = createAsyncThunk(
//   "author/getAuthorData",
//   async () => {
//     try {
//       const { Authdata } = await axios.get(`https://dummyjson.com/users`);
//       console.log("The authors data are :----", Authdata);
//       return Authdata;
//     } catch (error) {
//       console.log("The error has been occure in the author data ", error);
//     }
//   }
// );
export const getSinglePost = createAsyncThunk(
  "author/getSinglePost",
  async (id) => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/posts/${id}`);
      console.log("The single data :----", data);
      const { data: userData } = await axios.get(
        `https://dummyjson.com/users/${data.userId}`
      );
      console.log("UserData", userData);
      if (userData) data.user = userData;
      return data;
    } catch (error) {
      console.log("The error has been occure in the single  data page ", error);
    }
  }
);
const initialState = {
  data: [],
  Author: [],
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [getUserList.pending]: (state) => {
      state.isLoading = true;
    },
    [getUserList.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [getUserList.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
    // [getAuthorData.pending]: (state) => {
    //   state.isLoading = true;
    // },
    // [getAuthorData.fulfilled]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.data = payload;
    // },
    // [getAuthorData.rejected]: (state, { payload }) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.errorMessage = payload;
    // },

    [getSinglePost.pending]: (state) => {
      state.isLoading = true;
    },
    [getSinglePost.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [getSinglePost.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = payload;
    },
  },
});

export default userSlice.reducer;
