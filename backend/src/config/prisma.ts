import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

/**
 * Why?

Without this

every file would do

new PrismaClient()

which creates multiple database connections.

Instead

One Prisma Client

↓

Used everywhere
 */