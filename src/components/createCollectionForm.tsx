"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type TCollectionFormSchema, collectionFormSchema } from "~/lib/types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { collectionFormDefaultValues } from "~/data/collectionFormDefaultValues";

export function CreateCollectionForm() {
    const router = useRouter();
    const form = useForm<TCollectionFormSchema>({
        resolver: zodResolver(collectionFormSchema),
        defaultValues: collectionFormDefaultValues,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "field",
    });

    async function handleCreateCollection(values: TCollectionFormSchema) {
        console.log(values);
        const res = await fetch("/api/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (!res.ok) {
            if (res.status === 409) {
                form.setError("name", {
                    type: "server",
                    message: "Collection with that name already exists",
                });
                return;
            }
            // TODO: Maybe replace this later with form error if possible
            toast({
                title: "Something went wrong, try again",
            });
            return;
        }

        toast({
            title: "Collection has been successfully created",
        });

        form.reset(collectionFormDefaultValues);
        router.refresh();
        console.log(res);
    }

    return (
        <div className="flex justify-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleCreateCollection)}
                    className="sm:w-1/2 p-6 space-y-8 rounded-lg border-border border"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Name of the collection"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Description of the collection"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="topic.topicName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Topic</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Topic of the collection"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {fields.map((customField, index) => (
                        <div key={customField.id}>
                            <FormField
                                control={form.control}
                                name={`field.${index}.fieldName`}
                                render={({ field }) => (
                                    <FormItem className="mb-6">
                                        <FormLabel>Field Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Name of the field"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`field.${index}.fieldType`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Field Type</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Field Type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="string">
                                                    String
                                                </SelectItem>
                                                <SelectItem value="number">
                                                    Number
                                                </SelectItem>
                                                <SelectItem value="boolean">
                                                    Boolean
                                                </SelectItem>
                                                <SelectItem value="date">
                                                    Date
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                onClick={() => remove(index)}
                                className="rounded-md mt-4 bg-destructive"
                            >
                                Remove the custom field
                            </Button>
                        </div>
                    ))}
                    <Button
                        onClick={() => append({ fieldName: "", fieldType: "" })}
                        className="text-black dark:text-white border-border border rounded-md inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background hover:bg-accent h-10 px-4 py-2"
                    >
                        Add a custom Field
                    </Button>
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
