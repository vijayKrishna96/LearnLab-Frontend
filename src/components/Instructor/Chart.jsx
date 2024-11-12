import React from 'react';
import { useSelector } from 'react-redux';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ProductMetricsChart = () => {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const data = [
    { name: 'Jan', sales: 4000, activeUsers: 2400, coursesAdded: 30, enrollments: 120 },
    { name: 'Feb', sales: 3000, activeUsers: 1398, coursesAdded: 25, enrollments: 100 },
    { name: 'Mar', sales: 2000, activeUsers: 9800, coursesAdded: 35, enrollments: 150 },
    { name: 'Apr', sales: 2780, activeUsers: 3908, coursesAdded: 40, enrollments: 170 },
    { name: 'May', sales: 1890, activeUsers: 4800, coursesAdded: 20, enrollments: 130 },
    { name: 'Jun', sales: 2390, activeUsers: 3800, coursesAdded: 22, enrollments: 110 },
    { name: 'Jul', sales: 3490, activeUsers: 4300, coursesAdded: 28, enrollments: 140 },
  ];

  const backgroundColor = isDarkMode ? '#333' : '#fff';
  const textColor = isDarkMode ? '#fff' : '#000';
  const gridColor = isDarkMode ? '#555' : '#ccc';

  return (
    <ResponsiveContainer width="100%" height={400} style={{ backgroundColor }}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke={textColor} />
        <YAxis type="number" domain={[0, 'dataMax']} stroke={textColor} />
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <Tooltip contentStyle={{ backgroundColor, color: textColor }} />
        <Legend wrapperStyle={{ color: textColor }} />
        <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Monthly Sales" />
        <Line type="monotone" dataKey="activeUsers" stroke="#82ca9d" name="Active Users" />
        <Line type="monotone" dataKey="coursesAdded" stroke="#ffc658" name="Courses Added" />
        <Line type="monotone" dataKey="enrollments" stroke="#ff7300" name="Enrollments" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProductMetricsChart;
