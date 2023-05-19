import { NOTIFICATION_EVENTS, getUsersStateless, identity } from "deso-protocol";
import { useEffect, useState } from "react";
import { DeSoIdentityState } from "./types.js";

export const useDeSoIdentity = () => {
  const [state, setState] = useState<DeSoIdentityState>({
    currentUser: null,
    alternateUsers: [],
    isLoading: false,
  });

  useEffect(
    () => {
      identity.subscribe(({ event, currentUser, alternateUsers }) => {
        if (event === NOTIFICATION_EVENTS.AUTHORIZE_DERIVED_KEY_START) {
          setState((state) => ({ ...state, isLoading: true }));
          return;
        }

        if (alternateUsers?.length && !currentUser) {
          const fallbackUser = Object.values(alternateUsers)[0];
          identity.setActiveUser(fallbackUser.publicKey);
          return;
        }

        if (!currentUser) {
          setState((state) => ({
            ...state,
            currentUser: null,
            isLoading: false,
          }));
        } else if (
          currentUser?.publicKey !== state.currentUser?.PublicKeyBase58Check
        ) {
          const alternateUserKeys =
            Object.values(alternateUsers ?? {})?.map((u) => u.publicKey) ?? [];

          setState((state) => ({
            ...state,
            isLoading: true,
          }));

          getUsersStateless({
            PublicKeysBase58Check: [
              currentUser.publicKey,
              ...alternateUserKeys,
            ],
            IncludeBalance: true,
          })
            .then(({ UserList }) => {
              const [currentUser = null, ...alternateUsers] = UserList ?? [];

              setState((state) => ({
                ...state,
                currentUser,
                alternateUsers,
              }));
            })
            .finally(() =>
              setState((state) => ({
                ...state,
                isLoading: false,
              }))
            );
        }
      });
    },
    []
  );

  return state;
};