// import React, { useState, useEffect } from "react";
// import api from "./api"; // Import Axios instance
// import { ThemeProvider } from "@mui/material/styles";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import theme from "../../Buttons/Themebutton";
// import InputField from "../Auth/InputField";
// import {
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   Paper,
//   Input,
// } from "@mui/material";

// // Corrected Yup schema definition
// const productSchema = yup.object().shape({
//   title: yup.string().required("Product name is required"),
//   price: yup
//     .number()
//     .typeError("Price should be a number")
//     .positive("Price must be greater than zero")
//     .required("Price is required"),
//   image: yup.mixed().required("Please upload an image"),
// });

// const Products = () => {
//   const [products, setProducts] = useState([]); // Store products
//   const [editingProduct, setEditingProduct] = useState(null); // Track product being edited

//   // Using React Hook Form for form management
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(productSchema), // Apply Yup validation
//     defaultValues: {
//       title: "",
//       price: "",
//       image: null,
//     },
//   });

//   // Fetch products from API on mount
//   useEffect(() => {
//     api
//       .get("/products")
//       .then((res) => {
//         console.log("Fetched Products:", res.data);
//         setProducts(res.data);
//       })
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   //  Handle image selection with validation
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = async () => {
//         const resizedImage = await resizeImage(reader.result, 300, 300); // Resize to 300x300px
//         setValue("image", resizedImage); // Set image in React Hook Form
//       };
//     }
//   };

//   // Image resizing function
//   const resizeImage = (base64Str, maxWidth, maxHeight) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.src = base64Str;
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         canvas.width = maxWidth;
//         canvas.height = maxHeight;

//         ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
//         resolve(canvas.toDataURL("image/jpeg", 0.7)); // Convert to JPEG with 70% quality
//       };
//     });
//   };

//   // Handle form submission (Create & Update)
//   const onSubmit = async (data) => {
//     if (editingProduct) {
//       // Update existing product
//       try {
//         await api.put(`/products/${editingProduct.id}`, data);
//         setProducts((prevProducts) =>
//           prevProducts.map((product) =>
//             product.id === editingProduct.id ? { ...product, ...data } : product
//           )
//         );
//         setEditingProduct(null);
//       } catch (error) {
//         console.error("Error updating product:", error);
//         alert("Error updating product. Check console for details.");
//       }
//     } else {
//       // Create new product
//       try {
//         const response = await api.post("/products", data);
//         setProducts([
//           ...products,
//           { ...response.data, id: products.length + 1 },
//         ]);
//       } catch (error) {
//         console.error("Error adding product:", error);
//         alert("Error adding product. Check console for details.");
//       }
//     }
//     reset(); // Reset form fields
//   };

//   // Handle delete product
//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`/products/${id}`);
//       setProducts(products.filter((product) => product.id !== id));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Error deleting product. Check console for details.");
//     }
//   };

//   //  Handle edit button click
//   const handleEdit = (product) => {
//     setEditingProduct(product);
//     setValue("title", product.title);
//     setValue("price", product.price);
//     setValue("image", product.image);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <div style={{ padding: "20px" }}>
//         <h1 style={{ textAlign: "center" }}>Products</h1>

//         {/* Product Form */}
//         <Paper sx={{ padding: 3, marginBottom: 3, maxWidth: 500, mx: "auto" }}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <InputField
//               control={control}
//               name="title"
//               label="Product Name"
//               type="text"
//               error={errors.title?.message} // Show validation error
//             />
//             <InputField
//               control={control}
//               name="price"
//               label="Price"
//               type="number"
//               error={errors.price?.message} //  Show validation error
//             />

//             {/* File Input with Validation */}
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               fullWidth
//               sx={{ mb: 2 }}
//             />
//             {errors.image && (
//               <p style={{ color: "red", fontSize: "14px" }}>
//                 {errors.image.message}
//               </p>
//             )}

//             <Button type="submit" variant="raise" fullWidth>
//               {editingProduct ? "Update Product" : "Add Product"}
//             </Button>
//           </form>
//         </Paper>

//         {/* Product List */}
//         <Grid container spacing={3}>
//           {products.length > 0 ? (
//             products.map((product) => (
//               <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//                 <Card
//                   sx={{
//                     width: "100%",
//                     height: 350,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     boxShadow: 3,
//                     borderRadius: 2,
//                     // paddingBottom: 2,
//                   }}
//                 >
//                   <CardMedia
//                     component="img"
//                     height="150"
//                     image={product.image || "https://placehold.co/200x200"}
//                     alt={product.title || "No Title"}
//                     sx={{
//                       objectFit: "contain",
//                       //   padding: 2,
//                       background: "#f5f5f5",
//                       width: "100%",
//                     }}
//                   />
//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography
//                       variant="h6"
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "12px",
//                         minHeight: "20px",
//                       }}
//                     >
//                       {product.title || "No Title"}
//                     </Typography>
//                     <Typography variant="body1" sx={{fontSize:'14px'}} color="text.secondary">
//                       Price: ${product.price || "N/A"}
//                     </Typography>
//                   </CardContent>

//                   {/*  Buttons Section */}
//                   <div
//                     style={{
//                       width: "100%",
//                       display: "flex",
//                       justifyContent: "space-between",
//                       padding: "10px",
//                     }}
//                   >
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       size="small"
//                       onClick={() => handleEdit(product)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       size='small'
//                       onClick={() => handleDelete(product.id)}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 </Card>
//               </Grid>
//             ))
//           ) : (
//             <Typography
//               variant="h6"
//               sx={{ textAlign: "center", width: "100%" }}
//             >
//               No Products Available
//             </Typography>
//           )}
//         </Grid>
//       </div>
//     </ThemeProvider>
//   );
// };

// export default Products;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api,{fetchproducts} from "./api"; // Import Axios instance
import { ThemeProvider } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import theme from "../../Buttons/Themebutton";
import InputField from "../Auth/InputField";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Paper,
  Input,
  CircularProgress
} from "@mui/material";

// Product validation schema
const productSchema = yup.object().shape({
  title: yup.string().required("Product name is required"),
  price: yup
    .number()
    .typeError("Price should be a number")
    .positive("Price must be greater than zero")
    .required("Price is required"),
  image: yup.mixed().required("Please upload an image"),
});

const Products = () => {
  const [products, setProducts] = useState([]); // Store products
  const [editingProduct, setEditingProduct] = useState(null); // Track product being edited
  const [deletedProductIds, setDeletedProductIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // Controls form visibility
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: { title: "", price: "", image: null },
  });

  // Fetch products on component mount
  useEffect(() => {
    const getProducts = async () => {
      try {
        const fetchedProducts = await fetchproducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }finally {
        setLoading(false)
      }
    };

    getProducts();
  }, []);


  // Handle image selection & validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const resizedImage = await resizeImage(reader.result, 300, 300);
        setValue("image", resizedImage);
      };
    }
  };

  // Image resizing function
  const resizeImage = (base64Str, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        ctx.drawImage(img, 0, 0, maxWidth, maxHeight);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
    });
  };

  // Handle form submission (Create & Update)
  const onSubmit = async (data) => {
    try {
      if (editingProduct) {
        console.log("Updating product:", editingProduct.id, data); // Debugging
        const response = await api.put(`/products/${editingProduct.id}`, data);
        
        console.log("PUT Response:", response); // Check Network response
        setProducts((prev) =>
          prev.map((prod) =>
            prod.id === editingProduct.id ? { ...prod, ...data } : prod
          )
        );
        setEditingProduct(null);
      } else {
        console.log("Creating product:", data); // Debugging
        const response = await api.post("/products", data);
        
        console.log("POST Response:", response); // Check Network response
        const newProduct = {
          ...response.data,
          id: Date.now(),
          fromLocal: true, // Mark as locally created
        };
  
        // Retrieve existing local products from local storage
        const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
        
        // Update local state
        setProducts((prev) => [...prev, newProduct]); 
        
        localProducts.push(newProduct);
        localStorage.setItem("localProducts", JSON.stringify(localProducts));
      }
  
      reset();
      setShowForm(false); // Hide form after submission
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("Error occurred. Check console for details.");
    }
  };
  

  // Handle delete product
  const handleDelete = async (id, event) => {
    event.stopPropagation();

    try {
      console.log("Deleting product with ID:", id); // Log before request
      // Send Delete request to API
      const response = await api.delete(`/products/${id}`);
      console.log("DELETE Response:", response); // Log API response

      if (response.status === 200) {
        setProducts((prevProducts) => {
          // filter out the deleted product
          const updatedProducts = prevProducts.filter(
            (product) => product.id !== id
          );
          const deletedIds =
            JSON.parse(localStorage.getItem("deletedProductIds")) || [];
          deletedIds.push(id);
          localStorage.setItem("deletedProductIds", JSON.stringify(deletedIds));
          return updatedProducts;
        });
        setDeletedProductIds((prev) => [...prev, id]);
        alert("product deleted successfully !");
      } else {
        alert("Failed to delete product  from api");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Check console for details.");
    }
  };

  // Handle edit product
  const handleEdit = (product,event) => {
    if (event){
      event.stopPropagation();}

    setEditingProduct(product);
    setValue("title", product.title);
    setValue("price", product.price);
    setValue("image", product.image);
    setShowForm(true); // Show form when editing
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "20px" }}>
        <h1 style={{ textAlign: "center" }}>Products</h1>

        {/* Show 'Add Product' button when form is hidden */}
        {!showForm && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(true)}
            sx={{ display: "block", margin: "20px auto" }}
          >
            Add Product
          </Button>
        )}

        {/* Product Form - Visible only when showForm is true */}
        {showForm && (
          <Paper
            sx={{ padding: 3, marginBottom: 3, maxWidth: 500, mx: "auto" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                control={control}
                name="title"
                label="Product Name"
                type="text"
                error={errors.title?.message}
              />
              <InputField
                control={control}
                name="price"
                label="Price"
                type="number"
                error={errors.price?.message}
              />

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                fullWidth
                sx={{ mb: 2 }}
              />
              {errors.image && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {errors.image.message}
                </p>
              )}

              <Button type="submit" variant="raise" >
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
              <Button
                variant="raise"
                sx={{position:'relative' , left:'273px'}} 
                onClick={() => {
                  setShowForm(false);
                  reset();
                  setEditingProduct(null);
                }}
              >
                Cancel
              </Button>
            </form>
          </Paper>
        )}
        {loading? (
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:'100vw',height:'100vh'}}>
            <CircularProgress/>
          </div>
        ):(
          <Grid container spacing={3}>
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    width: "100%",
                    height: 350,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: 3,
                    borderRadius: 2,
                  }}
                  onClick={() => navigate(`/products/${product.id}`)} // Navigate to ProductDetail.js
                  style={{ cursor: "pointer" }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    image={product.image || "https://placehold.co/200x200"}
                    alt={product.title || "No Title"}
                    sx={{
                      objectFit: "contain",
                      background: "#f5f5f5",
                      width: "100%",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "12px",
                        minHeight: "20px",
                      }}
                    >
                      {product.title || "No Title"}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: "14px" }}
                      color="text.secondary"
                    >
                      Price: ${product.price || "N/A"}
                    </Typography>
                  </CardContent>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      // size="small"
                      onClick={(e) => handleEdit(product,e)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      // size="small"
                      onClick={(event) => handleDelete(product.id, event)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", width: "100%" }}
            >
              No Products Available
            </Typography>
          )}
        </Grid>
        )
        }
      </div>
    </ThemeProvider>
  );
};

export default Products;
