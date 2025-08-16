import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orderData: null,
  loading: false,
  error: null,
};

export const createPayment = createAsyncThunk(
  "order/createPayment",
  async ({ bookingId, paymentMethod }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ bookingId, paymentMethod }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.orderData = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.orderData = action.payload;
        state.error = null;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.error || "Errore generico";
      });
  },
});

// Selettori
export const selectOrderData = (state) => state.orderSlice.orderData;
export const selectOrderLoading = (state) => state.orderSlice.loading;
export const selectOrderError = (state) => state.orderSlice.error;

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
