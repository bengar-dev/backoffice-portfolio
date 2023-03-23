import { atom, selector } from "recoil";

export const countMessagesState = atom<number>({
  key: "countMessagesState",
  default: 0,
});

export const updateCountMessagesState = selector({
  key: "updateCountMessagesState",
  get: ({ get }) => {
    return get(countMessagesState);
  },
  set: ({ set, get }, newState) => {
    set(countMessagesState, newState);
  },
});
