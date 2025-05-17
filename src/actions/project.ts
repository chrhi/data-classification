"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  owner_id: z.string().uuid("Invalid user ID"),
});

const getProjectByIdSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
});

const getAllProjectsSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

const updateProjectSchema = z.object({
  projectId: z.string().uuid("Invalid project ID"),
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "ARCHIVED", "COMPLETED"]).optional(),
});

// Create a new project
export const createProjectAction = async (formData: FormData) => {
  try {
    const rawData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      owner_id: formData.get("owner_id") as string,
    };

    const validatedData = createProjectSchema.parse(rawData);

    // Check if user exists
    const user = await db.user.findUnique({
      where: { id: validatedData.owner_id },
    });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const project = await db.project.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        owner_id: validatedData.owner_id,
      },
    });

    revalidatePath("/projects");

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input data",
        details: error.errors,
      };
    }

    console.error("Error creating project:", error);
    return {
      success: false,
      error: "Failed to create project",
    };
  }
};

// Get all projects for a specific user
export const getAllProjectsAction = async (userId: string) => {
  try {
    const validatedData = getAllProjectsSchema.parse({ userId });

    const projects = await db.project.findMany({
      where: {
        owner_id: validatedData.userId,
      },
      include: {
        owner: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return {
      success: true,
      data: projects,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid user ID",
        details: error.errors,
      };
    }

    console.error("Error fetching projects:", error);
    return {
      success: false,
      error: "Failed to fetch projects",
    };
  }
};

// Get a specific project by ID
export const getProjectByIdAction = async (projectId: string) => {
  try {
    const validatedData = getProjectByIdSchema.parse({ projectId });

    const project = await db.project.findUnique({
      where: {
        id: validatedData.projectId,
      },
      include: {
        owner: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
      },
    });

    if (!project) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    return {
      success: true,
      data: project,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid project ID",
        details: error.errors,
      };
    }

    console.error("Error fetching project:", error);
    return {
      success: false,
      error: "Failed to fetch project",
    };
  }
};

// Update a project
export const updateProjectAction = async (formData: FormData) => {
  try {
    const rawData = {
      projectId: formData.get("projectId") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: formData.get("status") as string,
    };

    // Remove empty strings and convert to proper types
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (rawData.title) updateData.title = rawData.title;
    if (rawData.description !== undefined)
      updateData.description = rawData.description;
    if (rawData.status) updateData.status = rawData.status;

    const validatedData = updateProjectSchema.parse({
      projectId: rawData.projectId,
      ...updateData,
    });

    // Check if project exists
    const existingProject = await db.project.findUnique({
      where: { id: validatedData.projectId },
    });

    if (!existingProject) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    const { projectId, ...updateFields } = validatedData;

    const updatedProject = await db.project.update({
      where: {
        id: projectId,
      },
      data: updateFields,
      include: {
        owner: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
          },
        },
      },
    });

    revalidatePath("/projects");
    revalidatePath(`/projects/${projectId}`);

    return {
      success: true,
      data: updatedProject,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input data",
        details: error.errors,
      };
    }

    console.error("Error updating project:", error);
    return {
      success: false,
      error: "Failed to update project",
    };
  }
};

// Delete a project
export const deleteProjectAction = async (projectId: string) => {
  try {
    const validatedData = getProjectByIdSchema.parse({ projectId });

    // Check if project exists
    const existingProject = await db.project.findUnique({
      where: { id: validatedData.projectId },
    });

    if (!existingProject) {
      return {
        success: false,
        error: "Project not found",
      };
    }

    await db.project.delete({
      where: {
        id: validatedData.projectId,
      },
    });

    revalidatePath("/projects");

    return {
      success: true,
      message: "Project deleted successfully",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid project ID",
        details: error.errors,
      };
    }

    console.error("Error deleting project:", error);
    return {
      success: false,
      error: "Failed to delete project",
    };
  }
};
