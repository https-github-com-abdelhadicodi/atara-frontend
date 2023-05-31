// import "./admin.css";
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
import Sidebar from "../../Components/dashboard/sidebar/sidebar";

function User(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [userName, setuserName] = useState('');
  const [userLastName, setuserLastName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [userPhone, setuserPhone] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const toggleAddUser = () => {
    setIsAdding(!isAdding);
  };

  const handleAddUser = () => {
    const newUser = {
      first_name: userName,
      last_name: userLastName,
      email: userEmail,
      password: userPassword,
      phone: userPhone,
    };
  
    axios
      .post("https://atara-backend.onrender.com/user", newUser)
      .then((response) => {
        console.log(response);
        toast.success("User added successfully!");
        getData(); // Refresh the user data
        setuserName(''); // Clear the input values
        setuserLastName(''); // Clear the input values
        setuserEmail(''); // Clear the input values
        setuserPassword(''); // Clear the input values
        setuserPhone(''); // Clear the input values
        toggleAddUser(); // Hide the add user form
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to add User");
      });
      setOpenDialog(false);
  };

  const getData = () => {
    axios
      .get("https://atara-backend.onrender.com/user")
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

  function createData(_id,first_name,last_name, email, password, phone) {
    return {
      _id,
      first_name,
      last_name,
      email,
      password,
      phone
    };
  }
  const rows =
    Data ||
    // eslint-disable-next-line array-callback-return
    [].map((item) => {
      createData(item._id,item.first_name,item.last_name, item.email, item.password,item.phone);
    });

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    axios
      .delete(`https://atara-backend.onrender.com/user/${rowsDeleted}`, {})
      .then((response) => {
        getData();
        toast.success("User deleted!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("failed delete User!");
      });
  };

  useEffect(() => {
    setLoading(true);
    document.title = "User";
    getData();
  }, []);
  const handleUpdate = (rowData) => {
    setEditingRow(true);
    axios
      .put(`https://atara-backend.onrender.com/user/${rowData[0]}`, {
        first_name: rowData[1],
        last_name:rowData[2],
        email: rowData[3],
        password: rowData[4],
        phone:rowData[5]
      })
      
      .then((response) => {
        getData();
        console.log(response);
        toast.success("User updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("failed update user!");
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
      name: "first_name",
      label: "First Name",
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
      name: "last_name",
      label: "Last Name",
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
      name: "phone",
      label: "Phone",
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
    searchPlaceholder: "Search for user",
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
                  <span>User</span>
                  <div>
                    <span onClick={() => setOpenDialog(true)} style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer" }}>
                      <AddIcon />
                      Add User
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
              <DialogTitle>Add User</DialogTitle>
              <DialogContent>
                <input
                  className="category-name-input"
                  type="text"
                  placeholder="User Name"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                />
                <input
                  className="category-name-input"
                  type="text"
                  placeholder="Last Name "
                  value={userLastName}
                  onChange={(e) => setuserLastName(e.target.value)}
                />
                <input
                  className="category-name-input"
                  type="text"
                  placeholder="email "
                  value={userEmail}
                  onChange={(e) => setuserEmail(e.target.value)}
                />
                <input
                  className="category-name-input"
                  type="text"
                  placeholder="password"
                  value={userPassword}
                  onChange={(e) => setuserPassword(e.target.value)}
                />
                <input
                  className="category-name-input"
                  type="text"
                  placeholder="Phone"
                  value={userPhone}
                  onChange={(e) => setuserPhone(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={handleAddUser}>Add</Button>
              </DialogActions>
            </Dialog>
            <ConfirmationPopup handleDelete={handleDelete} id={deleteId} />
          </Box>
        </div>
      )}
    </>
  );
}
export default User;
