"use client";
import { WinesProps } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Toaster, toast } from "react-hot-toast";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/utils/formatCurrency";

const WineCard = ({
  wines,
  deleteWine,
}: {
  wines: WinesProps[];
  deleteWine: (id: string) => void;
}) => {
  return (
    <>
      <Toaster />
      <div className="grid  lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-6 mt-20">
        {wines.map((wine) => (
          <div className="box w-64" key={wine._id}>
            <div className="content flex flex-col justify-cente items-center">
              <div className="product-image bg-slate-100 w-64">
                <Image
                  className="m-auto object-contain"
                  src={wine.image}
                  alt={wine.name}
                  width={800}
                  height={1300}
                  style={{ height: "310px", width: "190px" }}
                ></Image>
              </div>

              <h2 className="product-name text-center">
                {`${wine.vintage} ${wine.name.toLocaleUpperCase()}`}
              </h2>
              <p>{formatCurrency(wine.price)}</p>
            </div>
            <div className="flex justify-center gap-2">
              <Button variant={"secondary"} size="sm">
                <Link href={`/products/all-products/${wine._id}`}>View</Link>
              </Button>

              <Dialog>
                <DialogTrigger>
                  <Button size={"sm"} variant={"destructive"}>
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to delete the wine?
                    </DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete
                      the wine.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant={"destructive"}
                      size={"sm"}
                      onClick={() => deleteWine(wine._id)}
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WineCard;
