import dotenv from "dotenv"
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { PrismaClient } from '@prisma/client';
import corsOptions from "./config/corsOptions";
import { router as collectionRoutes } from "./routes/collectionRoutes";
import { router as authRoutes } from "./routes/authRoutes";
import { router as itemRoutes } from "./routes/itemRoutes";
import { router as commentRoutes } from "./routes/commentRoutes";

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use("/api/users", authRoutes)
app.use("/api/collections", collectionRoutes)
app.use('/api/items', itemRoutes)
app.use('/api/comments', commentRoutes)
app.use(errorMiddleware);

async function main() {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    });
}

main()
    .finally(async () => {
        await prisma.$disconnect()
    })
