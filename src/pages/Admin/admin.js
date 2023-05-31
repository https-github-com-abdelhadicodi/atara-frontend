import "./admin.css";
import Loader from "../../Components/loader/loader";
import ConfirmationPopup from "../../Components/confirmationPopup/confirmationPopup";
import { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import debounce from "lodash/debounce";
import { Box } from "@mui/system";
import AppRegistrationSharpIcon from "@mui/icons-material/AppRegistrationSharp";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import AddIcon from '@mui/icons-material/Add';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../Components/dashboard/sidebar/sidebar.js";

function Admin(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
   const [isAdding, setIsAdding] = useState(false);
  const [AdminName, setAdminName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const toggleAddCategory = () => {
    setIsAdding(!isAdding);
  };

  const handleAddAdmin = () => {
    const newAdmin = {
      name: AdminName,
      email: Email,
      password: Password,
    };
  
    axios
      .post(`https://atara-backend.onrender.com/admin/`, newAdmin)
      .then((response) => {
        console.log(response);
        toast.success("Admin added successfully!");
        getData(); // Refresh the admin data
        setAdminName(''); // Clear the input values
        setEmail(''); // Clear the input values
        setPassword(''); // Clear the input values
        toggleAddCategory(); // Hide the add admin form
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to add admin")
      });
  
    setOpenDialog(false); // Hide the popup
  };

  const getData = () => {
    axios
      .get(`https://atara-backend.onrender.com/admin/`)
      .then((response) => {
        console.log(response);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  function createData(_id,name, email, password) {
    <Sidebar/>
    return {
      _id,
      name,
      email,
      password,
    };
  }
  const rows =
    Data ||
    // eslint-disable-next-line array-callback-return
    [].map((item) => {
      createData(item._id,item.name, item.email, item.password);
    });

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    axios
      .delete(`https://atara-backend.onrender.com/admin/${rowsDeleted}`, {})
      .then((response) => {
        toast.success("Admin deleted successfully!");
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

  useEffect(() => {
    setLoading(true);
    document.title = "Admin";
    getData();
  }, []);


  const handleUpdate = (rowData) => {
    setEditingRow(true);
    axios
      .put(`https://atara-backend.onrender.com/admin/${rowData[0]}`, {
        name:rowData[1],
        email: rowData[2],
        password: rowData[3],
      })
      
      .then((response) => {
        getData();
        console.log(response);
        toast.success("Admin updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed update admin!");
      });
  };
  const showConfirmationBox = () => {
    document.querySelector(".confirmation-popup").showModal();
  };
  const columns = [
    {
      name: "_id",
      label: "ID",
      options: {
        display: "excluded",
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div style={{ textAlign: "left" }}>
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div style={{ textAlign: "left" }}>
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "password",
      label: "Password",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          return (
            <div style={{ textAlign: "left" }}>
              {isEditing ? (
                <input
                  className="EditInput"
                  value={value}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                value
              )}
            </div>
          );
        },
        editable: true,
      },
    },
    {
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableMeta.rowData;
          // eslint-disable-next-line no-unused-vars
          const id = rowData[0];
          return (
            <>
              {isEditing && editingRow === tableMeta.rowIndex ? (
                <SaveAsRoundedIcon
                  className="save-btn"
                  sx={{
                    color: "#5cbdcb",
                    cursor: "pointer",
                    justifyItems: "center",
                    alignItems: "center",

                    "&:hover": {
                      transform: "scale(1.3)",
                      transition: "0.2s ease-out",
                    },
                  }}
                  onClick={() => {
                    setIsEditing(false);
                    setEditingRow(null);
                    handleUpdate(rowData);
                  }}
                />
              ) : (
                <AppRegistrationSharpIcon
                  className="edit-btn"
                  onClick={() => {
                    setIsEditing(true);
                    setEditingRow(tableMeta.rowIndex);
                  }}
                  sx={{
                    color: "#5cbdcb",
                    cursor: "pointer",
                    justifyItems: "center",
                    alignItems: "center",

                    "&:hover": {
                      transform: "scale(1.3)",
                      transition: "0.2s ease-out",
                    },
                  }}
                />
              )}
              &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
              <DeleteRoundedIcon
                sx={{
                  color: "red",
                  cursor: "pointer",
                  justifyItems: "center",
                  alignItems: "center",

                  "&:hover": {
                    transform: "scale(1.3)",
                    transition: "0.2s ease-out",
                  },
                }}
                className="delete-btn"
                onClick={() => {
                  setDeleteId(rowData[0]);
                  showConfirmationBox();
                }}
              />
            </>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    responsive: "simple",
    selectableRows: "none",
    search: true,
    searchPlaceholder: "Search for admin",
    onSearchChange: (searchValue) => handleSearch(searchValue),
    download: true,
    print: true,
    pagination: true,
    rowsPerPage: 5,
    loaded: true,
    rowsPerPageOptions: [5],
    onCellClick: (cellData, cellMeta) => {
      const rowIndex = cellMeta.rowIndex;
      if (cellMeta.colIndex === 3) {
        setEditingRow(rowIndex);
      }
    },
    onRowsDelete: handleDelete,
    fullScreen: true,
  };
  return (
    <>
    <Sidebar/>
    <ToastContainer/>
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div> 
          <Box sx={{ maxWidth: "75%", margin: "auto" }}>
            <MUIDataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Admin</span>
                  <div>
                    <span onClick={() => setOpenDialog(true)} style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer" }}>
                      <AddIcon />
                      Add Admin
                    </span>
                  </div>
                </div>
              }   
              data={rows}
              columns={columns}
              options={options}
              sx={{
                width: "70%",
                marginLeft: "390px",
                marginY: "190px",
                zIndex: 1,
                textAlign: "center",
              }}
              
            />
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>Add Admin</DialogTitle>
              <DialogContent>
                <input
                  className="category-name-input"
                  type="text"
                  placeholder="Admin Name"
                  value={AdminName}
                  onChange={(e) => setAdminName(e.target.value)}
                />
                <input
                  className="category-name-input"
                  type="text"
                  placeholder="Email "
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="category-name-input"
                  type="text"
                  placeholder="Password "
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={handleAddAdmin}>Add</Button>
              </DialogActions>
            </Dialog>
            <ConfirmationPopup handleDelete={handleDelete} id={deleteId} />
            
          </Box>
        </div>
      )}
    </>
  );
}
export default Admin;
