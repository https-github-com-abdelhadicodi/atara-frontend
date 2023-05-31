import React from "react";
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
import AddIcon from "@mui/icons-material/Add";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../Components/dashboard/sidebar/sidebar";

function Product(props) {
  const [Loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    note: "",
    category_name: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedTreatment, setSelectedTreatment] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const categoryOptions = [
    {
      id: "6463819e2722ae185882e1f1",
      name: "Herbs",
      value: "6463819e2722ae185882e1f1",
    },
    {
      id: "646381a52722ae185882e1f4",
      name: "Spices",
      value: "646381a52722ae185882e1f4",
    },
    {
      id: "646381ad2722ae185882e1f7",
      name: "Dates",
      value: "646381ad2722ae185882e1f7",
    },
  ];

  const toggleAddProduct = () => {
    setIsAdding(!isAdding);
  };

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddProduct = async (event) => {
    event.preventDefault();
  
    // Validate input fields here (e.g., check for empty fields, validate price format)
  
    let newProduct = new FormData();
    newProduct.append("name", product.name);
    newProduct.append("description", product.description);
    newProduct.append("price", product.price);
    newProduct.append("image", selectedFile);
    newProduct.append("note", product.note);
    newProduct.append("category_id", selectedCategory); // Add selected category
  
    try {
      const response = await axios.post(
        "https://atara-backend.onrender.com/product/products",
        newProduct
      );
  
      if (response.status === 201) {
        console.log(response);
        toast.success("Product added successfully!");
        getData(); // Refresh the product data
        setProduct({
          name: "",
          description: "",
          price: "",
          note: "",
          category_name: "",
        });
        setSelectedCategory(""); // Clear the selected category
        toggleAddProduct(); // Hide the add product form
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.log(error);
  
      // Handle specific error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code outside the range of 2xx
        toast.error(`Server Error: ${error.response.data.message}`);
      } else if (error.request) {
        // The request was made, but no response was received
        toast.error("No response from the server");
      } else {
        // Something happened in setting up the request
        toast.error("Error processing the request");
      }
    }
  
    setOpenDialog(false);
  };
  

  const getData = () => {
    axios
      .get("https://atara-backend.onrender.com/product/products/")
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

  function createData(
    _id,
    name,
    description,
    price,
    image,
    note,
    categoryOptions
    // selectedTreatment
  ) {
    return {
      _id,
      name,
      description,
      price,
      image,
      note,
      categoryOptions,
    };
  }
  const rows =
    Data ||
    // eslint-disable-next-line array-callback-return
    [].map((item) => {
      createData(
        item._id,
        item.name,
        item.description,
        item.price,
        item.image,
        item.note,
        item.categoryOptions
      );
    });

  const handleSearch = debounce((searchValue) => {
    console.log(searchValue);
  }, 500);

  const handleDelete = (rowsDeleted) => {
    axios
      .delete(`https://atara-backend.onrender.com/product/products/${rowsDeleted}`, {})
      .then((response) => {
        getData();
        toast.success("Product deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed delete product!");
      });
  };

  useEffect(() => {
    setLoading(true);
    document.title = "Products";
    getData();
  }, []);
  const handleUpdate = (rowData) => {
    setEditingRow(true);
    axios
      .put(`https://atara-backend.onrender.com/product/products/${rowData[0]}`, {
        name: rowData[1],
        description: rowData[2],
        price: rowData[3],
        note: rowData[5],
      })

      .then((response) => {
        getData();
        console.log(response);
        toast.success("Product updated successfully!");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed update product!");
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
      name: "description",
      label: "Description",
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
      name: "price",
      label: "Price",
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
      name: "image",
      label: "Image",
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
      name: "note",
      label: "Note",
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
      name: "category_id",
      label: "Category",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const rowIndex = tableMeta.rowIndex;
          const isEditing = rowIndex === editingRow;

          const categoryName = value && value.name ? value.name : "";

          return (
            <div style={{ textAlign: "left" }}>
              {isEditing ? (
                <input
                  className="EditInput"
                  value={categoryName}
                  onChange={(e) => {
                    updateValue(e.target.value);
                  }}
                />
              ) : (
                categoryName
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
    searchPlaceholder: "Search for product",
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
      <Sidebar />
      <ToastContainer />
      {Loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
          <Box sx={{ maxWidth: "75%", margin: "auto" }}>
            <MUIDataTable
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>Product</span>
                  <div>
                    <span
                      onClick={() => setOpenDialog(true)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "9px",
                        cursor: "pointer",
                      }}
                    >
                      <AddIcon />
                      Add Product
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
              <DialogTitle>Add Product</DialogTitle>
              <DialogContent>
  <input
    className="category-name-input"
    type="text"
    name="name"
    placeholder="Product Name"
    value={product.name}
    onChange={handleFormChange}
  />
  <input
    className="category-name-input"
    type="text"
    name="description"
    placeholder="Description"
    value={product.description}
    onChange={handleFormChange}
  />
  <input
    className="category-name-input"
    type="text"
    name="price"
    placeholder="Price"
    value={product.price}
    onChange={handleFormChange}
  />
  <select
    className="category-name-input"
    name="category_name"
    value={selectedCategory}
    onChange={(e) =>{ setSelectedCategory(e.target.value)
    console.log(selectedCategory);}}
  >
    <option value="">Select Category</option>
    {categoryOptions.map((category) => (
      <option key={category.id} value={category.value}>
        {category.name}
      </option>
    ))}
  </select>
  <input
    className="category-name-input"
    type="file"
    placeholder="Image"
    onChange={handleFileInputChange}
  />
  <input
    className="category-name-input"
    type="text"
    name="note"
    placeholder="Note"
    value={product.note}
    onChange={handleFormChange}
  />
</DialogContent>

              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button onClick={handleAddProduct}>Add</Button>
              </DialogActions>
            </Dialog>
            <ConfirmationPopup handleDelete={handleDelete} id={deleteId} />
          </Box>
        </div>
      )}
    </>
  );
}
export default Product;
