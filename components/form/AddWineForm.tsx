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
  name: z.string().min(2, {
    message: "Name must be at least 2 characters, for example Fume Blanc.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  stock: z.coerce.number().positive({
    message: "Stock must be a positive number.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters, for example: Austria.",
  }),
  region: z.string().min(2, {
    message: "Region must be at least 2 characters, for example: Styria.",
  }),
  winery: z.string().min(2, {
    message: "Winery must be at least 2 characters, for example Tement.",
  }),
  grape: z.string().min(2, {
    message: "Grape must be at least 2 characters, for example: Chardonnay.",
  }),
  vintage: z.coerce.number().min(1900).max(2021),
  desc: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  image: z.any(),
});

export default function AddWineForm() {
  const [loading, setLoading] = useState(false);
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
      console.log(values);
      console.log(values.stock);
      // Create a new FormData object and append the image and values to it
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("price", values.price.toString());
      formData.append("stock", values.stock.toString());
      formData.append("country", values.country);
      formData.append("region", values.region);
      formData.append("winery", values.winery);
      formData.append("grape", values.grape);
      formData.append("vintage", values.vintage.toString());
      formData.append("desc", values.desc);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5005/api/new-wine",
        formData
      );

      if (response.status === 201) {
        toast.success("Wine added");
        window.location.assign(`/products/all-products`);
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Fume Blanc..." {...field} />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                  <Input type="number" placeholder="22.00" {...field} />
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
                  <Input type="number" placeholder="10" {...field} />
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
                  <Input placeholder="Italy..." {...field} />
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
                  <Input placeholder="Styria..." {...field} />
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
                  <Input placeholder="Tement..." {...field} />
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
                  <Input placeholder="Chardonnay..." {...field} />
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
                  <Input type="number" placeholder="2005..." {...field} />
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
                  <Textarea placeholder="Description" id="message" {...field} />
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

          <Button type="submit">Add Wine</Button>
        </form>
      </Form>
    </>
  );
}
