"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { setHotels } from "@/lib/features/hotel/hotelSlice";
import { loadHotels } from "@/lib/localStorage";
import { Button } from "@/components/ui/button";
import HotelList from "@/components/HotelList";
import CategoryList from "@/components/CategoryList";
import HotelModal from "@/components/HotelModal";
import CategoryModal from "@/components/CategoryModal";
import { Hotel, Category } from "@/types";
import { useGetCountriesQuery } from "@/lib/services/api";

export default function Dashboard() {
  const dispatch = useDispatch();
  const hotels = useSelector((state: RootState) => state.hotels.hotels);
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | undefined>(
    undefined
  );
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const {
    data: countries = [],
    isLoading: isLoadingCountries,
    error: countriesError,
  } = useGetCountriesQuery();

  useEffect(() => {
    const savedHotels = loadHotels();

    dispatch(setHotels(savedHotels));
    // dispatch(setCategories(savedCategories));
  }, [dispatch]);

  const handleAddHotel = () => {
    setSelectedHotel(undefined);
    setIsHotelModalOpen(true);
  };

  const handleEditHotel = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setIsHotelModalOpen(true);
  };

  const handleAddCategory = () => {
    setSelectedCategory(undefined);
    setIsCategoryModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };
  if (isLoadingCountries) {
    return <div>Loading App...</div>;
  }

  if (countriesError) {
    return <div>Error loading App. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8"> Dashboard</h1>
      <div className="grid grid-cols-1  gap-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Hotels</h2>
            <Button onClick={handleAddHotel}>Add Hotel</Button>
          </div>
          <HotelList
            hotels={hotels}
            categories={categories}
            onEdit={handleEditHotel}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Categories</h2>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </div>
          <CategoryList categories={categories} onEdit={handleEditCategory} />
        </div>
      </div>
      <HotelModal
        isOpen={isHotelModalOpen}
        onClose={() => setIsHotelModalOpen(false)}
        categories={categories}
        countries={countries}
        hotel={selectedHotel}
      />
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        category={selectedCategory}
      />
    </div>
  );
}
