import React from "react";

const students = [
  {
    id: 1,
    name: "Angela Anderson",
    phone: "170-433-8508",
    email: "Sydnee.Bins@gmail.com",
    balance: "-HK$250.00",
    recurring: "No",
    classes: "Steam | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 2,
    name: "Chasity Miller",
    phone: "626-255-3951",
    email: "Shaniya56@yahoo.com",
    balance: "HK$0.00",
    recurring: "No",
    classes: "Math | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 1,
    name: "Angela Anderson",
    phone: "170-433-8508",
    email: "Sydnee.Bins@gmail.com",
    balance: "-HK$250.00",
    recurring: "No",
    classes: "Steam | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 2,
    name: "Chasity Miller",
    phone: "626-255-3951",
    email: "Shaniya56@yahoo.com",
    balance: "HK$0.00",
    recurring: "No",
    classes: "Math | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 1,
    name: "Angela Anderson",
    phone: "170-433-8508",
    email: "Sydnee.Bins@gmail.com",
    balance: "-HK$250.00",
    recurring: "No",
    classes: "Steam | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 2,
    name: "Chasity Miller",
    phone: "626-255-3951",
    email: "Shaniya56@yahoo.com",
    balance: "HK$0.00",
    recurring: "No",
    classes: "Math | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 1,
    name: "Angela Anderson",
    phone: "170-433-8508",
    email: "Sydnee.Bins@gmail.com",
    balance: "-HK$250.00",
    recurring: "No",
    classes: "Steam | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 2,
    name: "Chasity Miller",
    phone: "626-255-3951",
    email: "Shaniya56@yahoo.com",
    balance: "HK$0.00",
    recurring: "No",
    classes: "Math | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 1,
    name: "Angela Anderson",
    phone: "170-433-8508",
    email: "Sydnee.Bins@gmail.com",
    balance: "-HK$250.00",
    recurring: "No",
    classes: "Steam | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 2,
    name: "Chasity Miller",
    phone: "626-255-3951",
    email: "Shaniya56@yahoo.com",
    balance: "HK$0.00",
    recurring: "No",
    classes: "Math | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 1,
    name: "Angela Anderson",
    phone: "170-433-8508",
    email: "Sydnee.Bins@gmail.com",
    balance: "-HK$250.00",
    recurring: "No",
    classes: "Steam | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 2,
    name: "Chasity Miller",
    phone: "626-255-3951",
    email: "Shaniya56@yahoo.com",
    balance: "HK$0.00",
    recurring: "No",
    classes: "Math | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 1,
    name: "Angela Anderson",
    phone: "170-433-8508",
    email: "Sydnee.Bins@gmail.com",
    balance: "-HK$250.00",
    recurring: "No",
    classes: "Steam | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  {
    id: 2,
    name: "Chasity Miller",
    phone: "626-255-3951",
    email: "Shaniya56@yahoo.com",
    balance: "HK$0.00",
    recurring: "No",
    classes: "Math | MON,TUE,WED,THU,FRI,SAT | Regular",
  },
  // Add more students as needed
];

const StudentsList = () => {
  return (
    <div className="p-4 bg-primary rounded-lg shadow-lg container mx-auto my-10 h-[80vh]">
      <div className="relative h-full overflow-y-auto">
        <table className="w-full table-auto">
          <thead className="sticky top-0 bg-primary">
            <tr className="text-left">
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Balance</th>
              <th className="p-4">Recurring Payment</th>
              <th className="p-4">Classes</th>
              <th className="p-4">Package</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b">
                <td className="p-4">{student.id}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-semibold">{student.name}</p>
                      <p className="text-sm text-gray-500">{student.phone}</p>
                      <p className="text-sm text-gray-500">{student.email}</p>
                    </div>
                  </div>
                </td>
                <td
                  className={`p-4 ${
                    student.balance.startsWith("-")
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {student.balance}
                </td>
                <td className="p-4">{student.recurring}</td>
                <td className="p-4">{student.classes}</td>
                <td className="p-4">{student.package}</td>
                <td className="p-4">
                  <button className="bg-blue-500 p-2 text-white rounded-full">
                    📅
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
