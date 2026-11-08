-- Accounts and log-in sessions.

CREATE TABLE users (
  id            integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name          text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  -- Stored lowercase so the unique index is case-insensitive.
  email         text NOT NULL CHECK (email = lower(email)),
  password_hash text NOT NULL,
  age           integer NOT NULL CHECK (age BETWEEN 13 AND 110),
  weight_kg     double precision NOT NULL CHECK (weight_kg BETWEEN 20 AND 400),
  height_cm     double precision NOT NULL CHECK (height_cm BETWEEN 80 AND 250),
  goal          text NOT NULL DEFAULT 'General wellbeing' CHECK (char_length(goal) <= 80),
  -- Optional; used to add safety notes (e.g. asthma) to workouts.
  conditions    text[] NOT NULL DEFAULT '{}',
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX users_email_key ON users (email);

CREATE TABLE sessions (
  -- SHA-256 of the session token. The token itself only lives in the user's cookie,
  -- so a leaked database can't be used to log in as anyone.
  id         text PRIMARY KEY,
  user_id    integer NOT NULL REFERENCES users (id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);

CREATE INDEX sessions_user_id_idx ON sessions (user_id);
CREATE INDEX sessions_expires_at_idx ON sessions (expires_at);
