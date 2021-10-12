import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const authState = atom({
  key: "authState",
  default: {
    accessToken: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export default authState;
