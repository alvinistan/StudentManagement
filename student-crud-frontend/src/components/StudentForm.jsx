import React from "react";
import { useState } from "react";
import client from "../api/client";

const StudentForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
  });

  const [saving, setServing] = useState(false);
  const [error, setError] = useState("");
   const [success, setSuccess] = useState(""); // ✅ NEW

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
        setServing(true);

        const payload = { ...form, age: Number(form.age) };

        const res = await client.post("/Students",payload);

        setSuccess(res.data.message);
        const created = res.data.student || res.data;
        onCreated?.(created);
        setForm({
            name: "",
            age: "",
            course: "",
            email: "",
        });
        setServing(false);
    } catch (error) {
        setError(error.message);
        setServing(false);
    }
  }

  return (
    <section className="rounded-2xl bg-white p-5 shadow">
      <h2 className="text-2xl font-semibold text-gray-800">Add Student</h2>

    {
        success && <p className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-green-700">
            {success}
        </p>
    }
        
      {
        error && <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700">{error}</p>
      }
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
        
        
        <input
          type="text"
          name="name"
          className="rounded-xl border p-3 outline-none focus:ring"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          className="rounded-xl border p-3 outline-none focus:ring"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
        />
        <input
          type="text"
          className="rounded-xl border p-3 outline-none focus:ring"
          name="course"
          placeholder="Course"
          value={form.course}
          onChange={handleChange}
        />
        <input
          type="email"
          className="rounded-xl border p-3 outline-none focus:ring"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <button disabled={saving} type="submit" className="rounded-xl bg-blue-500 px-4 py-3 font-semibold disabled:opacity-55 md:col-span-2 text-white hover:bg-blue-600 focus:ring ">
          {saving ? "Saving..." : "Save Student"}
        </button>
      </form>
    </section>
  );
};

export default StudentForm;
