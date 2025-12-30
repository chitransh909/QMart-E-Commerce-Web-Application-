import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <Card className="card">
      <CardMedia
        component="img"
        alt= {product.name}
        image= {product.image}
        className="productImage"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="h5">
          <b>${product.cost}</b>
        </Typography>
          <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions className="card-action">
        <Button className="button card-button" startIcon={<AddShoppingCartOutlined />} variant="text" onClick={handleAddToCart} >ADD TO CART</Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;