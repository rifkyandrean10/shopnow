"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AddProductModal() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: "",
  });

  async function handleSubmit() {
    await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify(form),
    });

    location.reload();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-xl bg-black px-5 py-3 text-white">
          Add Product
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            New Product
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            placeholder="Name"
            className="w-full rounded-xl border p-3"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />

          <input
            placeholder="Category"
            className="w-full rounded-xl border p-3"
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          />

          <input
            placeholder="Price"
            className="w-full rounded-xl border p-3"
            onChange={(e) =>
              setForm({
                ...form,
                price: e.target.value,
              })
            }
          />

          <button
            onClick={handleSubmit}
            className="w-full rounded-xl bg-black py-3 text-white"
          >
            Save Product
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}