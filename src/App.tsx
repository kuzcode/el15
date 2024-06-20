import { Routes, Route } from "react-router-dom";

import {
  Home,
  Saved,
  CreatePost,
  EditPost,
  PostDetails,
} from "@/_root/pages";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Saved />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
