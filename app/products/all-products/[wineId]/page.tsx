"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import EditWineForm from "@/components/form/EditWineForm";
import { WinesProps} from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WineDetailsPage({
  params,
}: {
  params: { wineId: string };
}) {
  const [oneWine, setOneWine] = useState<WinesProps | undefined>(undefined);

  const getOneWine = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5005/api/wines/${params.wineId}`
      );
      setOneWine(response.data);
    } catch (error) {
      toast.error("Error fetching wine");
    }
  };

  useEffect(() => {
    getOneWine();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.wineId]);

  if (oneWine === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="w-full">
        <h1 className="text-2xl font-semibold">Edit the wine</h1>
        <Button variant={"link"}>
          <Link href={`/products/all-products`}>Go back to the wines</Link>{" "}
        </Button>
        <Image
          src={oneWine.image}
          alt="wine"
          width={800}
          height={1300}
          className="w-80 border bg-slate-50 rounded-md m-auto"
        />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <EditWineForm oneWine={oneWine} />
      </div>
    </>
  );
}
