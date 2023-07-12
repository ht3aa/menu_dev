const pe = process.env;

if (!pe.SECRET_KEY || !pe.DATABASE_URL) {
  throw new Error("Please provide SECRET_KEY and DATABASE_URL envs.");
}

export const { SECRET_KEY, DATABASE_URL } = pe;

export const PORT = pe.PORT || 3000;

export const ENVIRONMENT = pe.ENVIRONMENT || "production";

export const JWT_ACCESS_TOKEN_LIFETIME = pe.JWT_ACCESS_TOKEN_LIFETIME || "1h";

export const JWT_REFRESH_TOKEN_LIFETIME = pe.JWT_REFRESH_TOKEN_LIFETIME || "1d";

export const AWS_ACCESS_KEY_ID = pe.AWS_ACCESS_KEY_ID as string;
export const AWS_SECRET_ACCESS_KEY = pe.AWS_SECRET_ACCESS_KEY as string;
export const AWS_BUCKET_NAME = pe.AWS_BUCKET_NAME as string;
