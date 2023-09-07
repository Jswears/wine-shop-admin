import AddWineForm from "@/components/form/AddWineForm";
import { WinesProps } from "@/types";
import Image from "next/image";

const getWines = async (): Promise<WinesProps[]> => {
  const response = await fetch("http://localhost:5005/api/wines");
  return response.json();
};

export default async function Products() {
  const wines = await getWines();
  console.log(wines);
  return (
    <div className="h-full">
      <AddWineForm />
      {/* <h1 className="text-2xl font-semibold">Products</h1>
      {!wines
        ? "Loading..."
        : wines.map((wine) => (
            <div key={wine._id}>
              <p>{wine.name}</p>
            </div>
          ))} */}
    </div>
  );
}
