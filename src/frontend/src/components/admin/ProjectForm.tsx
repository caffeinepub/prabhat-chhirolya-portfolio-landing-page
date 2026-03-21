import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import type { Project } from "../../backend.d";
import { useStorageUpload } from "../../hooks/useStorage";

interface ProjectFormProps {
  initial?: Partial<Project>;
  onSave: (project: Project) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
}

export default function ProjectForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: ProjectFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [oneLiner, setOneLiner] = useState(initial?.oneLiner ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [tools, setTools] = useState(initial?.tools ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [youtubeUrl, setYoutubeUrl] = useState(initial?.youtubeUrl ?? "");
  const [order, setOrder] = useState(
    initial?.order !== undefined ? Number(initial.order) : 0,
  );
  const [thumbnailBlobId, setThumbnailBlobId] = useState(
    initial?.thumbnailBlobId ?? "",
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const { upload, isUploading } = useStorageUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const hash = await upload(file, setUploadProgress);
      setThumbnailBlobId(hash);
    } catch {
      // silently fail – user can try again
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = initial?.id ?? crypto.randomUUID();
    await onSave({
      id,
      title,
      oneLiner,
      role,
      tools,
      description,
      youtubeUrl: youtubeUrl || undefined,
      thumbnailBlobId: thumbnailBlobId || undefined,
      order: BigInt(order),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      data-ocid="admin.project.modal"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
            Title *
          </Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Project title"
            data-ocid="admin.project.input"
            className="bg-white/4 border-white/10 text-white/80 placeholder:text-white/20 focus:border-white/25 text-sm"
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
            className="bg-white/4 border-white/10 text-white/80 focus:border-white/25 text-sm"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
          One-Liner *
        </Label>
        <Input
          value={oneLiner}
          onChange={(e) => setOneLiner(e.target.value)}
          required
          placeholder="Short description shown on card"
          className="bg-white/4 border-white/10 text-white/80 placeholder:text-white/20 focus:border-white/25 text-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
            Role
          </Label>
          <Input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g. Project Lead"
            className="bg-white/4 border-white/10 text-white/80 placeholder:text-white/20 focus:border-white/25 text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
            Tools & Technologies
          </Label>
          <Input
            value={tools}
            onChange={(e) => setTools(e.target.value)}
            placeholder="Revit, Unreal Engine, ..."
            className="bg-white/4 border-white/10 text-white/80 placeholder:text-white/20 focus:border-white/25 text-sm"
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
          rows={5}
          placeholder="Full project description..."
          data-ocid="admin.project.textarea"
          className="bg-white/4 border-white/10 text-white/80 placeholder:text-white/20 focus:border-white/25 text-sm resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
          YouTube URL
        </Label>
        <Input
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://youtu.be/..."
          className="bg-white/4 border-white/10 text-white/80 placeholder:text-white/20 focus:border-white/25 text-sm"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs text-white/50 font-light tracking-wider uppercase">
          Thumbnail
        </Label>
        <div className="flex items-center gap-3">
          <label
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-white/10 bg-white/4 text-white/50 text-xs font-light cursor-pointer hover:border-white/20 hover:text-white/70 transition-all duration-200"
            data-ocid="admin.project.upload_button"
          >
            <Upload className="w-3.5 h-3.5" />
            {isUploading ? `Uploading ${uploadProgress}%` : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
          {thumbnailBlobId && (
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className="font-mono truncate max-w-[160px]">
                {thumbnailBlobId.slice(0, 16)}...
              </span>
              <button type="button" onClick={() => setThumbnailBlobId("")}>
                <X className="w-3 h-3 text-white/30 hover:text-white/60" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          onClick={onCancel}
          data-ocid="admin.project.cancel_button"
          className="h-9 px-5 bg-transparent border border-white/10 text-white/50 text-sm font-light hover:border-white/20 hover:text-white/70"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving || isUploading}
          data-ocid="admin.project.save_button"
          className="h-9 px-5 bg-white/8 border border-white/15 text-white/80 text-sm font-light hover:bg-white/12 hover:text-white"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
}
