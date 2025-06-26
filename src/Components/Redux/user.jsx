import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosinstacne from "../Connection/Api";
export const loginuser = createAsyncThunk(
  'login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.post('/login', user);

      const { token, message, id, role } = response.data;

      localStorage.setItem('token', token);

      return {
        success: true,
        message,
        token,
        id,
        role,
      };
    } catch (error) {
      return rejectWithValue({
        success: false,
        message: error.response?.data?.message || "Login failed",
      });
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'users/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosinstacne.get('/userdetail');
      console.log(res.data)
      return res.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to get users");
    }
  }
);
export const getSingleUser = createAsyncThunk(
  'user/getSingleUser',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosinstacne.get(`/getsingle/${id}`);
      return res.data.finduser; // your controller returns { finduser }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  "user/updateUserStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
     const response = await axiosinstacne.put(`/update/${id}`, {
  status,
});

      console.log(response.data)
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);


export const googlelogin = createAsyncThunk(
  "googlesigninthunk",
  async (credentialResponse, { rejectWithValue }) => {  
    try {
      const response = await axiosinstacne.post("/google", { 
        token: credentialResponse.credential  
      });
      localStorage.setItem('token', response.data.token);  
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const signinuser = createAsyncThunk(
  "auth/signin",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axiosinstacne.post("/sign", userData);
      return data;              
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosinstacne.post('/forgot-password', formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to send reset email");
    }
  }
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newpassword }, { rejectWithValue }) => {
    try {
      const res = await axiosinstacne.post(`/reset-password/${token}`, {
        newpassword,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


const userslice = createSlice({
    name:'user',
   initialState: {
  user: null,             
  users: [],              
  loading: false,
  authenticated: false,
  error: null,
  token: null,
   singleUser: null,
},

    reducers:{
    logout(state) {
    state.user = null;
    state.token = null;
    state.authenticated = false;
    state.error = null;

    localStorage.removeItem('token');
  }
    },
    extraReducers:(builder)=>{
      builder.addCase(signinuser.pending,(state)=>{
        state.user = null;
        state.loading = true;
        state.error = null
      }),
      builder.addCase(signinuser.fulfilled,(state,action)=>{
        state.user = action.payload
        state.authenticated = true;
        state.error = null
      }),
      builder.addCase(signinuser.rejected,(state,action)=>{
        state.user = null;
        state.error = action.error.message;
      }),
      builder.addCase(loginuser.pending,(state)=>{
         state.token = null;
         state.loading = true;
         state.user = null
      }),
      builder.addCase(loginuser.fulfilled, (state,action)=>{
        state.user = action.payload;
        state.token = action.payload;
        state.authenticated = true;
        state.error = null
      }),
      builder.addCase(loginuser.rejected,(state,action)=>{
        state.error = true;
        state.user = null;
        state.token = null
      }),
            builder.addCase(googlelogin.pending,(state)=>{
         state.token = null;
         state.loading = true;
         state.user = null
      }),
        builder.addCase(googlelogin.fulfilled, (state,action)=>{
        state.user = action.payload;
        state.token = action.payload;
        state.authenticated = true;
        state.error = null
      }),
        builder.addCase(googlelogin.rejected,(state,action)=>{
        state.error = true;
        state.user = null;
        state.token = null
      }),
    builder.addCase(forgotPassword.pending, (state) => {
  state.loading = true;
  state.error = null;
});
builder.addCase(forgotPassword.fulfilled, (state) => {
  state.loading = false;
});
builder.addCase(forgotPassword.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

builder.addCase(resetPassword.pending, (state) => {
  state.loading = true;
  state.error = null;
});
builder.addCase(resetPassword.fulfilled, (state) => {
  state.loading = false;
});
builder.addCase(resetPassword.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
builder.addCase(getAllUsers.pending,(state)=>{
   state.loading = true;
  state.error = null;
      });
 builder.addCase(getAllUsers.fulfilled, (state, action) => {
  state.loading = false;
  state.users = action.payload;  
});

        builder.addCase(getAllUsers.rejected,(state,action)=>{
          state.loading = false;
        state.error = action.payload;
      });
       builder.addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
     
        builder.addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

      state.users = state.users.map((user) =>
  user._id === updatedUser._id ? updatedUser : user
);

      });
       builder.addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(getSingleUser.pending, (state) => {
  state.loading = true;
  state.error = null;
});
builder.addCase(getSingleUser.fulfilled, (state, action) => {
  state.loading = false;
  state.singleUser = action.payload;
});
builder.addCase(getSingleUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});


    }

})

export default userslice.reducer;
export const {logout} = userslice.actions