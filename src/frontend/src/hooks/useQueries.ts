import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Curiosity,
  HowIThinkItem,
  Project,
  ToolCategory,
  WorkCard,
  WorkExperience,
} from "../backend.d";
import { useActor } from "./useActor";

// ─── Professional Projects ────────────────────────────────────────────────────

export function useProfessionalProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["professionalProjects"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getProfessionalProjects();
      return [...results].sort((a, b) => Number(a.order) - Number(b.order));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateProfessionalProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => actor!.createProfessionalProject(project),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["professionalProjects"] }),
  });
}

export function useUpdateProfessionalProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => actor!.updateProfessionalProject(project),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["professionalProjects"] }),
  });
}

export function useDeleteProfessionalProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deleteProfessionalProject(id),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["professionalProjects"] }),
  });
}

// ─── Personal Projects ────────────────────────────────────────────────────────

export function usePersonalProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["personalProjects"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getPersonalProjects();
      return [...results].sort((a, b) => Number(a.order) - Number(b.order));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreatePersonalProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => actor!.createPersonalProject(project),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["personalProjects"] }),
  });
}

export function useUpdatePersonalProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (project: Project) => actor!.updatePersonalProject(project),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["personalProjects"] }),
  });
}

export function useDeletePersonalProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deletePersonalProject(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["personalProjects"] }),
  });
}

// ─── Work Experience ──────────────────────────────────────────────────────────

export function useWorkExperiences() {
  const { actor, isFetching } = useActor();
  return useQuery<WorkExperience[]>({
    queryKey: ["workExperiences"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getWorkExperiences();
      return [...results].sort((a, b) => Number(a.order) - Number(b.order));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateWorkExperience() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (exp: WorkExperience) => actor!.createWorkExperience(exp),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workExperiences"] }),
  });
}

export function useUpdateWorkExperience() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (exp: WorkExperience) => actor!.updateWorkExperience(exp),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workExperiences"] }),
  });
}

export function useDeleteWorkExperience() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deleteWorkExperience(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workExperiences"] }),
  });
}

// ─── Tool Categories ──────────────────────────────────────────────────────────

export function useToolCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<ToolCategory[]>({
    queryKey: ["toolCategories"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getToolCategories();
      return [...results].sort((a, b) => Number(a.order) - Number(b.order));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateToolCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (cat: ToolCategory) => actor!.createToolCategory(cat),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["toolCategories"] }),
  });
}

export function useUpdateToolCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (cat: ToolCategory) => actor!.updateToolCategory(cat),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["toolCategories"] }),
  });
}

export function useDeleteToolCategory() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deleteToolCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["toolCategories"] }),
  });
}

// ─── Work Cards ───────────────────────────────────────────────────────────────

export function useWorkCards() {
  const { actor, isFetching } = useActor();
  return useQuery<WorkCard[]>({
    queryKey: ["workCards"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getWorkCards();
      return [...results].sort((a, b) => Number(a.order) - Number(b.order));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateWorkCard() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (card: WorkCard) => actor!.createWorkCard(card),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workCards"] }),
  });
}

export function useUpdateWorkCard() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (card: WorkCard) => actor!.updateWorkCard(card),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workCards"] }),
  });
}

export function useDeleteWorkCard() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deleteWorkCard(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workCards"] }),
  });
}

// ─── How I Think ──────────────────────────────────────────────────────────────

export function useHowIThinkItems() {
  const { actor, isFetching } = useActor();
  return useQuery<HowIThinkItem[]>({
    queryKey: ["howIThinkItems"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getHowIThinkItems();
      return [...results].sort((a, b) => Number(a.order) - Number(b.order));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateHowIThinkItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (item: HowIThinkItem) => actor!.createHowIThinkItem(item),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["howIThinkItems"] }),
  });
}

export function useUpdateHowIThinkItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (item: HowIThinkItem) => actor!.updateHowIThinkItem(item),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["howIThinkItems"] }),
  });
}

export function useDeleteHowIThinkItem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deleteHowIThinkItem(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["howIThinkItems"] }),
  });
}

// ─── Curiosities ──────────────────────────────────────────────────────────────

export function useCuriosities() {
  const { actor, isFetching } = useActor();
  return useQuery<Curiosity[]>({
    queryKey: ["curiosities"],
    queryFn: async () => {
      if (!actor) return [];
      const results = await actor.getCuriosities();
      return [...results].sort((a, b) => Number(a.order) - Number(b.order));
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateCuriosity() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (c: Curiosity) => actor!.createCuriosity(c),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["curiosities"] }),
  });
}

export function useUpdateCuriosity() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (c: Curiosity) => actor!.updateCuriosity(c),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["curiosities"] }),
  });
}

export function useDeleteCuriosity() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => actor!.deleteCuriosity(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["curiosities"] }),
  });
}

// ─── Admin Auth ───────────────────────────────────────────────────────────────
// NOTE: claimFirstAdmin, hasAdmin, addAdmin, removeAdmin are NOT in the backend
// Candid interface (backend.did.js). Only isCallerAdmin and
// _initializeAccessControlWithSecret exist at the canister level.
// We route through those real functions below.

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        // isCallerAdmin IS in the Candid interface as a query function
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useHasAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["hasAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        // We can't call actor.hasAdmin() — it's not in the Candid interface.
        // Use isCallerAdmin as a proxy: if the current user IS admin, admin exists.
        // If not, we return false to allow the claim flow to be attempted.
        // The backend will reject the claim if admin already exists.
        return await actor.isCallerAdmin();
      } catch {
        // On error assume no admin yet so the user can attempt the claim flow
        return false;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClaimFirstAdmin() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected. Please sign in first.");
      // _initializeAccessControlWithSecret IS in the Candid interface.
      // Calling it with an empty string attempts to bootstrap the first admin
      // when no token is configured. If the backend requires a token, use the
      // URL param: /admin?caffeineAdminToken=YOUR_TOKEN
      await actor._initializeAccessControlWithSecret("");
      // Verify we are now admin
      const isNowAdmin = await actor.isCallerAdmin();
      if (!isNowAdmin) {
        throw new Error(
          "Admin setup requires an access token. Navigate to /admin?caffeineAdminToken=YOUR_TOKEN with the token from your Caffeine project settings.",
        );
      }
      return true;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["isAdmin"] });
      qc.invalidateQueries({ queryKey: ["hasAdmin"] });
    },
  });
}

export function useAddAdmin() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (principalId: string) => {
      if (!actor) throw new Error("Not connected");
      const { Principal } = await import("@dfinity/principal");
      const p = Principal.fromText(principalId);
      // assignCallerUserRole IS in the Candid interface
      await actor.assignCallerUserRole(p, { admin: null } as any);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["isAdmin"] });
    },
  });
}

export function useRemoveAdmin() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (principalId: string) => {
      if (!actor) throw new Error("Not connected");
      const { Principal } = await import("@dfinity/principal");
      const p = Principal.fromText(principalId);
      // Demote the target principal back to regular user
      await actor.assignCallerUserRole(p, { user: null } as any);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["isAdmin"] });
    },
  });
}
