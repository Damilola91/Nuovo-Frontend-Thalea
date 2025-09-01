"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducer/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await dispatch(loginUser({ email, password })).unwrap();
      toast.success("Login riuscito!");

      // 🔹 Redirect in base al ruolo
      if (user.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error(error || "Credenziali non valide");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-[#f3f1e7] px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#46331d] drop-shadow-sm">
            Accedi al tuo account
          </h2>

          <div className="mb-4 text-left">
            <label className="block mb-1 font-medium text-[#46331d]">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46331d]/70 text-sm sm:text-base"
              placeholder="Inserisci la tua email"
            />
          </div>

          <div className="mb-6 text-left">
            <label className="block mb-1 font-medium text-[#46331d]">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#46331d]/70 text-sm sm:text-base"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#46331d] text-white py-2 rounded-xl font-semibold hover:opacity-90 transition text-sm sm:text-base"
          >
            Login
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
