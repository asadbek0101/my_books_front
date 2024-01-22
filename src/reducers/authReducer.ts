import { PersistConfig } from "redux-persist";

import { AppStoreState } from "../store/RootReducer";
import {
  createReducer,
  createRootReducer,
  PerformAction,
} from "../utils/ReducerUtils";
import { update } from "immupdate";
import { Action } from "redux";

export const authReducerPersistConfig: Partial<
  PersistConfig<AuthReducerState>
> = {
  whitelist: ["my_key", "secret"],
};

interface SetMyKeyMeta {
  readonly my_key: string;
}

interface SetSecretMeta {
  readonly secret: string;
}

enum ReducerActions {
  SetMyKey = "Auth/SetMyKey",
  SetMySecret = "Auth/SetMySecret",
}

export interface AuthReducerState {
  readonly my_key?: string;
  readonly secret?: string;
}

function getState(): AuthReducerState {
  return {
    my_key: "",
    secret: "",
  };
}

export const authReducer = createRootReducer<AuthReducerState>(
  getState(),

  createReducer([ReducerActions.SetMyKey], (state, { meta }) =>
    update(state, { my_key: meta.my_key })
  ),

  createReducer([ReducerActions.SetMySecret], (state, { meta }) =>
    update(state, { secret: meta.secret })
  )
);

// ==================
// Selectors
// ==================

export function keySelector(state: AppStoreState): string | undefined {
  return state.auth.my_key;
}

export function secretSelector(state: AppStoreState): string | undefined {
  return state.auth.secret;
}

// ==================
// Actions
// ==================

export function setMyKey(meta: SetMyKeyMeta): PerformAction<SetMyKeyMeta> {
  return { meta, type: ReducerActions.SetMyKey };
}

export function SetMySecret(meta: SetSecretMeta): PerformAction<SetSecretMeta> {
  return { meta, type: ReducerActions.SetMySecret };
}
