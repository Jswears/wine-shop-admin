"use client";
import { WinesProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button } from "./ui/button";

const WineCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [wines, setWines] = useState<WinesProps[]>([]);

  const getWines = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5005/api/wines");
      setWines(response.data);
    } catch (error) {
      toast.error("Error fetching wines");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWine = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await axios.delete(
        `http://localhost:5005/api/wines/${id}`
      );
      toast.success("Wine deleted");
      setWines((prevWines) => prevWines.filter((wine) => wine._id !== id));
    } catch (error) {
      toast.error("Error fetching wines");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getWines();
  }, []);

  return (
    <div className="grid  lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-6 mt-20">
      {wines.map((wine) => (
        <div className="box w-64" key={wine._id}>
          <div className="content flex flex-col justify-cente items-center">
            <div className="product-image bg-slate-100 w-64">
              <Image
                className="m-auto object-contain"
                src="/2020-Santa-Cruz-de-Coya-RH5220.png"
                alt={wine.name}
                width={800}
                height={1300}
                style={{ height: "310px", width: "190px" }}
              ></Image>
            </div>

            <h2 className="product-name text-center">
              {`${wine.vintage} ${wine.name}`}
            </h2>
            <p>{wine.price}$</p>
          </div>
          <div className="flex justify-center gap-2">
            <Button variant={"secondary"} size="sm">
              <Link href={`/products/all-products/${wine._id}`}>View</Link>
            </Button>
            <Button
              variant={"destructive"}
              size="sm"
              onClick={() => deleteWine(wine._id)}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WineCard;
