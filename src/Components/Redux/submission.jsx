import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosinstacne from "../Connection/Api";
import toast from "react-hot-toast";
export const postsubmissiondata = createAsyncThunk(
  "postalldata",
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.post("/sub", submissionData);
 
      toast.success(response.data.message)
      return response.data;
    } catch (error) {
      const errMessage =
        error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errMessage); 
      return rejectWithValue(errMessage); 
    }
  }
);

export const getsubmissionsdata = createAsyncThunk(
  "getsubmissionsdata",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.get("/getsub"); 
      return response.data; 
    } catch (error) {
      const errMessage =
        error.response?.data?.message || error.message || "Something went wrong";
      toast.error(errMessage); 
      return rejectWithValue(errMessage); 
    }
  }
);

export const getSingleSubmissionById = createAsyncThunk(
  "submission/getSingleById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.get(`/singlesub/${id}`);
      console.log(response.data)
      return response.data.findata; 
    } catch (error) {
      const errMessage = error.response?.data?.message || "Something went wrong";
      return rejectWithValue(errMessage);
    }
  }
);

export const updateSubmissionById = createAsyncThunk(
  "submission/updateById",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.put(`/updatesub/${id}`, updatedData);
      toast.success(response.data.message);
      return response.data.updatedSubmission;
    } catch (error) {
      const errMessage = error.response?.data?.message || "Update failed";
      toast.error(errMessage);
      return rejectWithValue(errMessage);
    }
  }
);

export const fetchLetterSubmissions = createAsyncThunk(
  "submission/fetchLetterSubmissions",
  async (_, { rejectWithValue }) => {
    try {
     const res = await axiosinstacne.get("/getattachmentletters");

      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch letter submissions");
    }
  }
);

export const fetchPhotographSubmissions = createAsyncThunk(
  "submission/fetchPhotographSubmissions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosinstacne.get("/getattachmentphotographs");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch photograph submissions");
    }
  }
);

export const fetchApprovedLetters = createAsyncThunk(
  'submissions/fetchApprovedLetters',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.get('/getapprovedletters');
      console.log(response.data)
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch approved letters");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchApprovedPhotographs = createAsyncThunk(
  'submissions/fetchApprovedPhotographs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.get('/getapprovedphotographs');
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch approved photographs");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchApprovedSubmissionById = createAsyncThunk(
  'submissions/fetchApprovedSubmissionById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.get(`/getapprovedsubmissions/${id}`);
      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch submission details");
      return rejectWithValue(error.response?.data);
    }
  }
);

export const adminPostSubmission = createAsyncThunk(
  "submissions/adminPostSubmission",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.post("/submissionaddcontroller", formData);

      toast.success(response.data.message || "Submission added successfully");
      return response.data.createSubmission;  // Return the created data
    } catch (error) {
      const errMsg =
        error.response?.data?.message || error.message || "Failed to add submission";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);


const submissionslice = createSlice({
    name:"submisiions",
  initialState: {
       submission: [],
       letters: [],
    photographs: [],
      approvedLetters: [],
      currentSubmission: null,
  approvedPhotographs: [], 
       loading: false,
       singlesubmission: null,
       error: null
    },
  reducers: {
  logout: (state) => {
    state.submission = [];
    state.letters = [];
    state.photographs = [];
    state.singlesubmission = null;
    state.loading = false;
    state.error = null;
  }
},

    extraReducers:(builder)=>{
 builder.addCase(postsubmissiondata.pending , (state , action)=>{
             state.submission = [];
        state.loading = true;
        state.error = null
        }),
builder.addCase(postsubmissiondata.fulfilled,(state,action)=>{
                state.submission = [];
                state.error = null;
        state.loading = false;

              }),
 builder.addCase(postsubmissiondata.rejected,(state,action)=>{
                      state.submission = [];
                      state.error = action.error.message;
                    });
 builder.addCase(getsubmissionsdata.pending, (state) => {
  state.loading = true;
  state.error = null;
});
builder.addCase(getsubmissionsdata.fulfilled, (state, action) => {
  state.loading = false;
  state.submission = action.payload.data || action.payload; // adapt to your response
  state.error = null;
});
builder.addCase(getsubmissionsdata.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
builder.addCase(getSingleSubmissionById.pending, (state) => {
  state.loading = true;
  state.error = null;
});

builder.addCase(getSingleSubmissionById.fulfilled, (state, action) => {
  state.loading = false;
  state.singlesubmission = action.payload;
  state.error = null;
});

builder.addCase(getSingleSubmissionById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
builder.addCase(updateSubmissionById.pending, (state) => {
  state.loading = true;
  state.error = null;
});

builder.addCase(updateSubmissionById.fulfilled, (state, action) => {
  state.loading = false;
  state.singlesubmission = action.payload;
  toast.success("Submission updated in store");
});

builder.addCase(updateSubmissionById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
.addCase(fetchLetterSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLetterSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.letters = action.payload;
      })
      .addCase(fetchLetterSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPhotographSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotographSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.photographs = action.payload;
      })
      .addCase(fetchPhotographSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchApprovedLetters.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchApprovedLetters.fulfilled, (state, action) => {
  state.loading = false;
  state.approvedLetters = action.payload;
})
.addCase(fetchApprovedLetters.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
.addCase(fetchApprovedPhotographs.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchApprovedPhotographs.fulfilled, (state, action) => {
  state.loading = false;
  state.approvedPhotographs = action.payload;
})
.addCase(fetchApprovedPhotographs.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
 .addCase(adminPostSubmission.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(adminPostSubmission.fulfilled, (state, action) => {
    state.loading = false;
    state.submission.push(action.payload);  
    state.error = null;
  })
  .addCase(adminPostSubmission.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  })
  .addCase(fetchApprovedSubmissionById.pending, (state) => {
  state.loading = true;
})
.addCase(fetchApprovedSubmissionById.fulfilled, (state, action) => {
  state.loading = false;
  state.currentSubmission = action.payload.data || action.payload;
})
.addCase(fetchApprovedSubmissionById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

    }
});

export default submissionslice.reducer;
export const {logout} = submissionslice.actions;
