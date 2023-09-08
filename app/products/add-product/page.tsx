import AddWineForm from "@/components/form/AddWineForm";
import { WinesProps } from "@/types";
import Image from "next/image";

export default async function AddProduct() {
  return (
    <div>
      <AddWineForm />
    </div>
  );
}
