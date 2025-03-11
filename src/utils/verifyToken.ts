import { jwtDecode } from "jwt-decode";

interface DecodedUser {
  role: string;
  exp?: number; // Token expiration timestamp (optional)
  iat?: number; // Issued at timestamp (optional)
}

export const verifyToken = (token: string): DecodedUser => {
  return jwtDecode<DecodedUser>(token);
};
