import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is requierd 🙄",
  }),
  password: z.string().min(1, {
    message: "Password is requierd 🔑",
  }),
});

export const codeSchema = z.object({
  code: z.string().min(6, {
    message: "Code Invailed",
  }),
});
export const projectFastSchema = z.object({
  title: z.string(),
  description: z.string(),
  cover: z.string(),
});
export const projectSchema = z.object({
  cover: z.string().min(1, { message: "Cover is required" }),
  logo: z.string().min(1, { message: "Logo is required" }),
  title: z
    .string()
    .min(4, { message: "Title must be at least 4 characters long" }),
  functionality: z.string().min(1, { message: "Functionality is required" }),
  about: z.string().min(1, { message: "About is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  advantages: z.array(
    z.object({
      value: z.string().min(1, { message: "Advantages must not be empty" }),
    })
  ),
  links: z.array(
    z.object({
      link: z.string().min(1, { message: "Link is required" }),
      platform: z.string().min(1, { message: "Platform is required" }),
    })
  ),
  technologies: z.array(
    z.number().min(1, { message: "Technologies must not be empty" })
  ),
  tools: z.array(z.number().min(1, { message: "Tools must not be empty" })),
  work_types: z.array(
    z.number().min(1, { message: "Work types must not be empty" })
  ),
  platforms: z.array(
    z.number().min(1, { message: "Platforms must not be empty" })
  ),
  members: z.array(z.number().min(1, { message: "Members must not be empty" })),
});

export const imagesSchema = z.object({
  images: z.array(
    z.object({
      id: z.optional(z.any()),
      imgUrl: z.string(),
    })
  ),
});

export const itemSchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
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
