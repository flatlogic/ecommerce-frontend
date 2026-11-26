export type EntityId = string;
export type EntityValues = Record<string, unknown>;
export type ListFilter = Record<string, unknown> | string | undefined;

export interface LegacyAction {
  type: string;
  payload?: unknown;
  activeItem?: string | null;
  id?: string | number;
}

export type LegacyThunk = (
  dispatch: LegacyDispatch,
  getState: LegacyGetState,
) => unknown;

export type LegacyDispatch = (action: LegacyAction | LegacyThunk) => unknown;
export type LegacyGetState = () => unknown;

export interface LegacyReducerPayload {
  rows?: unknown[];
  count?: number;
  id?: string;
  product?: unknown;
  currentUser?: unknown;
  [key: string]: unknown;
}

export interface LegacyReducerAction {
  type: string;
  payload?: LegacyReducerPayload;
  activeItem?: string | null;
}
