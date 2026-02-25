import jwt from "jsonwebtoken";

/**
 * Generate JWT Token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    { id },                    // Payload
    process.env.JWT_SECRET,    // Secret
    {
      expiresIn: "30d",        // Token expiry
    }
  );
};

export default generateToken;