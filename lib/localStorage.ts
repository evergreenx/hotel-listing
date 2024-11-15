import { Hotel, Category } from '../types';

export const saveHotels = (hotels: Hotel[]) => {
  localStorage.setItem('hotels', JSON.stringify(hotels));
};

export const loadHotels = (): Hotel[] => {
  const hotels = localStorage.getItem('hotels');
  return hotels ? JSON.parse(hotels) : [];
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem('categories', JSON.stringify(categories));
};

export const loadCategories = (): Category[] => {
  const categories = localStorage.getItem('categories');
  return categories ? JSON.parse(categories) : [];
};