import type { PublicUser, SignupData } from "../../../shared/auth.js";
import { isPgError, PG_UNIQUE_VIOLATION, type Queryable } from "../db/types.js";

interface UserRow {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  age: number;
  weight_kg: number;
  height_cm: number;
  goal: string;
  conditions: string[];
  created_at: Date | string;
}

/** Columns safe to return to the client (everything but password_hash). */
export const PUBLIC_COLUMNS = "id, name, email, age, weight_kg, height_cm, goal, conditions, created_at";

export function toPublicUser(row: Omit<UserRow, "password_hash">): PublicUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    age: row.age,
    weightKg: row.weight_kg,
    heightCm: row.height_cm,
    goal: row.goal,
    conditions: row.conditions,
    createdAt: new Date(row.created_at).toISOString(),
  };
}

export class EmailTakenError extends Error {
  constructor() {
    super("An account with that email already exists.");
  }
}

export async function createUser(db: Queryable, data: SignupData, passwordHash: string): Promise<PublicUser> {
  try {
    const { rows } = await db.query<UserRow>(
      `INSERT INTO users (name, email, password_hash, age, weight_kg, height_cm, goal, conditions)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING ${PUBLIC_COLUMNS}`,
      [data.name, data.email, passwordHash, data.age, data.weightKg, data.heightCm, data.goal, data.conditions],
    );
    return toPublicUser(rows[0]!);
  } catch (err) {
    if (isPgError(err, PG_UNIQUE_VIOLATION)) throw new EmailTakenError();
    throw err;
  }
}

/** Includes the password hash, for checking log-ins only. */
export async function findUserForLogin(db: Queryable, email: string): Promise<UserRow | undefined> {
  const { rows } = await db.query<UserRow>(`SELECT ${PUBLIC_COLUMNS}, password_hash FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0];
}
