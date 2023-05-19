import React, { ReactNode } from "react";
import { DeSoIdentityContext } from "./deso-identity-context.js";
import { useDeSoIdentity } from "./use-deso-identity.js";

export const DeSoIdentityProvider = ({ children }: { children: ReactNode }) => {
  const state = useDeSoIdentity();

  return (
    <DeSoIdentityContext.Provider value={state}>
      {children}
    </DeSoIdentityContext.Provider>
  );
};

