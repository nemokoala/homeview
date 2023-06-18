import { createSlice } from "@reduxjs/toolkit";
export const modalSlice = createSlice({
  name: "modalSet",
  initialState: {
    modal: {
      open: false,
      title: "",
      titleColor: "",
      text: "",
      btn1Text: "",
      btn2Text: "",
      btn1Color: "",
      btn2Color: "",
      btn1Func: function () {},
      btn2Func: function () {},
    },
  },
  reducers: {
    setModal: (state: any, action: any): any => {
      console.log(action.payload);
      state.modal = { ...defaultModal, ...action.payload };
    },
  },
});

export const { setModal } = modalSlice.actions;
export default modalSlice.reducer;

const defaultModal = {
  open: true,
  title: "",
  titleColor: "",
  text: "",
  btn1Text: "",
  btn2Text: "",
  btn1Color: "",
  btn2Color: "",
  btn1Func: function () {},
  btn2Func: function () {},
};
