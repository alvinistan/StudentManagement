import React, { useEffect, useState } from "react";
import api from "../api/client";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch student data from backend API
    const fetchStudents = async () => {
      const response = await api.get("/students");
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-4 font-bold">Student List</h2>
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-500 text-white">
                <tr>
                    <th className="px-4 py-4 text-left">Name</th>
                    <th className="px-4 py-4 text-left">Age</th>
                    <th className="px-4 py-4 text-left">Course</th>
                    <th className="px-4 py-4 text-left">Email</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student,index) => (
                    <tr key={student._id} className={`border-t ${index % 2 === 0 ? 'bg-green-100' : 'bg-white'} hover:bg-gray-100 transition cursor-pointer`}>
                        <td className="px-4 py-2 text-left">{student.name}</td>
                        <td className="px-4 py-2 text-left">{student.age}</td>
                        <td className="px-4 py-2 text-left">{student.course}</td>
                        <td className="px-4 py-2 text-left">{student.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default StudentList;
