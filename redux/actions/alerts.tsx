export const DISMISS_ALERT = "DISMISS_ALERT";

export function dismissAlert(id: string) {
  return {
    type: DISMISS_ALERT,
    id,
  };
}
