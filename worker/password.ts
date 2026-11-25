/**
 * Password hashing for Cloudflare Workers, using the built-in Web Crypto API.
 * 100,000 PBKDF2 iterations is the most Workers allows. Stored format: pbkdf2$<iterations>$<salt>$<hash>.
 */
const ITERATIONS = 100_000;
const SALT_BYTES = 16;

const toBase64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
const fromBase64 = (text: string) => Uint8Array.from(atob(text), (c) => c.charCodeAt(0));

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password.normalize("NFKC")),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  return new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, key, 256));
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  return ["pbkdf2", ITERATIONS, toBase64(salt), toBase64(await derive(password, salt, ITERATIONS))].join("$");
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, iterations, salt, hash] = stored.split("$");
  if (algo !== "pbkdf2" || !iterations || !salt || !hash) return false;
  const expected = fromBase64(hash);
  const actual = await derive(password, fromBase64(salt), Number(iterations));
  if (actual.length !== expected.length) return false;
  let diff = 0;
  actual.forEach((byte, i) => (diff |= byte ^ expected[i]!));
  return diff === 0;
}

/** Does the same work as a real check, so a failed log-in doesn't reveal which emails have accounts. */
export async function verifyAgainstDummy(password: string): Promise<false> {
  await derive(password, crypto.getRandomValues(new Uint8Array(SALT_BYTES)), ITERATIONS);
  return false;
}
