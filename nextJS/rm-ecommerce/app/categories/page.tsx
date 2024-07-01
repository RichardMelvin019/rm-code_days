"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Categories {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  image_url: string;
}

interface Product {
  id: number;
  product_images: string[];
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  discount_price: string;
  category: number;
  subcategory: null;
  tags: [];
}

const Categories = () => {
  const [categories, setCategories] = useState<Categories[] | []>([]);

  // base URL
  const baseUrl = "https://ecommerce-api.netrobase.dev/api/";
  const getCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}categories/`);
      setCategories(response?.data?.results);
    } catch (error: any) {
      console.error("Error fetching categories:", error?.message);
    }
  };

  const [products, setProducts] = useState<Product[] | []>([]);

  // fetch products
  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseUrl}products/`);
      setProducts(response?.data?.results);
    } catch (error: any) {
      console.error("Error fetching products:", error?.message);
    }
  };

  // function to get products under each category

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  return (
    <div className="items-center space-y-2 font-serif capitalize">
      <p className="font-bold text-lg underline underline-offset-4 text-teal-500 text-center m-5">
        Categories:
      </p>
      {categories ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-2 m-2 gap-4">
          {categories.map((category) => {
            return (
              <button
                key={category.id}
                className="flex flex-col items-center space-y-2 py-2 bg-teal-500 rounded-lg text-black"
              >
                <h1>{category.name}</h1>
                <div>
                  <img
                    className="size-60 rounded-lg hover:animate-pulse"
                    src={category.image_url}
                    alt={category.name}
                  />
                </div>
                <p className="text-center animate-pulse">
                  {category.description}
                </p>
              </button>
            );
          })}
        </div>
      ) : (
        <p>No Category yet. Fetching ...</p>
      )}
      <div></div>
    </div>
  );
};

export default Categories;
