import { User } from "deso-protocol";

export interface DeSoIdentityState {
  currentUser: User | null;
  alternateUsers: User[];
  isLoading: boolean
}
