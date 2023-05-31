import "./category.css";
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

function Category(props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const toggleAddCategory = () => {
    setIsAdding(!isAdding);
  };

  const handleAddCategory = () => {
    const newCategory = {
      name: categoryName,
    };

    axios.post("https://atara-backend.onrender.com/category/", newCategory)
      .then(response => {
        console.log(response);
        toast.success("Category added successfully!");
        getData(); // Refresh the category data
        setCategoryName(''); // Clear the input values
        toggleAddCategory(); // Hide the add category form
      })
      .catch(error => {
        console.log(error);
        toast.error("Failed to add Category")
      });

    setOpenDialog(false); // Hide the popup
  };

  const getData = () => {
    axios
      .get("https://atara-backend.onrender.com/category/")
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

  useEffect(() => {
    setLoading(true);
    document.title = "Category";
    getData();
  }, []);

  function createData(_id, name, product_id) {
    return {
      _id,
      name,
      product_id
    };
  }

  const rows = data.map((item) => {
    return createData(item._id, item.name, item.product_id);
  });

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    axios
      .delete(`https://atara-backend.onrender.com/category/${rowsDeleted}`, {})
      .then((response) => {
        toast.success("Category deleted successfully!");
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (rowData) => {
    setEditingRow(true);
    axios
      .put(`https://atara-backend.onrender.com/category/${rowData[0]}`, {
        name: rowData[1],
        product_id: rowData[2]
      })
      .then((response) => {
        getData();
        console.log(response);
        toast.success("Category updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed update Category");
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
      name: "_id",
      label: "ID",
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
      name: "actions",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowData = tableMeta.rowData;
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
    searchPlaceholder: "Search for category",
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
      <ToastContainer />
      {loading ? (
        <div>
                    <Loader />
        </div>
      ) : (
        <div> 
          <Box sx={{ maxWidth: "75%", margin: "auto" }}>
            <MUIDataTable
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Category</span>
                  <div>
                    <span onClick={() => setOpenDialog(true)} style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer" }}>
                      <AddIcon />
                      Add Category
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
              <DialogTitle>Add Category</DialogTitle>
              <DialogContent>
                <input
                  className="category-name-input"
                  type="text"
                  placeholder="Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={handleAddCategory}>Add</Button>
              </DialogActions>
            </Dialog>
            <ConfirmationPopup handleDelete={handleDelete} id={deleteId} />
          </Box>
        </div>
      )}
    </>
  );
}

export default Category;

