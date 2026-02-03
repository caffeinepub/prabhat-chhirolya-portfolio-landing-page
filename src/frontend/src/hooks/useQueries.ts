import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// Placeholder for future backend queries
// Currently no backend data is needed for the landing page

export function useExample() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      if (!actor) return null;
      // Add backend calls here when needed
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}
