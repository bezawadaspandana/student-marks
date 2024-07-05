import React, { useState } from 'react';
import axios from 'axios';
const FetchStudentMarks = () => {
  const [student_Id, setStudent_Id] = useState('');
  const [marks, setMarks] = useState(null);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    setStudent_Id(e.target.value);
    setError(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:9000/students/${student_Id}/marks`);
      setMarks(response.data);
      setError(null);
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError('Invalid ID. Student not found.');
      } else {
        console.error('Error fetching student marks:', error.message);
        setError('An error occurred. Please try again later.');
      }
      setMarks(null);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100 -mt-20">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center">Fetch Student Marks</h1>
        <div className="mb-4"><input type="text" id="rollNo" value={student_Id} onChange={handleChange} className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" placeholder="Enter Roll No" /></div>
        {error && (<div className="mb-4 text-red-500">{error}</div>)}
        <button type="submit" className="w-full px-4 py-2 font-bold text-white bg-orange-600 rounded hover:bg-orange-700 focus:outline-none focus:shadow-outline">Print</button>
      </form>
      {marks && (
        <div className="w-full max-w-md p-4 mt-4 bg-white rounded shadow-md">
          <div className="mb-4 flex flex-row">
            <div><p className="text-l"><b>Roll No:</b> {marks.student_Id}</p></div>
            <div className="ml-20"><p className="text-l ml-20"><b>Grade: </b>{marks.Grade}</p></div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Subject</th>
                  <th className="border px-4 py-2">Marks</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(marks).map((key) => {
                  if (key !== 'student_Id' && key !== 'Name' && key !== '_id' && key !== 'Grade') {
                    return (
                      <tr key={key}>
                        <td className="border px-4 py-2">{key}</td>
                        <td className="border px-4 py-2">{marks[key]}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div></div>
      )}</div>
  );
};

export default FetchStudentMarks;
