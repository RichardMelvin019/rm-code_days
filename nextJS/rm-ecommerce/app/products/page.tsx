"use client";

import axios from "axios";
import { useEffect, useState, FormEvent } from "react";

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

interface Category {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[] | []>([]);
  const [categories, setCategories] = useState<Category[] | []>([]);

  // pagination info
  const [count, setCount] = useState<number>(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);

  const [itemsBrowsed, setItemsBrowsed] = useState<number>(0);

  const [showForm, setShowForm] = useState<boolean>(false);

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // base url
  const baseUrl = "https://ecommerce-api.netrobase.dev/api/";

  const getProducts = async (
    url?: string | null,
    previous?: boolean | undefined,
    next?: boolean | undefined
  ) => {
    try {
      // set loading state
      setIsLoading(true);

      let fetchUrl = null;

      if (url) {
        fetchUrl = url;
      } else {
        fetchUrl = "https://ecommerce-api.netrobase.dev/api/products/";
      }

      // make the api request
      const response = await axios.get(fetchUrl);
      setCount(response?.data?.count);
      setNext(response?.data?.next);
      setPrevious(response?.data?.previous);
      const results = response?.data?.results;
      setProducts(results);
      if (previous) setItemsBrowsed((prevCount) => prevCount - results.length);
      else if (next) setItemsBrowsed((prevCount) => prevCount + results.length);
      else setItemsBrowsed(results.length);
    } catch (error: any) {
      console.error("Error fetching products:", error?.message);
    } finally {
      // set loading state to false
      setIsLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}categories/`);
      setCategories(response?.data?.results);
    } catch (error: any) {
      console.error("Error fetching products:", error?.message);
    }
  };

  const postproducts = async (event: FormEvent<HTMLFormElement>) => {
    try {
      const newForm = new FormData(event.currentTarget);
      console.log("Posting data");

      const newProduct = {
        name: name,
        description: description,
        price: price,
        discount_price: newForm.get("discount_price"),
        categories: newForm.get("categories"),
      };

      const response = await axios.post(`${baseUrl}products/`, newProduct);

      console.log("Created data", response.data);

      await getProducts();
    } catch (error: any) {
      console.error("Error posting products:", error?.message);
    }
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="flex flex-col items-center justify-center space-y-2 p-2 m-2">
      <span className="flex flex-row items-center space-x-2">
        <p className="font-bold text-lg underline underline-offset-4 text-blue-500">
          Products:
        </p>
        <button onClick={toggleShowForm}>Add Product</button>
      </span>
      {products ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 m-2 p-2 gap-4">
            {products.map((product) => (
              <button
                onClick={() => {
                  if (
                    confirm(
                      `Are you sure you want to add this product - ${product.name} to cart?`
                    )
                  ) {
                    alert(`${product.name} successfully added to cart!!!`);
                  }
                }}
                key={product.id}
                className="bg-gray-500 rounded-lg flex flex-col items-center space-y-2 py-2 hover:animate-pulse"
              >
                <h1 className="capitalize italic underline underline-offset-4">
                  {product.name}
                </h1>
                <p>Product ID: {product.id}</p>
                <img
                  src={product.product_images[0]}
                  alt={product.name}
                  className="rounded-lg"
                />
                <p>Description: {product.description}</p>
                <span className="flex flex-row items-center space-x-2">
                  <p className="animate-bounce">New Price: {product.price}</p>
                  <p>
                    Old Price:{" "}
                    <span className="line-through">
                      {product.discount_price}
                    </span>
                  </p>
                </span>
              </button>
            ))}
          </div>

          {/* pagination */}
          {products && products.length > 0 && (
            <div className="sticky bottom-0 flex flex-col items-center justify-center space-y-2 bg-slate-500 rounded-lg shadow-lg p-1">
              <span className="text-center">
                No of items: {itemsBrowsed} out of {count}
              </span>
              <span className="flex flex-row items-center justify-center space-x-2">
                <button
                  onClick={() => getProducts()}
                  className="border border-blue-700 hover:bg-blue-700 rounded-lg p-1"
                >
                  First
                </button>
                <button
                  disabled={!previous}
                  onClick={() => getProducts(previous, true, false)}
                  className="border border-blue-700 hover:bg-blue-700 rounded-lg p-1 disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  disabled={!next}
                  onClick={() => getProducts(next, false, true)}
                  className="border border-blue-700 hover:bg-blue-700 rounded-lg p-1 disabled:hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </span>
            </div>
          )}
        </>
      ) : (
        <p>No Product yet. Fetching ...</p>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center">
          <form
            onSubmit={postproducts}
            className="flex flex-col justify-center bg-gray-500 rounded-lg space-y-2 p-4 m-4 w-fit"
          >
            <button type="button" onClick={toggleShowForm} className="ml-auto">
              Close
            </button>
            <label
              htmlFor="Name"
              className="flex flex-row items-center space-x-5"
            >
              <span>Name:</span>
              <input
                id="name"
                type="text"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg bg-gray-900"
              />
            </label>
            <label
              htmlFor="Description"
              className="flex flex-row items-center space-x-5"
            >
              <span>Description:</span>
              <textarea
                id="description"
                value={description || ""}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg bg-gray-900"
              />
            </label>
            <label
              htmlFor="Price"
              className="flex flex-row items-center space-x-5"
            >
              <span>Price:</span>
              <input
                id="price"
                type="number"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="rounded-lg bg-gray-900"
              />
            </label>
            <label
              htmlFor="Discount price"
              className="flex flex-row items-center space-x-5"
            >
              <span>Discount price:</span>
              <input
                id="discount_price"
                name="discount_price"
                type="number"
                className="rounded-lg bg-gray-900"
              />
            </label>
            <select
              id="categories"
              name="categories"
              required={true}
              className="bg-gray-900 rounded-lg"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="text-center hover:underline hover:underline-offset-4"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center space-y-2 bg-black/50 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 animate-spin"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
            <span className="text-lg">Loading...</span>
          </svg>
        </div>
      )}
    </div>
  );
};

export default Products;
