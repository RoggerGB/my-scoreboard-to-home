import { z } from "zod";

const nonNegativeInt = z.coerce.number().int().min(0);

export const matchStateSchema = z.object({
  localName: z.string().trim().min(1).max(48),
  awayName: z.string().trim().min(1).max(48),
  localScore: nonNegativeInt,
  awayScore: nonNegativeInt,
  period: z.coerce.number().int().min(1).max(10),
  timeSeconds: nonNegativeInt,
  startTime: z.string().trim().regex(/^([01]\\d|2[0-3]):([0-5]\\d)$/),
});

export const matchStatePatchSchema = matchStateSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: "Request body must include at least one field." }
);

export type MatchStateInput = z.infer<typeof matchStateSchema>;
export type MatchStatePatchInput = z.infer<typeof matchStatePatchSchema>;
