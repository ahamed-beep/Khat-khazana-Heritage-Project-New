import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosinstacne from "../Connection/Api";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.post("/postproduct", productData);
      toast.success(response.data.message || "Product added successfully");
      return response.data.product; 
    } catch (error) {
      const errMsg = error.response?.data?.message || "Failed to add product";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await axiosinstacne.get("/getproduct");
      console.log(res.data)
      return res.data;
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to fetch products";
      toast.error(errMsg);
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getById",
  async (id, thunkAPI) => {
    try {
      const res = await axiosinstacne.get(`/singleproduct/${id}`);
      return res.data;
    } catch (err) {
      const errMsg = err.response?.data?.message || "Product not found";
      toast.error(errMsg);
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const updateProductById = createAsyncThunk(
  "product/updateById",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await axiosinstacne.put(`/updateproduct/${id}`, data);
      toast.success("Product updated successfully");
      return res.data;
    } catch (err) {
      const errMsg = err.response?.data?.message || "Failed to update product";
      toast.error(errMsg);
      return thunkAPI.rejectWithValue(errMsg);
    }
  }
);

export const deleteProductById = createAsyncThunk(
  "product/deleteProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosinstacne.delete(`/products/delete/${id}`);
      toast.success("Product deleted successfully");
      return id;
    } catch (err) {
      toast.error("Failed to delete product");
      return rejectWithValue(err.response.data);
    }
  }
);

export const getFeaturedProducts = createAsyncThunk(
  "product/getFeaturedProducts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosinstacne.get("/featured");

      toast.success("Featured products loaded");
      console.log(res.data)

      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load featured products");
      return rejectWithValue(err.response.data);
    }
  }
);
export const getFeaturedProductById = createAsyncThunk(
  "product/getFeaturedById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosinstacne.get(`/getfeatured/${id}`);
      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load featured product");
      return rejectWithValue(err.response.data);
    }
  }
);

export const getProductForRecommendation = createAsyncThunk(
  "product/getProductForRecommendation",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosinstacne.get(`/recommendation/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
     featured: [],
    product: null,
     recommendedProduct: null,
    loading: false,
    error: null
  },
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        const index = state.products.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(deleteProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(getFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getFeaturedProductById.pending, (state) => {
  state.loading = true;
})
.addCase(getFeaturedProductById.fulfilled, (state, action) => {
  state.loading = false;
  state.product = action.payload;
})
.addCase(getFeaturedProductById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
 .addCase(getProductForRecommendation.pending, (state) => {
      state.loading = true;
    })
      .addCase(getProductForRecommendation.fulfilled, (state, action) => {
      state.recommendedProduct = [action.payload]; // Array bana do
    })
    .addCase(getProductForRecommendation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});

export const { clearProductError } = productSlice.actions;
export default productSlice.reducer;
