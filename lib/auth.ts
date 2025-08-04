import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "macwrite-admin-secret-key-change-in-production"
);

// Generate JWT token
export async function generateToken(email: string): Promise<string> {
  return await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET_KEY);
}

// Verify JWT token
export async function verifyToken(token: string): Promise<{ email: string; role: string } | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as { email: string; role: string };
  } catch (error) {
    return null;
  }
}