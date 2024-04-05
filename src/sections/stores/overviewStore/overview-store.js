import { create } from 'zustand';

const overviewStore = create((set) => ({
  totalUsersCount: 0,
  setTotalUsersCount: (count) => set({ totalUsersCount: count }),
  totalCommentsCount: 0,
  setTotalCommentsCount: (count) => set({ totalCommentsCount: count }),
  totalPostsCount: 0,
  setTotalPostsCount: (count) => set({ totalPostsCount: count }),
  totalTodosCount: 0,
  setTotalTodosCount: (count) => set({ totalTodosCount: count }),
  totalAlbumsCount: 0,
  setTotalAlbumsCount: (count) => set({ totalAlbumsCount: count }),
  totalPhotosCount: 0,
  setTotalPhotosCount: (count) => set({ totalPhotosCount: count }),
}));

export default overviewStore;
