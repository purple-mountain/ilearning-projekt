import { z } from "zod";

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
