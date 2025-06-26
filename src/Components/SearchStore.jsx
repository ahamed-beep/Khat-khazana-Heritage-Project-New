import { create } from 'zustand';

export const useSearchStore = create((set) => ({
  searchTerm: '',
  isSearching: false,
  searchResults: {
    products: [],
    letters: [],
    photos: []
  },
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIsSearching: (value) => set({ isSearching: value }),
  setSearchResults: (results) => set({ searchResults: results }),
}));
