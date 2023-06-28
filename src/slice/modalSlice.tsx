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
      const errorJson = JSON.parse(action.payload);
      const status = errorJson.status;
      console.log(
        "modalslice의 action.payload : " + JSON.stringify(action.payload)
      );
      if (status === 500) {
        action.payload.text =
          "로그인 세션이 유효하지 않습니다. 다시 로그인 해주세요.";
      }
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
