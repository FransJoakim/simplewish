import { User } from "firebase/auth";
import { createContext } from "react";

export interface UserContext {
  user: User | null | undefined;
  username: string | null;
}

export const UserContext = createContext<UserContext>({
  user: null,
  username: null,
});
