import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  selectedCurrency: string;
  selectedTransfers: number[];
}

const initialState: AppState = {
  selectedCurrency: 'USD',
  selectedTransfers: [],
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload;
    },
    setTransfers: (state, action: PayloadAction<number[]>) => {
      state.selectedTransfers = action.payload;
    },
  },
});

export const { setCurrency, setTransfers } = appSlice.actions;

export default appSlice.reducer;
