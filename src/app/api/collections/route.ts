import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse, type NextRequest } from "next/server";
import { collectionFormSchema } from "~/lib/types";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body: unknown = await request.json();
        const { name, description, topic, field } = collectionFormSchema.parse(body);
        const { userId } = getAuth(request);

        if (userId === null) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await prisma.collection.create({
            data: {
                field: {
                    create: field?.map((f) => ({
                        fieldName: f.fieldName,
                        fieldType: f.fieldType,
                    })),
                },
                name: name.toLowerCase(),
                description: description,
                topic: {
                    connectOrCreate: {
                        create: {
                            name: topic.topicName,
                        },
                        where: {
                            name: topic.topicName,
                        },
                    },
                },
                authorId: userId,
            },
        });

        return NextResponse.json({
            success: true,
            status: 201,
        });
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return NextResponse.json({ error: "Duplicate collection name" }, { status: 409 });
            }
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
