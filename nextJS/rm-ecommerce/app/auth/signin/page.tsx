"use client";

import { signIn } from "@/auth";
import { useSession } from "next-auth/react";
import { useEffect, useState, FormEvent } from "react";
import axios from "axios";
import DefaultLoader, { SubmissionLoader } from "@/components/loaders";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  // Retrieve user session and status
  const { data: session, status } = useSession();

  // Use Router
  const router = useRouter();

  // Loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // base URL
    const baseUrl = "https://ecommerce-api.netrobase.dev/api/";

    const signinValues = {
      username: username,
      password: password,
    };

    try {
      setIsSubmitting(true); // Set loading state to true when submission starts

      // Set API Endpoint
      const userSignInEndpoint = `${baseUrl}auth/login/`;
      await axios.post(userSignInEndpoint, signinValues);

      // If user sign in is successful, redirect to dashboard
      await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
    } catch (error: any) {
      console.error("Error signing in:", error?.message);
    } finally {
      setIsSubmitting(false); // Set loading state to false when submission finishes (success or failure)
    }
  };

  // Redirect to dashboard if session exists and is authenticated
  useEffect(() => {
    if (session && status === "authenticated") {
      router.push("/app");
    }
  }, [session, status, router]);

  // Loading state
  if (status === "loading") {
    return <DefaultLoader />; // Render default skeleton loader while loading
  }

  if (session) {
    return null;
  } else {
    return (
      <div className="flex flex-wrap-reverse items-center md:flex md:flex-row md:items-start sm:flex sm:flex-wrap-reverse sm:items-start">
        <div className="bg-slate-200 text-black m-3 p-8 rounded-3xl md:m-0 md:rounded-l-none md:h-screen sm:m-0 sm:rounded-l-none sm:h-screen shadow-md h-fit">
          <Link
            href="/"
            className="left-0 text-white text-lg hover:text-amber-500"
          >
            Back 🏠
          </Link>
          <h1 className="text-3xl text-center font-bold mb-3 text-black">
            Sign In
          </h1>
          <p className="text-center text-sm mb-3">
            Hey 👋, it's{" "}
            <span className="animate-pulse text-teal-700 text-lg font-mono">
              Richard's Fashion Hub 🤗
            </span>{" "}
            <br />
            Quality is our signature
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-black capitalize">
              Username
              <input
                id="username"
                name="username"
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
              />
            </label>
            <label className="block text-sm font-medium text-black capitalize">
              Password
              <input
                id="password"
                name="password"
                type="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-black mt-1"
              />
            </label>
            <button
              onClick={() => signIn(undefined, { callbackUrl: "/app" })}
              type="submit"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-500 font-bold focus:outline-none focus:ring focus:ring-white"
            >
              Sign In
            </button>
          </form>
          <p className="text-black text-center mt-4">
            Don't have an account yet?
          </p>
          <Link href="/signup" className="bg-neutral-500 rounded-lg text-white w-full py-2 px-4 mt-2 hover:bg-teal-500 font-bold focus:outline-none focus:ring focus:ring-white">
            Sign Up
          </Link>
          {isSubmitting && <SubmissionLoader />}
        </div>
      </div>
    );
  }
};

export default SignIn;
