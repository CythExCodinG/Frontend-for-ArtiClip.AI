import { useGSAP } from "@gsap/react";
import { useState } from "react";
import gsap from "gsap";

const Login = () => {

  useGSAP(() => {
    gsap.from(".form-div", {
      opacity: 0,
      width: 0,
      duration: 0.8,
      ease: "power3.out",
      y: 100,
    });
  }, []);

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://booklet-ai.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        alert("Login successful");
        window.location.href = "/";
      } else {
        alert(data.message || "Login failed");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };


  return (
    <div className="formcontainer min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="form-div bg-slate-950 p-8 rounded-xl shadow-lg md:w-1/4 w-80 flex flex-col gap-5"
      >
        <h2 className="text-2xl font-semibold text-white text-center">
          Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="px-4 py-2 rounded-md bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="px-4 py-2 rounded-md bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md font-medium"
        >

          Login
        </button>
        <div className="font-bold text-lg text-white text-center">
          <span>If new </span>
          <a className="text-blue-600 hover:underline" href="/register">click here !</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
