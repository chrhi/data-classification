import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { createProjectAction } from "@/actions/project";
import { toast } from "react-hot-toast";

interface CreateProjectProps {
  userId: string;
  triggerText?: string;
  triggerVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export default function CreateProject({
  userId,
  triggerText = "Create Project",
  triggerVariant = "default",
}: CreateProjectProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      owner_id: string;
    }) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("owner_id", data.owner_id);

      const result = await createProjectAction(formData);

      if (!result.success) {
        throw new Error(result.error || "Failed to create project");
      }

      return result.data;
    },
    onSuccess: () => {
      // Invalidate and refetch projects query
      queryClient.invalidateQueries({ queryKey: ["projects", userId] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      // Reset form and close modal
      setFormData({ title: "", description: "" });
      setOpen(false);

      // Show success message
      toast.success(`Project  created successfully!`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to create project: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    createProjectMutation.mutate({
      title: formData.title.trim(),
      description: formData.description.trim(),
      owner_id: userId,
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant} className="gap-2">
          <Plus className="h-4 w-4" />
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new project to organize and track your work. You can always
            edit these details later.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={createProjectMutation.isPending}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your project..."
              value={formData.description}
              onChange={handleInputChange}
              disabled={createProjectMutation.isPending}
              className="w-full min-h-[100px] resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createProjectMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                createProjectMutation.isPending || !formData.title.trim()
              }
              className="gap-2"
            >
              {createProjectMutation.isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
