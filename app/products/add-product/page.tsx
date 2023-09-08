import AddWineForm from "@/components/form/AddWineForm";

export default async function AddProduct() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Add a Wine</h1>
      <AddWineForm />
    </div>
  );
}
