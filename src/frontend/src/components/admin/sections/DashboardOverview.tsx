import {
  useCuriosities,
  useHowIThinkItems,
  usePersonalProjects,
  useProfessionalProjects,
  useToolCategories,
  useWorkCards,
  useWorkExperiences,
} from "../../../hooks/useQueries";

export default function DashboardOverview() {
  const { data: profProjects } = useProfessionalProjects();
  const { data: persProjects } = usePersonalProjects();
  const { data: workExp } = useWorkExperiences();
  const { data: tools } = useToolCategories();
  const { data: workCards } = useWorkCards();
  const { data: howIThink } = useHowIThinkItems();
  const { data: curiosities } = useCuriosities();

  const stats = [
    { label: "Professional Projects", value: profProjects?.length ?? 0 },
    { label: "Personal Projects", value: persProjects?.length ?? 0 },
    { label: "Work Experiences", value: workExp?.length ?? 0 },
    { label: "Tool Categories", value: tools?.length ?? 0 },
    { label: "Work Cards", value: workCards?.length ?? 0 },
    { label: "How I Think Items", value: howIThink?.length ?? 0 },
    { label: "Curiosities", value: curiosities?.length ?? 0 },
  ];

  return (
    <div data-ocid="admin.dashboard.panel">
      <div className="mb-8">
        <h1 className="text-xl font-light text-white/90 tracking-wide mb-1">
          Overview
        </h1>
        <p className="text-sm text-white/35 font-light">
          Content summary across all sections
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-5 rounded-lg border border-white/6 bg-white/3"
          >
            <p className="text-2xl font-light text-white/80 mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-white/35 font-light tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-5 rounded-lg border border-white/6 bg-white/2">
        <p className="text-sm font-light text-white/50 tracking-wide mb-2">
          Getting Started
        </p>
        <p className="text-sm text-white/30 font-light leading-relaxed">
          Use the sidebar to navigate between sections. Each section lets you
          add, edit, and delete content that appears on your public portfolio.
          Changes are saved to the backend and reflected on the live site
          immediately.
        </p>
      </div>
    </div>
  );
}
