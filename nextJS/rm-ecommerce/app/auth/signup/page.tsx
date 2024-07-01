"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { signIn } from "@/auth";
import { useSession } from "next-auth/react";
import axios from "axios";
import DefaultLoader, { SubmissionLoader } from "@/components/loaders";
import Link from "next/link";

const SignUp = () => {
  // Retrieve user session and status
  const { data: session, status } = useSession();

  // Use Router
  const router = useRouter();

  // Loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // base Url
    const baseUrl = "https://ecommerce-api.netrobase.dev/api/";

    const stateValues = {
      password: password,
      username: username,
      first_name: firstName,
      last_name: lastName,
    };

    console.log("State Values", stateValues)

    try {
      setIsSubmitting(true); // Set loading state to true when submission starts
      // Make a POST request to create a new user
      // Set API Endpoint
      const userCreationEndpoint = `${baseUrl}users/`;
      await axios.post(userCreationEndpoint, stateValues);

      // If user creation is successful, sign in the user
      // then redirect to dashboard
      await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
    } catch (error: any) {
      console.error("Error signing up:", error?.message);
    } finally {
      setIsSubmitting(false); // Set loading state to false when submission finishes (success or failure)
    }
  };

  // useEffect to redirect to dashboard if session exists and is authenticated
  useEffect(() => {
    if (session && status === "authenticated") {
      router.push("/app");
    }
  }, [session, status, router]);

  // Loading state
  if (status === "loading") {
    return <DefaultLoader /> // Render default skeleton loader while loading
  }

  // return null when there is session whilst (useEffect) routing to dashboard
  // else return the signin page
  if (session) {
    return null;
  } else {
    return (
      <div className="flex flex-wrap-reverse items-center md:flex md:flex-row md:items-start sm:flex sm:flex-wrap-reverse sm:items-start">
        <div className="bg-slate-200 text-black m-3 p-8 rounded-3xl md:m-0 md:rounded-l-none md:h-screen sm:m-0 sm:rounded-l-none sm:h-screen shadow-md h-fit">
          <Link href="/" className="left-0 text-lg hover:text-teal-400">
            Back 🏠
          </Link>
          <h1 className="text-3xl text-center font-bold mb-3 text-black">
            Sign Up
          </h1>
          <p className="text-center text-sm mb-3">
            Hey 👋, it's{" "}
            <span className="animate-pulse text-teal-700 text-lg font-mono">
              Richard's Fashion Hub 🤗
            </span>{" "}
            Quality is our signature
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label
              className="block text-sm font-medium text-black capitalize"
            >
              First Name
              <input
                id="first_name"
                name="first_name"
                value={firstName || ""}
                onChange={(e) => setfirstName(e.target.value)}
                required
                className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
              />
            </label>
            <label
              className="block text-sm font-medium text-black capitalize"
            >
              Last Name
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
              />
            </label>
            <label
              className="block text-sm font-medium text-black capitalize"
            >
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
            <label
              className="block text-sm font-medium text-black capitalize"
            >
              Password
              <input
                id="password"
                name="password"
                type="password"
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring focus:ring-teal-300 focus:ring-opacity-50"
              />
            </label>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-500 font-bold focus:outline-none focus:ring focus:ring-white"
            >
              Sign Up
            </button>
          </form>
          <p className="text-black text-center mt-4">
            Already have an account?
          </p>
          <button
            onClick={() => signIn(undefined, { callbackUrl: "/app" })}
            className="bg-neutral-500 rounded-lg text-white w-full py-2 px-4 mt-2 hover:bg-teal-500 font-bold focus:outline-none focus:ring focus:ring-white"
          >
            Sign In
          </button>
          {/* Show loader when submitting data */}
          {isSubmitting && <SubmissionLoader />}
        </div>
        <div className="m-auto">
          <h1 className="text-teal-500 m-5 text-center text-2xl sm:text-3xl md:text-3xl font-mono">
            Richard's Fashion Hub 👔⌚
          </h1>
        </div>
      </div>
    );
  }
};

export default SignUp;
