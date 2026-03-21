import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Project } from "../../../backend.d";
import {
  useCreatePersonalProject,
  useDeletePersonalProject,
  usePersonalProjects,
  useUpdatePersonalProject,
} from "../../../hooks/useQueries";
import DeleteConfirm from "../DeleteConfirm";
import ProjectForm from "../ProjectForm";

export default function PersonalProjectsSection() {
  const { data: projects, isLoading } = usePersonalProjects();
  const createMutation = useCreatePersonalProject();
  const updateMutation = useUpdatePersonalProject();
  const deleteMutation = useDeletePersonalProject();

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (project: Project) => {
    try {
      if (editingProject) {
        await updateMutation.mutateAsync(project);
        toast.success("Project updated");
      } else {
        await createMutation.mutateAsync(project);
        toast.success("Project created");
      }
      setShowForm(false);
      setEditingProject(null);
    } catch {
      toast.error("Failed to save project");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Project deleted");
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div data-ocid="admin.personal-projects.section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-light text-white/90 tracking-wide">
            Personal Projects
          </h1>
          <p className="text-sm text-white/30 font-light mt-0.5">
            {projects?.length ?? 0} items
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingProject(null);
            setShowForm(true);
          }}
          data-ocid="admin.personal-projects.primary_button"
          className="flex items-center gap-2 h-9 px-4 bg-white/8 border border-white/12 text-white/70 text-sm font-light hover:bg-white/12 hover:text-white"
        >
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      {isLoading ? (
        <div
          className="space-y-3"
          data-ocid="admin.personal-projects.loading_state"
        >
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full bg-white/4 rounded-lg" />
          ))}
        </div>
      ) : projects?.length === 0 ? (
        <div
          className="py-16 text-center"
          data-ocid="admin.personal-projects.empty_state"
        >
          <p className="text-sm text-white/25 font-light">
            No personal projects yet.
          </p>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.personal-projects.list">
          {projects?.map((project, index) => (
            <div
              key={project.id}
              data-ocid={`admin.personal-projects.item.${index + 1}`}
              className="flex items-center justify-between px-5 py-4 rounded-lg border border-white/6 bg-white/2 hover:bg-white/4 transition-colors duration-200"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-light text-white/80 truncate">
                  {project.title}
                </p>
                <p className="text-xs text-white/30 font-light truncate mt-0.5">
                  {project.oneLiner}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                <Button
                  size="icon"
                  onClick={() => {
                    setEditingProject(project);
                    setShowForm(true);
                  }}
                  data-ocid={`admin.personal-projects.edit_button.${index + 1}`}
                  className="w-8 h-8 bg-transparent border border-white/8 text-white/30 hover:border-white/20 hover:text-white/60"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  onClick={() => setDeletingId(project.id)}
                  data-ocid={`admin.personal-projects.delete_button.${index + 1}`}
                  className="w-8 h-8 bg-transparent border border-white/8 text-white/30 hover:border-red-800/40 hover:text-red-400/60"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          if (!open) {
            setShowForm(false);
            setEditingProject(null);
          }
        }}
      >
        <DialogContent className="bg-[#0f0f0f] border-white/8 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-light text-white/80 tracking-wide">
              {editingProject ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>
          <ProjectForm
            initial={editingProject ?? undefined}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={!!deletingId}
        label={projects?.find((p) => p.id === deletingId)?.title ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
