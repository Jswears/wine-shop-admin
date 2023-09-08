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
import { oneWineProps } from "@/types";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .optional(),
  price: z.coerce
    .number()
    .positive({
      message: "Price must be a positive number.",
    })
    .optional(),
  desc: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .optional(),
  vintage: z.coerce.number().min(1900).max(2021).optional(),
  winery: z
    .string()
    .min(2, {
      message: "Winery must be at least 2 characters.",
    })
    .optional(),
  country: z
    .string()
    .min(2, {
      message: "Country must be at least 2 characters.",
    })
    .optional(),
  image: z
    .string()
    .url({
      message: "Image must be a valid URL.",
    })
    .optional(),
});

export default function EditWineForm({ oneWine }: oneWineProps) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(oneWine?.name);
  const [price, setPrice] = useState(oneWine?.price);
  const [desc, setDesc] = useState(oneWine?.desc);
  const [vintage, setVintage] = useState(oneWine?.vintage);
  const [winery, setWinery] = useState(oneWine?.winery);
  const [country, setCountry] = useState(oneWine?.country);
  const [image, setImage] = useState(oneWine?.image);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const body = { name, price, desc, vintage, winery, country, image };
      const response = await axios.patch(
        `http://localhost:5005/api/wines/${oneWine._id}`,
        body
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
          name="vintage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vintage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={vintage}
                  onChange={(e) => setVintage(parseInt(e.target.value))}
                />
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

        <Button type="submit">Edit Wine</Button>
      </form>
    </Form>
  );
}
