import React, { useEffect, useState, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Card, CardContent, Button, Avatar, Stack } from '@mui/material';
import { MessageSquare, Calendar } from 'lucide-react';
import axios from 'axios';
import { USER_DETAILS_API } from '../../Utils/Constants/Api';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const StudentsList = () => {
  const [students, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [instructorData, setInstructorData] = useState(null);

  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  const { userId } = useParams();

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
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MuiToolbar: {
        styleOverrides: {
          regular: {
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#2d2d2d' : '#f5f5f5',
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MUIDataTableToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MUIDataTablePagination: {
        styleOverrides: {
          root: {
            color: isDarkMode ? '#ffffff' : '#000000',
          }
        }
      },
      MUIDataTableFilter: {
        styleOverrides: {
          root: {
            minWidth: "200px",
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            minWidth: "200px",
          },
        },
      },
      MuiFormGroup: {
        styleOverrides: {
          root: {
            marginLeft: "20px",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            marginLeft: "20px",
            textAlign: "center",
          },
          caption: {
            marginTop: "20px",
            fontSize: "0.875rem",
            fontWeight: "400",
            lineHeight: "1.5",
            color: "rgba(0, 0, 0, 0.87)",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            width: "150px",
          },
        },
      },
    },
  }), [isDarkMode]);

  // const fetchStudents = async (currentPage, limit) => {
  //   try {
  //     setLoading(true);
  //     // Add page and limit to the URL as query parameters
  //     const response = await axios.get(`${USER_DETAILS_API}/${userId}?page=${currentPage}&limit=${limit}`);
      
  //     if (!response?.data?.users?.[0]) {
  //       console.error('No data received');
  //       return;
  //     }

  //     const instructor = response.data.users[0];
  //     setInstructorData(instructor);

  //     if (!Array.isArray(instructor.students)) {
  //       console.error('Students data is not an array');
  //       return;
  //     }

  //     const transformedData = instructor.students.map((student) => ({
  //       id: student._id || student.id,
  //       name: student.name || 'N/A',
  //       email: student.email || 'N/A',
  //       phone: student.phone || 'N/A',
  //       joinDate: student.joined || new Date().toISOString(),
  //       profilePicture: student.profilePicture?.url || '',
  //     }));

  //     setStudentData(transformedData);
  //     // Use the total from pagination data
  //     setTotalCount(response.data.pagination?.total || 0);
  //   } catch (error) {
  //     console.error('Error fetching students:', error);
  //     setStudentData([]);
  //     setTotalCount(0);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchStudents = async (currentPage, limit, searchText = '') => {
    try {
      setLoading(true);
      const response = await axios.get(`${USER_DETAILS_API}/${userId}`, {
        params: { page: currentPage, limit, search: searchText }
      });
  
      if (!response?.data?.users?.[0]) {
        console.error('No data received');
        return;
      }
  
      const instructor = response.data.users[0];
      setInstructorData(instructor);
  
      const transformedData = instructor.students.map((student) => ({
        id: student._id || student.id,
        name: student.name || 'N/A',
        email: student.email || 'N/A',
        phone: student.phone || 'N/A',
        joinDate: student.joined || new Date().toISOString(),
        profilePicture: student.profilePicture?.url || '',
      }));
  
      setStudentData(transformedData);
      setTotalCount(response.data.pagination?.total || 0);
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudentData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents(page + 1, rowsPerPage);
  }, [page, rowsPerPage, userId]);

  const columns = [
    {
      name: 'id',
      label: '#',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta) => (page * rowsPerPage) + tableMeta.rowIndex + 1,
      }
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, tableMeta) => {
          const student = students[tableMeta.rowIndex];
          return (
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={student.profilePicture}
                alt={value}
                sx={{ width: 40, height: 40 }}
              >
                {!student.profilePicture && value.charAt(0)}
              </Avatar>
              <Stack>
                <div style={{ 
                  fontWeight: 500,
                  color: isDarkMode ? '#ffffff' : '#000000'
                }}>
                  {value}
                </div>
                <div style={{ 
                  color: isDarkMode ? '#b3b3b3' : '#666666'
                }}>
                  {student.phone !== 'N/A' ? student.phone : 'No phone'}
                </div>
              </Stack>
            </Stack>
          );
        }
      }
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <div style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
            {value}
          </div>
        )
      }
    },
    {
      name: 'joinDate',
      label: 'Join Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (
          <div style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
            {new Date(value).toLocaleDateString()}
          </div>
        )
      }
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: () => (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="contained"
              sx={{
                minWidth: 'unset',
                p: 1,
                bgcolor: isDarkMode ? 'grey.800' : 'grey.200',
                '&:hover': {
                  bgcolor: isDarkMode ? 'grey.700' : 'grey.300'
                }
              }}
            >
              <MessageSquare size={20} color={isDarkMode ? '#ffffff' : '#000000'} />
            </Button>
            <Button
              size="small"
              variant="contained"
              sx={{
                minWidth: 'unset',
                p: 1,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.dark'
                }
              }}
            >
              <Calendar size={20} />
            </Button>
          </Stack>
        )
      }
    }
  ];

  const options = {
    filterType: 'multiselect',
    responsive: 'standard',
    selectableRows: 'none',
    download: true,
    print: true,
    rowsPerPage,
    rowsPerPageOptions: [5, 10, 25, 50],
    count: totalCount,
    page,
    serverSide: true,
    onChangePage: (newPage) => {
      setPage(newPage);
    },
    onChangeRowsPerPage: (newRowsPerPage) => {
      setRowsPerPage(newRowsPerPage);
      setPage(0);
    },
    onSearchChange: (searchText) => {
      setPage(0);
      fetchStudents(1, rowsPerPage, searchText || ''); // Trigger fetch with search text
    },
    searchPlaceholder: 'Search students...',
    elevation: 0,
    rowHover: false,
    setTableProps: () => ({
      sx: {
        backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
        '& .MuiTableRow-root': {
          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
        },
        '& .MuiTableRow-root:nth-of-type(odd)': {
          backgroundColor: isDarkMode ? '#252525' : '#f5f5f5',
        },
        '& .MuiTableRow-root:hover': {
          backgroundColor: isDarkMode ? '#303030' : '#e0e0e0',
        },
      },
    }),
  };

  return (
    <Box sx={{ mx: '120px' }}>
      {instructorData && (
        <Card
          sx={{ 
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            m: 2
          }}
        >
          <CardContent>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={instructorData.profilePicture?.url}
                alt={instructorData.name}
                sx={{ width: 60, height: 60 }}
              >
                {!instructorData.profilePicture?.url && instructorData.name.charAt(0)}
              </Avatar>
              <Stack>
                <div style={{ 
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: isDarkMode ? '#ffffff' : '#000000'
                }}>
                  {instructorData.name}
                </div>
                <div style={{ color: isDarkMode ? '#b3b3b3' : '#666666' }}>
                  {instructorData.expertise} • {instructorData.headline}
                </div>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}
      
      <Card
        sx={{ 
          backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
          color: isDarkMode ? '#ffffff' : '#000000' 
        }}
      >
        <CardContent>
          <ThemeProvider theme={theme}>
            <MUIDataTable
              title={
                <div style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>
                  Students
                </div>
              }
              data={students}
              columns={columns}
              options={options}
            />
          </ThemeProvider>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StudentsList;