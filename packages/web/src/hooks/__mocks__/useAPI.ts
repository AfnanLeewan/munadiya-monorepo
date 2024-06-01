export const useGetAPI = vi.fn(() => ({}))
export const usePutAPI = vi.fn(() => ({
  mutateAsync: vi.fn(() => {}),
}))
export const useDeleteAPI = vi.fn(() => ({
  mutateAsync: vi.fn(() => {}),
}))
