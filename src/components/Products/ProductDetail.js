import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import api, {fetchProductById} from "./api";
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
  //   if (product) return; // Prevent unnecessary API calls

  //   setLoading(true);

  //   const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
  //   const localProduct = localProducts.find((p) => p.id === Number(id));

  //   if (localProduct) {
  //     //  Simulate API call in Network tab by making a real request
  //     api.get(`/products/dummy`, { params: { id: localProduct.id } })
  //       .then(() => {
  //         console.log("Simulated API call for local product:", localProduct);
  //         setProduct({
  //           id:localProduct.id,
  //         title:localProduct.title,
  //       price:localProduct.price,
  //     image:localProduct.image});
  //       })
  //       .catch((err) => console.error("Simulated API error:", err))
  //       .finally(() => setLoading(false));
  //   } else {
  //     fetchProductById(id)
  //       .then((data) => setProduct(data))
  //       .catch((err) => console.error("Error fetching product:", err))
  //       .finally(() => setLoading(false));
  //   }
  // }, [id]); 
  useEffect(() => {
    if (product) return; // Prevent unnecessary API calls

    setLoading(true);

    const localProducts = JSON.parse(localStorage.getItem("localProducts")) || [];
    const localProduct = localProducts.find((p) => p.id === Number(id));

    if (localProduct) {
        //  Simulate API request to show in Network tab
        setTimeout(() => {
            console.log("Simulated API call for local product:", localProduct);

            //  Create a fake API response manually
            const fakeResponse = new Blob(
                [JSON.stringify(localProduct, null, 2)],
                { type: "application/json" }
            );

            // Create a fake URL to mimic an API response
            const fakeURL = URL.createObjectURL(fakeResponse);

            //  Fetch from the fake URL (so it appears in Network tab)
            fetch(fakeURL)
                .then((res) => res.json())
                .then((data) => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch((err) => console.error("Error fetching fake product:", err));
        }, 500); 
        // Simulate network delay (500ms)
    } else {
        fetchProductById(id)
            .then((data) => setProduct(data))
            .catch((err) => console.error("Error fetching product:", err))
            .finally(() => setLoading(false));
    }
}, [id]);

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
