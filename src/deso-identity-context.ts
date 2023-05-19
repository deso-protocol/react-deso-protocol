import { createContext } from "react";
import { DeSoIdentityState } from "./types.js";

export const DeSoIdentityContext = createContext<DeSoIdentityState>({
  currentUser: null,
  alternateUsers: [],
  isLoading: false,
});
