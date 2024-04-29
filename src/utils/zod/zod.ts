import { z } from "zod";

export const mapSchema = z.object({
  startingPoint: z
    .string()
    .min(2, "Starting point must contain at least 2 character(s)"),
  endPoint: z
    .string()
    .min(2, "Destination must contain at least 2 character(s)"),
});

export type MapSchemaFormValues = z.infer<typeof mapSchema>

