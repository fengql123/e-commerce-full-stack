import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProfileAPI } from "../../utils/api";
import { Buffer } from "buffer";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const response = await fetchProfileAPI();
    return response;
  }
);

const initialState = {
  profile: {},
  imgUrl: "",
  isLoading: true,
  error: false,
  loggedIn: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setProfile(state, action) {
      state.profile = action.payload.profile;
      state.imgUrl = action.payload.imgUrl;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.imgUrl = new Buffer.from(action.payload.avatar.data).toString(
          "base64"
        );
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const selectProfile = (state) => state.profile.profile;
export const selectImgUrl = (state) => state.profile.imgUrl;
export const selectLogIn = (state) => state.profile.loggedIn;
export const isLoadingProfile = (state) => state.profile.isLoading;
export const isErrorProfile = (state) => state.profile.error;

export const { setLoggedIn, setProfile } = profileSlice.actions;
export default profileSlice.reducer;
