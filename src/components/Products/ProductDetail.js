import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import {fetchProductById} from "./api";
import { Card, CardMedia, CardContent, Typography, Button, Container,CircularProgress,Box } from "@mui/material";

const ProductDetail = () => { 
  const { id } = useParams();
   // Get product ID from URL
  const navigate = useNavigate();
   // For navigation
  const location = useLocation();   
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading,setLoading]=useState(!product)

  // useEffect(() => {
  //   if (product) return;
  //   setLoading(true);
  //   // Avoid  re-fetching  if already available 
  //   // First, check local storage for the product
  //   const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
  //   const localProduct = localProducts.find((p) => p.id === Number(id));

  //   if(localProduct){
  //     setProduct(localProduct);
  //     setLoading(false);
  //   }else{
  //     // Fetch from  Api  if not  found  locally 
  //     api
  //     .get(`/products/${id}`)
  //     .then((res) => setProduct(res.data))
  //     .catch((err) => console.error("Error fetching product:", err))
  //     .finally(()=>setLoading(false))
  //   }
    
  // }, [id,product]);
  // useEffect(() => {
  //   if (product) return;
  //   setLoading(true);

  //   const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
  //   const localProduct = localProducts.find((p) => p.id === Number(id));

  //   if (localProduct) {
  //     // Simulate  API request  to show  in  network tab 
  //     setTimeout(()=>{
  //       console.log("simulating  API call for  local product ",localProduct);
  //       setProduct(localProduct);
  //       setLoading(false);
  //     },500)
  //   } else {
  //     fetchProductById(id)
  //       .then(setProduct)
  //       .catch((err) => console.error("Error fetching product:", err))
  //       .finally(() => setLoading(false));
  //   }
  // }, [id, product]);
  useEffect(() => {
    if (product) return; // ✅ Prevents unnecessary API calls

    setLoading(true);

    const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
    const localProduct = localProducts.find((p) => p.id === Number(id));

    if (localProduct) {
      setTimeout(() => { // ✅ Simulated API call for Network tab
        console.log("Simulating API call for local product:", localProduct);
        setProduct(localProduct);
        setLoading(false);
      }, 500);
    } else {
      fetchProductById(id)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setLoading(false);
        });
    }
  }, [id]); //  Only runs when `id` changes


  // Show Circular Progress while fetching data
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width:'100vw',height: "100vh" }}>
        <CircularProgress  />
      </Box>
    );
  }

  if (!product) return null;
   // Prevent rendering if product is not found

  // if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ maxWidth: 600, margin: "auto", p: 3, boxShadow: 6 }}>
        <CardMedia component="img" height="350" image={product.image} alt={product.title} />
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {product.title}
          </Typography>
          <Typography variant="h6" sx={{ color: "green", my: 2 }}>
            Price: ${product.price}
          </Typography>
          <Typography variant="body1">{product.description}</Typography>
        </CardContent>
        <Button variant="contained" color="primary" sx={{ m: 2 }} onClick={() => navigate("/products")}>
          Back to Products
        </Button>
      </Card>
    </Container>
  );
};

export default ProductDetail;
