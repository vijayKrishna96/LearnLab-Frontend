import React, { useEffect, useState, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { 
  Box, 
  Card, 
  CardContent, 
  Chip, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { Eye } from 'lucide-react';
import axios from 'axios';
import { ALL_USERS_API } from '../../Utils/Constants/Api';
import { useSelector } from 'react-redux';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      background: {
        default: isDarkMode ? '#121212' : '#ffffff',
        paper: isDarkMode ? '#1e1e1e' : '#ffffff',
      },
      text: {
        primary: isDarkMode ? '#ffffff' : '#000000',
        secondary: isDarkMode ? '#b3b3b3' : '#666666',
      }
    },
    components: {
      MUIDataTable: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
          }
        }
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2d2d2d' : '',
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            padding: '16px',
            backgroundColor: 'transparent',
            color: isDarkMode ? '#ffffff' : '#000000',
          },
        },
      },
      MUIDataTableToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MUIDataTableFilter: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
          }
        }
      },
      MuiChip: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : '',
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : '#000',
          }
        }
      }
    },
  }), [isDarkMode]);

  useEffect(() => {
    const getAllInstructors = async (page, limit) => {
      try {
        setLoading(true);
        const response = await axios.get(`${ALL_USERS_API}?role=instructor&page=${page + 1}&limit=${limit}`);
        if (!response?.data?.users) {
          console.error('No users data received');
          return;
        }

        console.log(response)

        const transformedData = response.data.users.map((instructor) => ({
          id: instructor._id || instructor.id,
          name: instructor.name || 'N/A',
          email: instructor.email || 'N/A',
          phone: instructor.phone || 'N/A',
          active: Boolean(instructor.active),
          courses: Array.isArray(instructor.courses) ? instructor.courses : [],
          students: instructor.students || []
        }));

        setInstructors(transformedData);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      } finally {
        setLoading(false);
      }
    };
    getAllInstructors(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleViewDetails = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'active',
      label: 'Active',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <Chip
            label={value ? 'Yes' : 'No'}
            color={value ? 'success' : 'error'}
            size="small"
          />
        ),
      },
    },
    {
      name: 'courses',
      label: 'Created Courses',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (courses) => (
          <Box sx={{ width: '100%', py: 1 }}>
            {courses.map((course, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '&:not(:last-child)': {
                    mb: 0.5,
                  },
                }}
              >
                • {course?.title || 'Untitled Course'}
              </Box>
            ))}
          </Box>
        ),
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          const instructor = instructors[tableMeta.rowIndex];
          return (
            <Button
              variant="contained"
              
              size="small"
              onClick={() => handleViewDetails(instructor)}
              startIcon={<Eye className="w-4 h-4" />}
            >
              View Details
            </Button>
          );
        },
      },
    },
  ];

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
    searchPlaceholder: 'Search instructors...',
    elevation: 0,
    rowHover: false,
    loadingIndicator: loading,
    textLabels: {
      body: {
        noMatch: loading ? 'Loading data...' : 'No matching records found',
      },
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
      backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
      color: isDarkMode ? '#ffffff' : '#00000',
    }}
  >
    <CardContent>
      <ThemeProvider theme={theme}>
        <MUIDataTable title="Instructors" data={instructors} columns={columns} options={options} />
      </ThemeProvider>

      <Dialog
        open={Boolean(selectedInstructor)}
        onClose={() => setSelectedInstructor(null)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: isDarkMode ? '#333' : '#fff',  // Dark or light background color for Dialog
            color: isDarkMode ? '#fff' : '#000',             // Dark or light text color for Dialog
          },
        }}
      >
        {selectedInstructor && (
          <>
            <DialogTitle
              sx={{
                backgroundColor: isDarkMode ? '#2c2c2c' : '#f5f5f5', // Slightly lighter background for the title
                color: isDarkMode ? '#fff' : '#0000',
              }}
            >
              <Typography variant="h6">
                Instructor Details: {selectedInstructor.name}
              </Typography>
            </DialogTitle>
            <DialogContent
              sx={{
                backgroundColor: isDarkMode ? '#2c2c2c' : '#f5f5f5', // Slightly lighter background for the content
                color: isDarkMode ? '#ddd' : '#000',
              }}
            >
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Email: {selectedInstructor.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Phone: {selectedInstructor.phone}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Status: <Chip label={selectedInstructor.active ? 'Active' : 'Inactive'} color={selectedInstructor.active ? 'success' : 'error'} size="small" />
                </Typography>

                <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                  Courses and Enrolled Students
                </Typography>

                {selectedInstructor.courses.map((course, index) => (
                  <Accordion key={index}
                  sx={{
                    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                    color: isDarkMode ? '#ffffff' : '#000000',
                  }}
                  >
                    <AccordionSummary>
                    <Typography>
                        {course.title} ({selectedInstructor.students.filter(student =>
                          student.courses.includes(course._id)
                        ).length} students)
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List
                        sx={{
                          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                          color: isDarkMode ? '#ffffff' : '#000',
                        }}
                      >
                        {selectedInstructor.students
                          .filter(student => student.courses.includes(course._id))
                          .map((student, studentIndex) => (
                            <ListItem
                              key={studentIndex}
                              sx={{
                                backgroundColor: isDarkMode ? '#333' : '#f5f5f5', // Background for each list item
                                color: isDarkMode ? '#ddd' : '#000',             // Text color for each list item
                                borderBottom: `1px solid ${isDarkMode ? '#444' : '#ddd'}`, // Optional divider color
                              }}
                            >
                              <ListItemText
                                primary={student.name}
                                secondary={student.email}
                                primaryTypographyProps={{
                                  color: isDarkMode ? '#fff' : '#000', // Primary text color
                                }}
                                secondaryTypographyProps={{
                                  color: isDarkMode ? '#aaa' : '#666', // Secondary text color
                                }}
                              />
                            </ListItem>
                          ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </DialogContent>
            <DialogActions
              sx={{
                backgroundColor: isDarkMode ? '#2c2c2c' : '#f5f5f5', // Background for Dialog actions
              }}
            >
              <Button
                onClick={() => setSelectedInstructor(null)}
                sx={{
                  color: isDarkMode ? '#fff' : '#000', // Color for the close button
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </CardContent>
  </Card>
  );
};

export default Instructors;