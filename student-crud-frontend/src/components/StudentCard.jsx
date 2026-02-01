import React, { useEffect, useState } from "react";
import api from "../api/client";

const StudentCard = () => {
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  // for edit model/form
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.log(error);
      alert("Error while fetching students");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) =>{
    const confirm = window.confirm("are you sure you want to delete this student?");
    if(!confirm) return;
    try {
        await api.delete(`/students/${id}`);
        setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (error) {
        console.log(error);
        alert("Error deleting student");
    };
  }

  return (
    <div>
      <div className="bg-green-500 px-4 py-2 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-2">Student Card</h2>
        <p>This is a placeholder for the Student Card component.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
        {/* Add student details here */}
        {students.map((student, index) => (
          <div
            key={index}
            className="flex items-start gap-4 bg-white shadow-md p-4 rounded-lg border"
          >
            <div className="flex items-start gap-4">
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  student.name || "Student"
                )}&background=random`}
              alt=""
            />
            </div>

            {/*Student info*/}
            <div>
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <p className="text-sm text-gray-600">Age: {student.age}</p>
              <p className="text-sm text-gray-600">Course: {student.course}</p>
              <p className="text-sm text-gray-600">Email: {student.email}</p>
            </div>
            {/* Right side Buttons */}
            <div className="flex-gap-2">
                <button className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(student._id)} className="px-3 py-1 rounded-md bg-red-600 text-white text-sm hover:bg-red-700">Delete</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCard;
