import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ToolCategory {
    id: string;
    tools: Array<string>;
    categoryName: string;
    order: bigint;
}
export interface JobRole {
    id: string;
    title: string;
    responsibilities: Array<string>;
    achievements: Array<string>;
    dateRange: string;
}
export interface HowIThinkItem {
    id: string;
    content: string;
    order: bigint;
}
export interface WorkCard {
    id: string;
    title: string;
    order: bigint;
    description: string;
}
export interface WorkExperience {
    id: string;
    order: bigint;
    logoBlobId?: string;
    companyName: string;
    roles: Array<JobRole>;
}
export interface Project {
    id: string;
    title: string;
    tools: string;
    oneLiner: string;
    order: bigint;
    thumbnailBlobId?: string;
    role: string;
    description: string;
    youtubeUrl?: string;
}
export interface Curiosity {
    id: string;
    content: string;
    order: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCuriosity(curiosity: Curiosity): Promise<void>;
    createHowIThinkItem(item: HowIThinkItem): Promise<void>;
    createPersonalProject(project: Project): Promise<void>;
    createProfessionalProject(project: Project): Promise<void>;
    createToolCategory(category: ToolCategory): Promise<void>;
    createWorkCard(card: WorkCard): Promise<void>;
    createWorkExperience(experience: WorkExperience): Promise<void>;
    deleteCuriosity(id: string): Promise<void>;
    deleteHowIThinkItem(id: string): Promise<void>;
    deletePersonalProject(id: string): Promise<void>;
    deleteProfessionalProject(id: string): Promise<void>;
    deleteToolCategory(id: string): Promise<void>;
    deleteWorkCard(id: string): Promise<void>;
    deleteWorkExperience(id: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCuriosities(): Promise<Array<Curiosity>>;
    getCuriosity(id: string): Promise<Curiosity | null>;
    getHowIThinkItem(id: string): Promise<HowIThinkItem | null>;
    getHowIThinkItems(): Promise<Array<HowIThinkItem>>;
    getPersonalProject(id: string): Promise<Project | null>;
    getPersonalProjects(): Promise<Array<Project>>;
    getProfessionalProject(id: string): Promise<Project | null>;
    getProfessionalProjects(): Promise<Array<Project>>;
    getToolCategories(): Promise<Array<ToolCategory>>;
    getToolCategory(id: string): Promise<ToolCategory | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWorkCard(id: string): Promise<WorkCard | null>;
    getWorkCards(): Promise<Array<WorkCard>>;
    getWorkExperience(id: string): Promise<WorkExperience | null>;
    getWorkExperiences(): Promise<Array<WorkExperience>>;
    hasAdmin(): Promise<boolean>;
    claimFirstAdmin(): Promise<boolean>;
    addAdmin(newAdmin: Principal): Promise<void>;
    removeAdmin(target: Principal): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    reorderCuriosities(newOrder: Array<string>): Promise<void>;
    reorderHowIThinkItems(newOrder: Array<string>): Promise<void>;
    reorderPersonalProjects(newOrder: Array<string>): Promise<void>;
    reorderProfessionalProjects(newOrder: Array<string>): Promise<void>;
    reorderToolCategories(newOrder: Array<string>): Promise<void>;
    reorderWorkCards(newOrder: Array<string>): Promise<void>;
    reorderWorkExperiences(newOrder: Array<string>): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateCuriosity(curiosity: Curiosity): Promise<void>;
    updateHowIThinkItem(item: HowIThinkItem): Promise<void>;
    updatePersonalProject(project: Project): Promise<void>;
    updateProfessionalProject(project: Project): Promise<void>;
    updateToolCategory(category: ToolCategory): Promise<void>;
    updateWorkCard(card: WorkCard): Promise<void>;
    updateWorkExperience(experience: WorkExperience): Promise<void>;
}
