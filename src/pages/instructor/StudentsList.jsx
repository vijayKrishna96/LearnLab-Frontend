import axios from "axios";
import React, { useEffect, useState } from "react";
import { USER_DETAILS_API } from "../../Utils/Constants/Api";
import { useParams } from "react-router-dom";

const StudentsList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const fetchStudentsList = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${USER_DETAILS_API}/${userId}`);
        setData(response?.data[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentsList();
  }, [userId]);

  const { students } = data;

  return (
    <div
      className="p-4 bg-primary rounded-lg shadow-lg container mx-auto my-10 h-[80vh]"
      id="Tags"
    >
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center text-xl">
          <span className="loading loading-infinity loading-lg text-info"></span>
        </div>
      ) : (
        <div className="relative h-full overflow-x-auto overflow-y-auto">
          {/* Header for larger screens */}
          <div className="hidden md:block">
            <table className="w-full table-auto">
              <thead className="sticky top-0 bg-primary" id="Tags">
                <tr className="text-left" id="Text">
                  <th className="p-2">#</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Message</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students?.length > 0 ? (
                  students.map((student, index) => (
                    <tr key={student._id} className="border-b">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-14 h-14 bg-gray-300 rounded-full overflow-hidden">
                            {student.profilePicture ? (
                              <img
                                src={student.profilePicture}
                                alt={student.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-500">👤</span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-sm sm:text-base">
                              {student.name}
                            </p>
                            {student.phone && (
                              <p className="text-xs sm:text-sm text-gray-500">
                                {student.phone}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-2 text-sm sm:text-base">
                        {student.email}
                      </td>
                      <td className="p-2">
                        <button
                          className="bg-gray-200 p-2 rounded-full"
                          onClick={() =>
                            console.log(`Send message to ${student.name}`)
                          }
                        >
                          💬
                        </button>
                      </td>
                      <td className="p-2">
                        <button className="bg-blue-500 p-2 text-white rounded-full">
                          📅
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-4 text-center text-gray-500 text-xl pt-32"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Column-wise display for mobile screens */}
          <div className="md:hidden space-y-4">
            {students?.length > 0 ? (
              students.map((student, index) => (
                <div
                  key={student._id}
                  className="p-4 border rounded-lg shadow-lg bg-white"
                >
                  <div className="mb-2 text-gray-500 text-md">#{index + 1}</div>
                  <div className="flex items-center mb-2 space-x-2">
                    <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
                      {student.profilePicture ? (
                        <img
                          src={student.profilePicture}
                          alt={student.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 flex  justify-center mt-3">👤</span>
                      )}
                    </div>
                    <div className="flex flex-row gap-16">
                      <div>
                        <p className="font-semibold">{student.name}</p>
                        {student.phone && (
                          <p className="text-xs text-gray-500">
                            {student.phone}
                          </p>
                        )}
                      </div>
                      <div className="">
                        <p className="text-gray-700 font-medium">Email:</p>
                        <p className="text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-2">
                    <button
                      className="bg-gray-200 p-2 rounded-full"
                      onClick={() =>
                        console.log(`Send message to ${student.name}`)
                      }
                    >
                      💬
                    </button>
                    <button className="bg-blue-500 p-2 text-white rounded-full">
                      📅
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 text-xl pt-32">
                No data available
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsList;
