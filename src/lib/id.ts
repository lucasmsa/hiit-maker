export function newId(): string {
  return globalThis.crypto.randomUUID();
}
