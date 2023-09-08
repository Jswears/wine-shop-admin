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
import { WinesProps } from "@/types";
import { useState } from "react";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  desc: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  vintage: z.coerce.number().min(1900).max(2021),
  winery: z.string().min(2, {
    message: "Winery must be at least 2 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  image: z.string().url({
    message: "Image must be a valid URL.",
  }),
});

export default function AddWineForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5005/api/new-wine",
        values
      );
      if (response.status === 201) {
        window.location.assign(`/products/all-products`);
      }
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
                <Input placeholder="Fume Blanc..." {...field} />
              </FormControl>
              <FormDescription>Add the wine&apos;s name</FormDescription>
              <FormMessage />
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
                <Input type="number" placeholder="22.00$" {...field} />
              </FormControl>
              <FormDescription>Add the wine&apos;s name</FormDescription>
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
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>Add a description</FormDescription>
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
  );
}
