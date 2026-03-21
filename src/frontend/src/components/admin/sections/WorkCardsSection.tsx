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
import type { WorkCard } from "../../../backend.d";
import {
  useCreateWorkCard,
  useDeleteWorkCard,
  useUpdateWorkCard,
  useWorkCards,
} from "../../../hooks/useQueries";
import DeleteConfirm from "../DeleteConfirm";

interface CardFormProps {
  initial?: WorkCard;
  onSave: (card: WorkCard) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

function CardForm({ initial, onSave, onCancel, isSaving }: CardFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [order, setOrder] = useState(
    initial?.order !== undefined ? Number(initial.order) : 0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      id: initial?.id ?? crypto.randomUUID(),
      title,
      description,
      order: BigInt(order),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="admin.work-cards.modal"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
            Title *
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g. Experience-Driven"
            data-ocid="admin.work-cards.input"
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
          Description *
        </Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          placeholder="Card description..."
          data-ocid="admin.work-cards.textarea"
          className="bg-white/4 border-white/10 text-white/80 placeholder:text-white/20 text-sm resize-none"
        />
      </div>
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          onClick={onCancel}
          data-ocid="admin.work-cards.cancel_button"
          className="h-9 px-5 bg-transparent border border-white/10 text-white/50 text-sm font-light"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
          data-ocid="admin.work-cards.save_button"
          className="h-9 px-5 bg-white/8 border border-white/15 text-white/80 text-sm font-light"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}

export default function WorkCardsSection() {
  const { data: cards, isLoading } = useWorkCards();
  const createMutation = useCreateWorkCard();
  const updateMutation = useUpdateWorkCard();
  const deleteMutation = useDeleteWorkCard();

  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<WorkCard | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSave = async (card: WorkCard) => {
    try {
      if (editingCard) {
        await updateMutation.mutateAsync(card);
        toast.success("Card updated");
      } else {
        await createMutation.mutateAsync(card);
        toast.success("Card created");
      }
      setShowForm(false);
      setEditingCard(null);
    } catch {
      toast.error("Failed to save card");
    }
  };

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await deleteMutation.mutateAsync(deletingId);
      toast.success("Card deleted");
    } catch {
      toast.error("Failed to delete");
    } finally {
      setDeletingId(null);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div data-ocid="admin.work-cards.section">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-light text-white/90 tracking-wide">
            How I See My Work
          </h1>
          <p className="text-sm text-white/30 font-light mt-0.5">
            {cards?.length ?? 0} cards
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCard(null);
            setShowForm(true);
          }}
          data-ocid="admin.work-cards.primary_button"
          className="flex items-center gap-2 h-9 px-4 bg-white/8 border border-white/12 text-white/70 text-sm font-light hover:bg-white/12 hover:text-white"
        >
          <Plus className="w-4 h-4" /> Add Card
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="admin.work-cards.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full bg-white/4 rounded-lg" />
          ))}
        </div>
      ) : cards?.length === 0 ? (
        <div
          className="py-16 text-center"
          data-ocid="admin.work-cards.empty_state"
        >
          <p className="text-sm text-white/25 font-light">No work cards yet.</p>
        </div>
      ) : (
        <div className="space-y-2" data-ocid="admin.work-cards.list">
          {cards?.map((card, index) => (
            <div
              key={card.id}
              data-ocid={`admin.work-cards.item.${index + 1}`}
              className="flex items-center justify-between px-5 py-4 rounded-lg border border-white/6 bg-white/2 hover:bg-white/4 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-light text-white/80">{card.title}</p>
                <p className="text-xs text-white/30 font-light mt-0.5 truncate">
                  {card.description}
                </p>
              </div>
              <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                <Button
                  size="icon"
                  onClick={() => {
                    setEditingCard(card);
                    setShowForm(true);
                  }}
                  data-ocid={`admin.work-cards.edit_button.${index + 1}`}
                  className="w-8 h-8 bg-transparent border border-white/8 text-white/30 hover:border-white/20 hover:text-white/60"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="icon"
                  onClick={() => setDeletingId(card.id)}
                  data-ocid={`admin.work-cards.delete_button.${index + 1}`}
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
            setEditingCard(null);
          }
        }}
      >
        <DialogContent className="bg-[#0f0f0f] border-white/8 text-white max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-light text-white/80 tracking-wide">
              {editingCard ? "Edit Card" : "Add Card"}
            </DialogTitle>
          </DialogHeader>
          <CardForm
            initial={editingCard ?? undefined}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingCard(null);
            }}
            isSaving={isSaving}
          />
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={!!deletingId}
        label={cards?.find((c) => c.id === deletingId)?.title ?? ""}
        onConfirm={handleDelete}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
}
