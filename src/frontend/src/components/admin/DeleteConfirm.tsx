import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmProps {
  open: boolean;
  label: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirm({
  open,
  label,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        className="bg-[#111] border-white/10 text-white"
        data-ocid="admin.delete.dialog"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="font-light text-white/80">
            Delete item?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/40 font-light">
            This will permanently delete{" "}
            <span className="text-white/60">{label}</span>. This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            data-ocid="admin.delete.cancel_button"
            className="bg-transparent border-white/10 text-white/50 hover:bg-white/5 hover:text-white/70"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            data-ocid="admin.delete.confirm_button"
            className="bg-red-900/40 border border-red-700/30 text-red-300 hover:bg-red-900/60"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
