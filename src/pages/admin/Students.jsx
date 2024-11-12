import React, { useEffect, useState, useMemo } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Card, CardContent, Button, Chip } from "@mui/material";
import axios from "axios";
import { ALL_USERS_API } from "../../Utils/Constants/Api";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useSelector } from "react-redux";

const Students = () => {
  const [students, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          background: {
            default: isDarkMode ? "#121212" : "#ffffff",
            paper: isDarkMode ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: isDarkMode ? "#ffffff" : "#000000",
            secondary: isDarkMode ? "#b3b3b3" : "#666666",
          },
        },
        components: {
          MUIDataTable: {
            styleOverrides: {
              paper: {
                backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
              },
            },
          },
          MUIDataTableHeadCell: {
            styleOverrides: {
              root: {
                backgroundColor: isDarkMode ? "#2d2d2d" : "",
                color: isDarkMode ? "#ffffff" : "#000000",
              },
            },
          },
          MUIDataTableBodyCell: {
            styleOverrides: {
              root: {
                padding: "16px",
                backgroundColor: "transparent",
                color: isDarkMode ? "#ffffff" : "#000000",
              },
            },
          },
          MUIDataTableToolbar: {
            styleOverrides: {
              root: {
                backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#000000",
              },
            },
          },
          MUIDataTableFilter: {
            styleOverrides: {
              root: {
                backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                color: isDarkMode ? "#ffffff" : "",
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                color: isDarkMode ? "#ffffff" : "#000000",
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  const toggleExpand = (studentId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  useEffect(() => {
    const getAllStudents = async (page, limit) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${ALL_USERS_API}?role=student&page=${page + 1}&limit=${limit}`
        );
        console.log(response);
        if (!response?.data?.users) {
          console.error("No users data received");
          return;
        }

        const transformedData = response.data.users.map((student, index) => ({
          id: student._id || student.id || `student-${index}`,
          name: student.name || "N/A",
          email: student.email || "N/A",
          phone: student.phone || "N/A",
          active: Boolean(student.active),
          courses: Array.isArray(student.courses) ? student.courses : [],
        }));

        setStudentData(transformedData);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    getAllStudents();
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page when changing rows per page
  };

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "active",
      label: "Active",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Chip
            label={value ? "Yes" : "No"}
            color={value ? "success" : "error"}
            size="small"
          />
        ),
      },
    },
    {
      name: "courses",
      label: "Enrolled Courses",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (courses, tableMeta) => {
          const studentId = students[tableMeta.rowIndex].id;
          const isExpanded = expandedRows[studentId];
          const displayCourses = isExpanded ? courses : courses.slice(0, 2);
          const hasMore = courses.length > 2;

          return (
            <Box sx={{ width: "100%", py: 1 }}>
              {displayCourses.map((course, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "&:not(:last-child)": {
                      mb: 0.5,
                    },
                  }}
                >
                  • {course?.title || "Untitled Course"}
                </Box>
              ))}
              {hasMore && (
                <Box
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  sx={{
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                >
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleExpand(studentId);
                    }}
                    startIcon={
                      isExpanded ? (
                        <MdKeyboardArrowUp />
                      ) : (
                        <MdKeyboardArrowDown />
                      )
                    }
                    sx={{
                      mt: 0.5,
                      textTransform: "none",
                      minWidth: "auto",
                      color: isDarkMode ? "#87CEFA" : "#0000CD",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {isExpanded
                      ? "Show Less"
                      : `Show ${courses.length - 2} More`}
                  </Button>
                </Box>
              )}
            </Box>
          );
        },
        filterOptions: {
          logic: (courses, filters) => {
            if (!filters.length) return false;
            const filterValue = filters[0].toLowerCase();
            return !courses.some((course) =>
              course?.title?.toLowerCase().includes(filterValue)
            );
          },
        },
      },
    },
  ];

  // const options = {
  //   filterType: "multiselect",
  //   responsive: "standard",
  //   selectableRows: "none",
  //   download: true,
  //   print: true,
  //   rowsPerPage,
  //   page,
  //   rowsPerPageOptions: [5, 10, 25, 50],
  //   onChangePage: handlePageChange,
  //   onChangeRowsPerPage: handleRowsPerPageChange,
  //   searchPlaceholder: "Search students...",
  //   elevation: 0,
  //   rowHover: false,
  //   onCellClick: null,
  //   onRowClick: null,
  //   loadingIndicator: loading,
  //   textLabels: {
  //     body: {
  //       noMatch: loading ? "Loading data..." : "No matching records found",
  //     },
  //   },

  //   setTableProps: () => ({
  //     sx: {
  //       "& .MuiTableRow-root:nth-of-type(odd)": {
  //         backgroundColor: isDarkMode ? "#252525" : "#f5f5f5",
  //       },
  //       "& .MuiTableRow-root:nth-of-type(even)": {
  //         backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
  //       },
  //     },
  //   }),
  // };


  const options = {
    filterType: 'multiselect',
    responsive: 'standard',
    selectableRows: 'none',
    download: true,
    print: true,
    rowsPerPage,
    page,
    rowsPerPageOptions: [5, 10, 25, 50],
    onChangePage: handlePageChange,
    onChangeRowsPerPage: handleRowsPerPageChange,
    searchPlaceholder: 'Search students...',
    elevation: 0,
    rowHover: false,
    onCellClick: null,
    onRowClick: null,
    loadingIndicator: loading,
    textLabels: {
      body: {
        noMatch: loading ? 'Loading data...' : 'No matching records found',
      },
    },
    fixedHeader: true,
    fixedHeaderOptions: {
      xAxis: false,
      yAxis: true
    },
    setTableProps: () => ({
      sx: {
        '& .MuiTableRow-root:nth-of-type(odd)': {
          backgroundColor: isDarkMode ? '#252525' : '#f5f5f5',
        },
        '& .MuiTableRow-root:nth-of-type(even)': {
          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
        },
      },
    }),
  };

  return (
    <Card
      sx={{
        backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff",
        color: isDarkMode ? "#ffffff" : "#000000",
        overflow: "auto", // Add this line to enable scrolling within the Card component
        position: "relative",
      }}
    >
      <CardContent>
        <ThemeProvider theme={theme}>
          <MUIDataTable
            title="Students"
            data={students}
            columns={columns}
            options={{
          ...options,
          position: "relative",
          tableBodyStyle: {
            position: "relative", // Add this line
          },
        }}
          />
        </ThemeProvider>
      </CardContent>
    </Card>
  );
};

export default Students;
