import React, { useEffect, useState } from "react";
import api from "../api/client";

const StudentCard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // For edit modal/form
  const [editing, setEditing] = useState(null); // holds student object
  const [form, setForm] = useState({ name: "", age: "", course: "", email: "" });

  useEffect(() => {
    fetchStudents();
    // ✅ only once
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete student
  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this student?");
    if (!ok) return;

    try {
      await api.delete(`/students/${id}`); // adjust if your route differs
      setStudents((prev) => prev.filter((s) => s._id !== id)); // instant UI update
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  // ✅ Start edit
  const handleEditOpen = (student) => {
    setEditing(student);
    setForm({
      name: student.name || "",
      age: student.age ?? "",
      course: student.course || "",
      email: student.email || "",
    });
  };

  // ✅ Save edit
  const handleEditSave = async () => {
    if (!editing?._id) return;

    try {
      const payload = { ...form, age: Number(form.age) };
      const res = await api.put(`/students/${editing._id}`, payload); // adjust route if needed

      // Update UI list (use returned student if your backend returns it)
      const updatedStudent = res.data?.student || { ...editing, ...payload };

      setStudents((prev) =>
        prev.map((s) => (s._id === editing._id ? updatedStudent : s))
      );

      setEditing(null); // close modal
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-6">
      <div className="bg-green-500 px-4 py-2 rounded-lg text-white mb-6">
        <h2 className="text-xl font-bold">Student Cards</h2>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}

      {/* Cards */}
      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student._id}
            className="flex items-start justify-between gap-4 bg-white shadow-md p-4 rounded-lg border"
          >
            {/* Left side (image + info) */}
            <div className="flex items-start gap-4">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  student.name || "Student"
                )}&background=random`}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
              />

              <div>
                <h3 className="text-lg font-semibold">{student.name}</h3>
                <p className="text-sm text-gray-600">Age: {student.age}</p>
                <p className="text-sm text-gray-600">Course: {student.course}</p>
                <p className="text-sm text-gray-600">Email: {student.email}</p>
              </div>
            </div>

            {/* Right side (buttons) */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEditOpen(student)}
                className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(student._id)}
                className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Simple Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-lg p-5 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Student</h3>

            <div className="space-y-3">
              <input
                className="w-full border rounded-md px-3 py-2"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              />
              <input
                className="w-full border rounded-md px-3 py-2"
                placeholder="Age"
                type="number"
                value={form.age}
                onChange={(e) => setForm((p) => ({ ...p, age: e.target.value }))}
              />
              <input
                className="w-full border rounded-md px-3 py-2"
                placeholder="Course"
                value={form.course}
                onChange={(e) =>
                  setForm((p) => ({ ...p, course: e.target.value }))
                }
              />
              <input
                className="w-full border rounded-md px-3 py-2"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm((p) => ({ ...p, email: e.target.value }))
                }
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setEditing(null)}
                className="px-3 py-2 rounded-md border"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-3 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCard;
