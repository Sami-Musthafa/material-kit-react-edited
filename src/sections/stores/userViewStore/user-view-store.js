import { create } from 'zustand';

const userViewStore = create((set) => ({
  isLoading: true,
  page: 0,
  order: 'asc',
  selected: [],
  orderBy: 'name',
  filterName: '',
  rowsPerPage: 5,
  users: [],
  totalUsers: 0,
  setIsLoading: (isLoading) => set({ isLoading }),
  setPage: (page) => set({ page }),
  setOrder: (order) => set({ order }),
  setSelected: (selected) => set({ selected }),
  setOrderBy: (orderBy) => set({ orderBy }),
  setFilterName: (filterName) => set({ filterName }),
  setRowsPerPage: (rowsPerPage) => set({ rowsPerPage }),
  setUsers: (users) => set({ users }),
  setTotalUsers: (totalUsers) => set({ totalUsers }),
}));

export default userViewStore;
