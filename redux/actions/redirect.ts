export function redirectTo(path: string) {
  if (typeof window !== "undefined") {
    window.location.assign(new URL(path, window.location.origin));
  }
}
