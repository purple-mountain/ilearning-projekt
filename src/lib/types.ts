import { z } from "zod";
import { type Prisma } from "@prisma/client";

export const collectionFormSchema = z.object({
    name: z.string().min(1, {
        message: "This field cannot be blank",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters long",
    }),
    topic: z.object({
        topicName: z.string().min(1, {
            message: "This field cannot be blank",
        }),
    }),
    field: z
        .object({
            fieldName: z.string().min(1, {
                message: "This field cannot be blank",
            }),
            fieldType: z.string().min(1, {
                message: "This field cannot be blank",
            }),
        })
        .array()
        .optional(),
});

export type TCollectionFormSchema = z.infer<typeof collectionFormSchema>;

export type CollectionWithTopic = Prisma.CollectionGetPayload<{
    include: { topic: true };
}>;

export type ItemWithFieldValues = Prisma.ItemGetPayload<{
    include: { fieldValue: true };
}>;

export type CollectionWithItemAndField = Prisma.CollectionGetPayload<{
    include: { items: true, field: true };
}>;

type Field = Pick<
    Prisma.CollectionGetPayload<{
        include: { field: true };
    }>,
    "field"
>;

export type ItemColumnHeader = {
    name: string;
    description: string;
    field: Field;
    createdAt: Date;
    updatedAt: Date;
};
