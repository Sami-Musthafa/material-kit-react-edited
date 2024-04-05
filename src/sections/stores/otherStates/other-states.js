import { create } from 'zustand';

const otherStore = create((set) => ({
  showPassword: false,
  setShowPassword: (show) => set({ showPassword: show }),
  postsData: [],
  setPostsData: (data) => set({ postsData: data }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  openFilter: false,
  setOpenFilter: (open) => set({ openFilter: open }),
  photos: [],
  setPhotos: (photo) => set({ photos: photo }),
}));

export default otherStore;
