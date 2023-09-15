import { createSlice } from "@reduxjs/toolkit";

const formReducer = createSlice({
  name: "form",
  initialState: {
    formFields: {
      name: "",
      email: "",
      gender: "",
      color: [],
      country: "",
      message: "",
    },
    forms:[],
    loading: false
  },
  reducers: {
    updateForm: (state, action) => {
      console.log(action);
      state.formFields = {
        ...state.formFields,
        [action.payload.name]: action.payload.value,
      };
      //   state.formFields = action.payload;
    },
    fetchForms: (state,action) => {
        state.forms = action.payload
    },
    setLoading: (state, action) => {
        state.loading = action.payload
    },
    editForm: (state, action) => {
        state.formFields = action.payload
    }
  },
});

export const { actions, reducer } = formReducer;

export const { updateForm, fetchForms, setLoading, editForm } = actions;

export default reducer;
