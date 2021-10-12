import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const resetPasswordState = atom({
  key: "resetPasswordState",
  default: {
    email: "",
    issueToken: "",
    remainTime: 0,
    confirmToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export default resetPasswordState;
