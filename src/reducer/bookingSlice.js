import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  availability: { data: [], loading: false, error: null },
  completed: { data: null, loading: false, error: null },
  confirmed: { data: null, loading: false, error: null },
};

// Thunk per checkAvailability
export const checkAvailability = createAsyncThunk(
  "booking/checkAvailability",
  async ({ checkIn, checkOut, guestsCount }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/booking/check-availability`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ checkIn, checkOut, guestsCount }),
        }
      );

      if (!res.ok) throw new Error("Errore nel recupero disponibilità");

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk per completeBooking
export const completeBooking = createAsyncThunk(
  "booking/completeBooking",
  async (
    {
      apartment,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      guestsCount,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/booking/complete`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            apartment,
            guestName,
            guestEmail,
            guestPhone,
            checkIn,
            checkOut,
            guestsCount,
          }),
        }
      );

      if (!res.ok) throw new Error("Errore nel completamento prenotazione");

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Thunk per confirmBooking
export const confirmBooking = createAsyncThunk(
  "booking/confirmBooking",
  async ({ paymentIntentId, orderId }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/booking/confirm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId, orderId }),
        }
      );

      if (!res.ok) throw new Error("Errore nella conferma prenotazione");

      return await res.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Slice
const bookingSlice = createSlice({
  name: "bookingSlice",
  initialState,
  reducers: {
    clearAvailability: (state) => {
      state.availability = { data: [], loading: false, error: null };
    },
    clearCompleted: (state) => {
      state.completed = { data: null, loading: false, error: null };
    },
    clearConfirmed: (state) => {
      state.confirmed = { data: null, loading: false, error: null };
    },
  },
  extraReducers: (builder) => {
    // checkAvailability
    builder
      .addCase(checkAvailability.pending, (state) => {
        state.availability.loading = true;
        state.availability.error = null;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.availability.loading = false;
        state.availability.data = action.payload;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.availability.loading = false;
        state.availability.error = action.payload;
      });

    // completeBooking
    builder
      .addCase(completeBooking.pending, (state) => {
        state.completed.loading = true;
        state.completed.error = null;
      })
      .addCase(completeBooking.fulfilled, (state, action) => {
        state.completed.loading = false;
        state.completed.data = action.payload;
      })
      .addCase(completeBooking.rejected, (state, action) => {
        state.completed.loading = false;
        state.completed.error = action.payload;
      });

    // confirmBooking
    builder
      .addCase(confirmBooking.pending, (state) => {
        state.confirmed.loading = true;
        state.confirmed.error = null;
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.confirmed.loading = false;
        state.confirmed.data = action.payload;
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.confirmed.loading = false;
        state.confirmed.error = action.payload;
      });
  },
});

export const { clearAvailability, clearCompleted, clearConfirmed } =
  bookingSlice.actions;

// Selettori Booking Availability
export const selectAvailabilityData = (state) =>
  state.bookingSlice.availability.data;
export const selectAvailabilityLoading = (state) =>
  state.bookingSlice.availability.loading;
export const selectAvailabilityError = (state) =>
  state.bookingSlice.availability.error;

// Selettori Booking Completed
export const selectCompletedData = (state) => state.bookingSlice.completed.data;
export const selectCompletedLoading = (state) =>
  state.bookingSlice.completed.loading;
export const selectCompletedError = (state) =>
  state.bookingSlice.completed.error;

// Selettori Booking Confirmed
export const selectConfirmedData = (state) => state.bookingSlice.confirmed.data;
export const selectConfirmedLoading = (state) =>
  state.bookingSlice.confirmed.loading;
export const selectConfirmedError = (state) =>
  state.bookingSlice.confirmed.error;

export default bookingSlice.reducer;
