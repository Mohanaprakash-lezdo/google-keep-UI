import React, { useState, useEffect } from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import api from "./api";
import { Card, CardMedia, CardContent, Typography, Button, Container } from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate(); // For navigation
  const location = useLocation(); 
  const [product, setProduct] = useState(location.state?.product || null);

  useEffect(() => {
    if (!product)
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id,product]);

  if (!product) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

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
