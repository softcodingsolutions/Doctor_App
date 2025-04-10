import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMedicines: [],
  dropdownValues: {}, 
};

const treatmentSlice = createSlice({
  name: "treatment",
  initialState,
  reducers: {
    setSelectedMedicines: (state, action) => {
      state.selectedMedicines = action.payload;
    },
    resetSelectedMedicines: (state) => {
      state.selectedMedicines = [];
    },
    updateDropdownValue: (state, action) => {
      const { id, field, value } = action.payload;
      if (!state.dropdownValues[id]) {
        state.dropdownValues[id] = {};
      }
      state.dropdownValues[id][field] = value;
    },
  },
});

export const {
  setSelectedMedicines,
  resetSelectedMedicines,
  updateDropdownValue,
} = treatmentSlice.actions;

export default treatmentSlice.reducer;
