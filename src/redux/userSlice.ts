import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Filters, User, UserState } from "../utils/types";

const initialState: UserState = {
  users: [],
  filters: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data as User[];
});

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{
        field: keyof typeof state.filters;
        value: string;
      }>
    ) => {
      state.filters[action.payload.field] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch users";
        state.loading = false;
      });
  },
});

export const { setFilter } = userSlice.actions;
export default userSlice.reducer;
