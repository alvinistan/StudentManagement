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
  }, [students]);
  return (
    <div>
        <div className="bg-green-500 px-4 py-2 rounded-lg text-white" >
      <h2 className="text-xl font-bold mb-2">Student Card</h2>
      <p>This is a placeholder for the Student Card component.</p>
      </div>
      <div>
        {/* Add student details here */}
        {students.map((student, index) => (
          <div key={index} >
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentCard;
