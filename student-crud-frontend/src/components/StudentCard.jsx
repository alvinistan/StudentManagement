import React, { useEffect } from "react";
import api from "../api/client";

const StudentCard = () => {
  const [students, setStudents] = React.useState([]);

  useEffect(() => {
    // Fetch Students from Api
    const fetchStudents = async () => {
      const response = await api.get("/students");
      setStudents(response.data);
    };
    fetchStudents();
  }, []);
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
            <img
              className="w-20 h-20 rounded-full object-cover"
              src={`https://i.pravatar.cc//150?img={Math.floor(Math.random()*5)}`}
              alt=""
            />

            {/*Student info*/}
            <div>
              <h3 className="text-lg font-semibold">{student.name}</h3>
              <p className="text-sm text-gray-600">Age: {student.age}</p>
              <p className="text-sm text-gray-600">Course: {student.course}</p>
              <p className="text-sm text-gray-600">Email: {student.email}</p>
            </div>
            
          </div>
          
          
        ))}
      </div>
    </div>
  );
};

export default StudentCard;
