import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronDown,
  ChevronRight,
  Loader2,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { JobRole, WorkExperience } from "../../../backend.d";
import {
  useCreateWorkExperience,
  useDeleteWorkExperience,
  useUpdateWorkExperience,
  useWorkExperiences,
} from "../../../hooks/useQueries";
import DeleteConfirm from "../DeleteConfirm";

function RoleEditor({
  role,
  onChange,
  onRemove,
}: {
  role: JobRole;
  onChange: (r: JobRole) => void;
  onRemove: () => void;
}) {
  return (
    <div className="p-4 rounded-lg border border-white/6 bg-white/2 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/40 font-light tracking-wider uppercase">
          Role
        </p>
        <button
          type="button"
          onClick={onRemove}
          className="text-white/20 hover:text-red-400/60 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs text-white/35 font-light">Job Title</Label>
          <Input
            value={role.title}
            onChange={(e) => onChange({ ...role, title: e.target.value })}
            placeholder="e.g. Senior XR Designer"
            className="bg-white/4 border-white/8 text-white/80 placeholder:text-white/15 text-sm h-8"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-white/35 font-light">Date Range</Label>
          <Input
            value={role.dateRange}
            onChange={(e) => onChange({ ...role, dateRange: e.target.value })}
            placeholder="e.g. 01/2023 – Present"
            className="bg-white/4 border-white/8 text-white/80 placeholder:text-white/15 text-sm h-8"
          />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-white/35 font-light">
          Responsibilities (one per line)
        </Label>
        <Textarea
          value={role.responsibilities.join("\n")}
          onChange={(e) =>
            onChange({
              ...role,
              responsibilities: e.target.value.split("\n").filter(Boolean),
            })
          }
          rows={4}
          placeholder="- Led XR workflow integration...\n- Managed cross-functional teams..."
          className="bg-white/4 border-white/8 text-white/80 placeholder:text-white/15 text-xs resize-none"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-white/35 font-light">
          Achievements (one per line)
        </Label>
        <Textarea
          value={role.achievements.join("\n")}
          onChange={(e) =>
            onChange({
              ...role,
              achievements: e.target.value.split("\n").filter(Boolean),
            })
          }
          rows={3}
          placeholder="✓ Delivered 15+ projects...\n✓ Reduced cycles by 30%..."
          className="bg-white/4 border-white/8 text-white/80 placeholder:text-white/15 text-xs resize-none"
        />
      </div>
    </div>
  );
}

interface CompanyFormProps {
  initial?: WorkExperience;
  onSave: (exp: WorkExperience) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

function CompanyForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: CompanyFormProps) {
  const [companyName, setCompanyName] = useState(initial?.companyName ?? "");
  const [order, setOrder] = useState(
    initial?.order !== undefined ? Number(initial.order) : 0,
  );
  const [roles, setRoles] = useState<JobRole[]>(initial?.roles ?? []);

  const addRole = () => {
    setRoles((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        dateRange: "",
        responsibilities: [],
        achievements: [],
      },
    ]);
  };

  const updateRole = (index: number, updated: JobRole) => {
    setRoles((prev) => prev.map((r, i) => (i === index ? updated : r)));
  };

  const removeRole = (index: number) => {
    setRoles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      id: initial?.id ?? crypto.randomUUID(),
      companyName,
      order: BigInt(order),
      roles,
      logoBlobId: initial?.logoBlobId,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="admin.work-experience.modal"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
            Company Name *
          </Label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder="e.g. Jacobs"
            data-ocid="admin.work-experience.input"
            className="bg-white/4 border-white/10 text-white/80 placeholder:text-white/20 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
            Order
          </Label>
          <Input
            type="number"
            value={order}
            onChange={(e) => setOrder(Number(e.target.value))}
            className="bg-white/4 border-white/10 text-white/80 text-sm"
          />
        </div>
      </div>

      <Separator className="bg-white/5" />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
            Roles ({roles.length})
          </Label>
          <button
            type="button"
            onClick={addRole}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors font-light"
          >
            <Plus className="w-3.5 h-3.5" /> Add Role
          </button>
        </div>
        {roles.map((role, index) => (
          <RoleEditor
            key={role.id}
            role={role}
            onChange={(updated) => updateRole(index, updated)}
            onRemove={() => removeRole(index)}
          />
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          onClick={onCancel}
          data-ocid="admin.work-experience.cancel_button"
          className="h-9 px-5 bg-transparent border border-white/10 text-white/50 text-sm font-light"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
          data-ocid="admin.work-experience.save_button"
          className="h-9 px-5 bg-white/8 border border-white/15 text-white/80 text-sm font-light"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default function WorkExperienceSection() {
  const { data: experiences, isLoading } = useWorkExperiences();
  const createMutation = useCreateWorkExperience();
  const updateMutation = useUpdateWorkExperience();
  const deleteMutation = useDeleteWorkExperience();

  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState<WorkExperience | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSave = async (exp: WorkExperience) => {
    try {
      if (editingExp) {
        await updateMutation.mutateAsync(exp);
        toast.success("Work experience updated");
      } else {
        await createMutation.mutateAsync(exp);
        toast.success("Work experience added");
      }
      setShowForm(false);
      setEditingExp(null);
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Work experience deleted");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div data-ocid="admin.work-experience.section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-light text-white/90 tracking-wide">
            Work Experience
          </h1>
          <p className="text-sm text-white/30 font-light mt-0.5">
            {experiences?.length ?? 0} companies
          </p>
        </div>
        <Button
          type="button"
          onClick={() => {
            setEditingExp(null);
            setShowForm(true);
          }}
          data-ocid="admin.work-experience.primary_button"
          className="flex items-center gap-2 h-9 px-4 bg-white/8 border border-white/12 text-white/70 text-sm font-light hover:bg-white/12 hover:text-white"
        >
          <Plus className="w-4 h-4" /> Add Company
        </Button>
      </div>

      {isLoading ? (
        <div
          className="space-y-3"
          data-ocid="admin.work-experience.loading_state"
        >
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-20 w-full bg-white/4 rounded-lg" />
          ))}
        </div>
      ) : experiences?.length === 0 ? (
        <div
          className="py-16 text-center"
          data-ocid="admin.work-experience.empty_state"
        >
          <p className="text-sm text-white/25 font-light">
            No work experience yet.
          </p>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.work-experience.list">
          {experiences?.map((exp, index) => (
            <div
              key={exp.id}
              data-ocid={`admin.work-experience.item.${index + 1}`}
              className="rounded-lg border border-white/6 bg-white/2"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <button
                  type="button"
                  className="flex items-center gap-3 min-w-0 flex-1 text-left"
                  onClick={() =>
                    setExpandedId(expandedId === exp.id ? null : exp.id)
                  }
                >
                  {expandedId === exp.id ? (
                    <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white/30 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-light text-white/80">
                      {exp.companyName}
                    </p>
                    <p className="text-xs text-white/30 font-light">
                      {exp.roles.length} role{exp.roles.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </button>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => {
                      setEditingExp(exp);
                      setShowForm(true);
                    }}
                    data-ocid={`admin.work-experience.edit_button.${index + 1}`}
                    className="w-8 h-8 bg-transparent border border-white/8 text-white/30 hover:border-white/20 hover:text-white/60"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => setDeletingId(exp.id)}
                    data-ocid={`admin.work-experience.delete_button.${index + 1}`}
                    className="w-8 h-8 bg-transparent border border-white/8 text-white/30 hover:border-red-800/40 hover:text-red-400/60"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              {expandedId === exp.id && (
                <div className="px-5 pb-4 space-y-2">
                  {exp.roles.map((role) => (
                    <div
                      key={role.id}
                      className="px-4 py-3 rounded-md border border-white/4 bg-white/2"
                    >
                      <p className="text-xs font-light text-white/60">
                        {role.title}
                      </p>
                      <p className="text-xs text-white/30 font-light mt-0.5">
                        {role.dateRange}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={showForm}
        onOpenChange={(open) => {
          if (!open) {
            setShowForm(false);
            setEditingExp(null);
          }
        }}
      >
        <DialogContent className="bg-[#0f0f0f] border-white/8 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-light text-white/80 tracking-wide">
              {editingExp ? "Edit Company" : "Add Company"}
            </DialogTitle>
          </DialogHeader>
          <CompanyForm
            initial={editingExp ?? undefined}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingExp(null);
            }}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={!!deletingId}
        label={experiences?.find((e) => e.id === deletingId)?.companyName ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
