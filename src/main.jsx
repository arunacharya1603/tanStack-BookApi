import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import NavigationHeader from "./components/NavigationHeader.jsx"; // Correct import path
import { homeRoute } from "./components/Home.jsx"; // Correct import path
import { heroRoute } from "./components/Hero.jsx";
import { signUpRoute } from "./components/SignUp.jsx";
import "../src/index.css";
// import App from "./App.jsx";

// Creating the Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

// Create the root route
export const rootRoute = createRootRoute({
  component: NavigationHeader,
});

// Create the router instance
const rootTree = rootRoute.addChildren([homeRoute, heroRoute, signUpRoute]);

const router = createRouter({
  routeTree: rootTree,
});

// Render the app
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        
        <RouterProvider router={router} />
      
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StrictMode>
  );
}
