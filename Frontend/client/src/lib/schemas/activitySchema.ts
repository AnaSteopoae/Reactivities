import {z} from "zod";

export const activitySchema = z.object({
    title: z.string({required_error: 'Title is requiered'}).min(1, {message: 'Title is required'}),
   
});

export type ActivitySchema = z.infer<typeof activitySchema>;