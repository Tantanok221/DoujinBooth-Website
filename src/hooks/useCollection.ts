import { create } from "zustand";
import { produce } from "immer";
import { FF } from "../types/FF";

interface Collection {
  collection: FF[];
  addCollection: (data: FF | undefined) => void;
  removeCollection: (data: FF | undefined) => void;
  initCollection: () => void;
  updateLocalStorage: () => void;
  checkAvailable: (data: FF | undefined) => boolean;
}

export const useCollection = create<Collection>()((set, get) => ({
  collection: [],
  addCollection: (data) => {
    if (!data) return;
    set((state) =>
      produce(state, (draftState) => {
        draftState.collection.push(data);
      })
    );
  },
  removeCollection: (data) => {
    if (!data) return;
    set((state) => ({
      collection: state.collection.filter(
        (val) => val.Booth_name !== data.Booth_name
      ),
    }));
  },
  initCollection: () => {
    set(() => {
      const item = localStorage.getItem("FF42-Collection");
      if (item) {
        let object = JSON.parse(item);
        if (object) {
          return { collection: object };
        }
      }
      return { collection: [] };
    });
  },
  updateLocalStorage: () => {
    localStorage.removeItem("FF42-Collection");
    localStorage.setItem("FF42-Collection", JSON.stringify(get().collection));
  },
  checkAvailable: (data) => {
    if (!data) return false;
    const collectionName = get().collection.flatMap((val) => val.Booth_name);
    const dataName = data.Booth_name;
    return collectionName.filter((val) => val === dataName).length != 0;
  },
}));
