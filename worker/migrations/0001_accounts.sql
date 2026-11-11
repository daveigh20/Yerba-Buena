-- Accounts on the public Cloudflare site. Only name, email, and a password hash: no health details.

CREATE TABLE users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  -- Stored lowercase so the unique index is case-insensitive.
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE sessions (
  -- SHA-256 of the session token, so a leaked database can't be used to log in as anyone.
  id         TEXT PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);

CREATE INDEX sessions_expires_at_idx ON sessions (expires_at);

-- Recent sign-up and log-in attempts, for rate limiting.
CREATE TABLE auth_attempts (
  ip TEXT NOT NULL,
  at INTEGER NOT NULL
);

CREATE INDEX auth_attempts_ip_at_idx ON auth_attempts (ip, at);
