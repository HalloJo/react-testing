import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { feedbackApi } from '../api/client'
import type {
  CreateFeedbackInput,
  Feedback,
  FeedbackFilters,
} from '../features/feedback/types'

export const feedbackKeys = {
  all: ['feedback'] as const,
  lists: () => [...feedbackKeys.all, 'list'] as const,
  list: (filters: FeedbackFilters) =>
    [...feedbackKeys.lists(), filters] as const,
  details: () => [...feedbackKeys.all, 'detail'] as const,
  detail: (id: string) => [...feedbackKeys.details(), id] as const,
}

export function useFeedback(filters: FeedbackFilters) {
  return useQuery({
    queryKey: feedbackKeys.list(filters),
    queryFn: () => feedbackApi.list(filters),
  })
}

export function useFeedbackItem(id: string) {
  return useQuery({
    queryKey: feedbackKeys.detail(id),
    queryFn: () => feedbackApi.get(id),
    enabled: id.length > 0,
  })
}

export function useCreateFeedback() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateFeedbackInput) => feedbackApi.create(input),
    onSuccess: async (feedback: Feedback) => {
      queryClient.setQueryData(feedbackKeys.detail(feedback.id), feedback)
      await queryClient.invalidateQueries({ queryKey: feedbackKeys.lists() })
    },
  })
}
