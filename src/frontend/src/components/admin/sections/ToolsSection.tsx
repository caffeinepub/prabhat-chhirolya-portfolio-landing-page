import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { ToolCategory } from "../../../backend.d";
import {
  useCreateToolCategory,
  useDeleteToolCategory,
  useToolCategories,
  useUpdateToolCategory,
} from "../../../hooks/useQueries";
import DeleteConfirm from "../DeleteConfirm";

interface CategoryFormProps {
  initial?: ToolCategory;
  onSave: (cat: ToolCategory) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

function CategoryForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState(initial?.categoryName ?? "");
  const [toolsText, setToolsText] = useState(initial?.tools.join("\n") ?? "");
  const [order, setOrder] = useState(
    initial?.order !== undefined ? Number(initial.order) : 0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      id: initial?.id ?? crypto.randomUUID(),
      categoryName,
      tools: toolsText
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean),
      order: BigInt(order),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="admin.tools.modal"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
            Category Name *
          </Label>
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            placeholder="e.g. BIM Modelling"
            data-ocid="admin.tools.input"
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
      <div className="space-y-1.5">
        <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
          Tools (one per line)
        </Label>
        <Textarea
          value={toolsText}
          onChange={(e) => setToolsText(e.target.value)}
          required
          rows={8}
          placeholder="Revit\nSketchUp\nAutoCAD"
          data-ocid="admin.tools.textarea"
          className="bg-white/4 border-white/10 text-white/80 placeholder:text-white/20 text-sm resize-none font-mono"
        />
        <p className="text-xs text-white/25">
          One tool per line · {toolsText.split("\n").filter(Boolean).length}{" "}
          items
        </p>
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          onClick={onCancel}
          data-ocid="admin.tools.cancel_button"
          className="h-9 px-5 bg-transparent border border-white/10 text-white/50 text-sm font-light"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
          data-ocid="admin.tools.save_button"
          className="h-9 px-5 bg-white/8 border border-white/15 text-white/80 text-sm font-light"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default function ToolsSection() {
  const { data: categories, isLoading } = useToolCategories();
  const createMutation = useCreateToolCategory();
  const updateMutation = useUpdateToolCategory();
  const deleteMutation = useDeleteToolCategory();

  const [showForm, setShowForm] = useState(false);
  const [editingCat, setEditingCat] = useState<ToolCategory | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (cat: ToolCategory) => {
    try {
      if (editingCat) {
        await updateMutation.mutateAsync(cat);
        toast.success("Category updated");
      } else {
        await createMutation.mutateAsync(cat);
        toast.success("Category created");
      }
      setShowForm(false);
      setEditingCat(null);
    } catch {
      toast.error("Failed to save category");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div data-ocid="admin.tools.section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-light text-white/90 tracking-wide">
            Tools & Ecosystem
          </h1>
          <p className="text-sm text-white/30 font-light mt-0.5">
            {categories?.length ?? 0} categories
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCat(null);
            setShowForm(true);
          }}
          data-ocid="admin.tools.primary_button"
          className="flex items-center gap-2 h-9 px-4 bg-white/8 border border-white/12 text-white/70 text-sm font-light hover:bg-white/12 hover:text-white"
        >
          <Plus className="w-4 h-4" /> Add Category
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="admin.tools.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full bg-white/4 rounded-lg" />
          ))}
        </div>
      ) : categories?.length === 0 ? (
        <div className="py-16 text-center" data-ocid="admin.tools.empty_state">
          <p className="text-sm text-white/25 font-light">No categories yet.</p>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.tools.list">
          {categories?.map((cat, index) => (
            <div
              key={cat.id}
              data-ocid={`admin.tools.item.${index + 1}`}
              className="flex items-center justify-between px-5 py-4 rounded-lg border border-white/6 bg-white/2 hover:bg-white/4 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-light text-white/80">
                  {cat.categoryName}
                </p>
                <p className="text-xs text-white/30 font-light mt-0.5 truncate">
                  {cat.tools.join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                <Button
                  size="icon"
                  onClick={() => {
                    setEditingCat(cat);
                    setShowForm(true);
                  }}
                  data-ocid={`admin.tools.edit_button.${index + 1}`}
                  className="w-8 h-8 bg-transparent border border-white/8 text-white/30 hover:border-white/20 hover:text-white/60"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  onClick={() => setDeletingId(cat.id)}
                  data-ocid={`admin.tools.delete_button.${index + 1}`}
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
            setEditingCat(null);
          }
        }}
      >
        <DialogContent className="bg-[#0f0f0f] border-white/8 text-white max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-light text-white/80 tracking-wide">
              {editingCat ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <CategoryForm
            initial={editingCat ?? undefined}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingCat(null);
            }}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={!!deletingId}
        label={categories?.find((c) => c.id === deletingId)?.categoryName ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
