import * as z from "zod";
export const projectSchema = z.object({
  title: z.string().min(1),
  functionality: z.string().min(1),
  about: z.string().min(1),
  description: z.string().min(1),
  advantages: z.array(z.string().min(1)),
  links: z.array(
    z.object({
      link: z.string().min(1),
      platform: z.string().min(1),
    })
  ),
  technologies: z.array(z.number().min(1)),
  tools: z.array(z.number().min(1)),
  work_types: z.array(z.number().min(1)),
  platforms: z.array(z.number().min(1)),
  members: z.array(z.number().min(1)),
});

export const itemSchema = z.object({
  name: z.string(),
  icon: z.string(),
});
export const memberSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export const project = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  functionality: z.string(),
  about: z.string(),
  advantages: z.array(z.string()),
  links: z.array(
    z.object({
      link: z.string(),
      platform: z.string(),
    })
  ),
  active: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  cover_url: z.string(),
  logo_url: z.string(),
  images_hero: z.array(z.string()),
  features: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      description: z.string(),
      project_id: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      images: z.array(
        z.object({
          id: z.number(),
          created_at: z.string(),
          updated_at: z.string(),
          image_url: z.string(),
        })
      ),
    })
  ),
  images: z.array(
    z.object({
      id: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      image_url: z.string(),
    })
  ),
  technologies: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      number_project: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      icon_url: z.string(),
    })
  ),
  tools: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      number_project: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      icon_url: z.string(),
    })
  ),
  work_types: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      number_project: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      icon_url: z.string(),
    })
  ),
  platforms: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      number_project: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      icon_url: z.string(),
    })
  ),
  members: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      number_project: z.number(),
      created_at: z.string(),
      updated_at: z.string(),
      icon_url: z.string(),
    })
  ),
});
