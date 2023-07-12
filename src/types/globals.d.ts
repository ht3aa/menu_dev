// Permissions
type Action = "read" | "create" | "update" | "delete" | "manage";
type Subject = "User" | "all";

type Environment = "development" | "staging" | "production";

/* eslint-disable no-unused-vars */

import { User as PrismaUser } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}
