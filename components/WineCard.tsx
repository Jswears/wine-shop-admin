"use client";
import { WinesProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const WineCard = () => {
  const [loading, setLoading] = useState(false);
  const [wines, setWines] = useState<WinesProps[]>([]);

  const getWines = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5005/api/wines");
      setWines(response.data);
    } catch (error) {
      toast.error("Error fetching wines");
    } finally {
      setLoading(false);
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
              <Link href="/shop/wines">
                <Image
                  className="m-auto object-contain"
                  src="/2020-Santa-Cruz-de-Coya-RH5220.png"
                  alt={wine.name}
                  width={800}
                  height={1300}
                  style={{ height: "310px", width: "190px" }}
                ></Image>
              </Link>
            </div>
            <Link
              href={`/shop/wines/${wine._id}`}
              className="border-b-2 w-full"
            >
              <h2 className="product-name text-center">
                {`${wine.vintage} ${wine.name}`}
              </h2>
            </Link>
            <p>{wine.price}$</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WineCard;
