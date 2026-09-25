import {z} from "zod";
import { requiredString } from "../util/util";

export const activitySchema = z.object({
    title: requiredString('Title'),
    date: z.coerce.date({
        message: 'Date is required'
    }),
    description: requiredString('Description'),
    category: requiredString('Category'),
    location: z.object({
        venue :requiredString('Venue'),
        city: z.string().optional(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number()
    })
   
});

export type ActivitySchema = z.infer<typeof activitySchema>;