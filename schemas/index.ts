import * as z from "zod";

export const projectSchema = z.object({
  name: z.string(),
  functionality: z.string(),
  description: z.string(),
  about: z.string(),

  advantages: z.array(
    z.object({
      value: z.string(),
    })
  ),
  links: z.array(
    z.object({
      value: z.string(),
    })
  ),

  technologies: z.array(z.string()),
  tools: z.array(z.string()),
  work_types: z.array(z.string()),
  platforms: z.array(z.string()),
  members: z.array(z.string()),
});

export const itemSchema = z.object({
  name: z.string(),
  icon: z.string(),
});
