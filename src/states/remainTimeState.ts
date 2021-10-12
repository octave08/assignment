import { selector } from "recoil";

import resetPasswordState from "./resetPasswordState";

const remainTimeState = selector({
  key: "remainTimeState",
  get: ({ get }) => {
    const resetPassword = get(resetPasswordState);
    return resetPassword.remainTime;
  },
});

export default remainTimeState;
