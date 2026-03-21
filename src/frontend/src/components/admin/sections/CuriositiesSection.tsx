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
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Curiosity } from "../../../backend.d";
import {
  useCreateCuriosity,
  useCuriosities,
  useDeleteCuriosity,
  useUpdateCuriosity,
} from "../../../hooks/useQueries";
import DeleteConfirm from "../DeleteConfirm";

interface ItemFormProps {
  initial?: Curiosity;
  onSave: (c: Curiosity) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

function ItemForm({ initial, onSave, onCancel, isSaving }: ItemFormProps) {
  const [content, setContent] = useState(initial?.content ?? "");
  const [order, setOrder] = useState(
    initial?.order !== undefined ? Number(initial.order) : 0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      id: initial?.id ?? crypto.randomUUID(),
      content,
      order: BigInt(order),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="admin.curiosities.modal"
    >
      <div className="space-y-1.5">
        <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
          Curiosity *
        </Label>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="e.g. XR as a natural interface..."
          data-ocid="admin.curiosities.input"
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
          className="bg-white/4 border-white/10 text-white/80 text-sm w-32"
        />
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          onClick={onCancel}
          data-ocid="admin.curiosities.cancel_button"
          className="h-9 px-5 bg-transparent border border-white/10 text-white/50 text-sm font-light"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
          data-ocid="admin.curiosities.save_button"
          className="h-9 px-5 bg-white/8 border border-white/15 text-white/80 text-sm font-light"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default function CuriositiesSection() {
  const { data: items, isLoading } = useCuriosities();
  const createMutation = useCreateCuriosity();
  const updateMutation = useUpdateCuriosity();
  const deleteMutation = useDeleteCuriosity();

  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Curiosity | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (c: Curiosity) => {
    try {
      if (editingItem) {
        await updateMutation.mutateAsync(c);
        toast.success("Curiosity updated");
      } else {
        await createMutation.mutateAsync(c);
        toast.success("Curiosity added");
      }
      setShowForm(false);
      setEditingItem(null);
    } catch {
      toast.error("Failed to save");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Curiosity deleted");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div data-ocid="admin.curiosities.section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-light text-white/90 tracking-wide">
            Current Curiosities
          </h1>
          <p className="text-sm text-white/30 font-light mt-0.5">
            {items?.length ?? 0} items
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingItem(null);
            setShowForm(true);
          }}
          data-ocid="admin.curiosities.primary_button"
          className="flex items-center gap-2 h-9 px-4 bg-white/8 border border-white/12 text-white/70 text-sm font-light hover:bg-white/12 hover:text-white"
        >
          <Plus className="w-4 h-4" /> Add Item
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="admin.curiosities.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full bg-white/4 rounded-lg" />
          ))}
        </div>
      ) : items?.length === 0 ? (
        <div
          className="py-16 text-center"
          data-ocid="admin.curiosities.empty_state"
        >
          <p className="text-sm text-white/25 font-light">
            No curiosities yet.
          </p>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.curiosities.list">
          {items?.map((item, index) => (
            <div
              key={item.id}
              data-ocid={`admin.curiosities.item.${index + 1}`}
              className="flex items-center justify-between px-5 py-3.5 rounded-lg border border-white/6 bg-white/2 hover:bg-white/4 transition-colors"
            >
              <p className="text-sm font-light text-white/70 flex-1 min-w-0 pr-4">
                {item.content}
              </p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="icon"
                  onClick={() => {
                    setEditingItem(item);
                    setShowForm(true);
                  }}
                  data-ocid={`admin.curiosities.edit_button.${index + 1}`}
                  className="w-8 h-8 bg-transparent border border-white/8 text-white/30 hover:border-white/20 hover:text-white/60"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  onClick={() => setDeletingId(item.id)}
                  data-ocid={`admin.curiosities.delete_button.${index + 1}`}
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
            setEditingItem(null);
          }
        }}
      >
        <DialogContent className="bg-[#0f0f0f] border-white/8 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-light text-white/80 tracking-wide">
              {editingItem ? "Edit Curiosity" : "Add Curiosity"}
            </DialogTitle>
          </DialogHeader>
          <ItemForm
            initial={editingItem ?? undefined}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={!!deletingId}
        label={
          items?.find((i) => i.id === deletingId)?.content.slice(0, 40) ?? ""
        }
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
