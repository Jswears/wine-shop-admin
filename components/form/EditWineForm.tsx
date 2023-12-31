"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { WinesProps} from "@/types";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters, for example Fume Blanc.",
    })
    .optional(),
  category: z
    .string({
      required_error: "Please select a category.",
    })
    .optional(),
  price: z.coerce
    .number()
    .positive({
      message: "Price must be a positive number.",
    })
    .optional(),
  stock: z.coerce
    .number()
    .positive({
      message: "Stock must be a positive number.",
    })
    .optional(),
  country: z
    .string()
    .min(2, {
      message: "Country must be at least 2 characters, for example: Austria.",
    })
    .optional(),
  region: z
    .string()
    .min(2, {
      message: "Region must be at least 2 characters, for example: Styria.",
    })
    .optional(),
  winery: z.string().min(2, {
    message: "Winery must be at least 2 characters, for example Tement.",
  }),
  grape: z
    .string()
    .min(2, {
      message: "Grape must be at least 2 characters, for example: Chardonnay.",
    })
    .optional(),
  vintage: z.coerce.number().min(1900).max(2021).optional(),
  desc: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .optional(),
  image: z.any().optional(),
});

export default function EditWineForm({ oneWine }: {oneWine: WinesProps}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(oneWine?.name);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(oneWine?.price);
  const [stock, setStock] = useState(oneWine.stock);
  const [country, setCountry] = useState(oneWine?.country);
  const [region, setRegion] = useState(oneWine?.region);
  const [winery, setWinery] = useState(oneWine?.winery);
  const [grape, setGrape] = useState(oneWine?.grape);
  const [vintage, setVintage] = useState(oneWine?.vintage);
  const [desc, setDesc] = useState(oneWine?.desc);
  const [image, setImage] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleFileUpload = async (e: any) => {
    try {
      setImage(e.target.files[0]);
    } catch (err) {
      console.log("Error while uploading the file: ", err);
    }
  };

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price.toString());
      formData.append("stock", stock.toString());
      formData.append("country", country);
      formData.append("region", region);
      formData.append("winery", winery);
      formData.append("grape", grape);
      formData.append("vintage", vintage.toString());
      formData.append("image", image);
      formData.append("desc", desc);

      const response = await axios.patch(
        `http://localhost:5005/api/wines/${oneWine._id}`,
        formData
      );
      window.location.assign(`/products/all-products`);
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormDescription>Add the wine&apos;s name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Red">Red</SelectItem>
                  <SelectItem value="White">White</SelectItem>
                  <SelectItem value="Rosé">Rosé</SelectItem>
                  <SelectItem value="Sparkling">Sparkling</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={price}
                  onChange={(e) => setPrice(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Add the wine&apos;s name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="10"
                  {...field}
                  value={stock}
                  onChange={(e) => setStock(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>Add the wine&apos;s name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </FormControl>
              <FormDescription>Add the country</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input
                  placeholder="Styria..."
                  {...field}
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                />
              </FormControl>
              <FormDescription>Add the region</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="winery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Winery</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={winery}
                  onChange={(e) => setWinery(e.target.value)}
                />
              </FormControl>
              <FormDescription>Add the winery</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="grape"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grape</FormLabel>
              <FormControl>
                <Input
                  placeholder="Chardonnay..."
                  {...field}
                  value={grape}
                  onChange={(e) => setGrape(e.target.value)}
                />
              </FormControl>
              <FormDescription>Add the grape</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vintage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vintage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={vintage}
                  onChange={(e) => setVintage(e.target.value)}
                />
              </FormControl>
              <FormDescription>Add the vintage</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  id="message"
                  {...field}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </FormControl>
              <FormDescription>Add a description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  id="picture"
                  type="file"
                  placeholder="Upload an image..."
                  {...field}
                  onChange={(e) => handleFileUpload(e)}
                />
              </FormControl>
              <FormDescription>Add and image</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Edit Wine</Button>
      </form>
    </Form>
  );
}
