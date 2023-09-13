"use client";
import WineCard from "@/components/WineCard";
import { ChildWinesProps, WinesProps } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Searchbar from "@/components/Searchbar";
import toast, { Toaster } from "react-hot-toast";

const AllProductsPage = () => {
  const [wines, setWines] = useState<WinesProps[]>([]);
  const [filteredWines, setFilteredWines] = useState<WinesProps[]>([]); // New state for filtered wines

  const getWines = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/wines");
      setWines(response.data);
      setFilteredWines(response.data); // Initialize filtered wines with all wines
    } catch (error) {
      console.error("Error fetching wines");
    }
  };

  useEffect(() => {
    getWines();
  }, []);

  const deleteWine = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5005/api/wines/${id}`
      );
      if (response.status === 200) {
        toast.success("Wine deleted");
        window.location.assign("/products/all-products");
      }
      setWines((prevWines) => prevWines.filter((wine) => wine._id !== id));
    } catch (error) {
      toast.error("Error fetching wines");
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm !== "") {
      const results = wines.filter(
        (wine) =>
          wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          wine.country.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredWines(results);
    } else {
      setFilteredWines([...wines]);
    }
  };

  return (
    <>
    <Toaster/>
      <h1 className="text-2xl font-semibold">Products</h1>
      <Searchbar onSearch={handleSearch} />
      <WineCard wines={filteredWines} deleteWine={deleteWine} />
    </>
  );
};

export default AllProductsPage;
