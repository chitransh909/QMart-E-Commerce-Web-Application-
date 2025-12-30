import {
  AddOutlined,
  RemoveOutlined,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */

/**
 * @typedef {Object} CartItem -  - Data on product added to cart
 * 
 * @property {string} name - The name or title of the product in cart
 * @property {string} quantity - The quantity of product added to cart
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

/**
 * Returns the complete data on all products in cartData by searching in productsData
 *
 * @param { Array.<{ productId: String, quantity: Number }> } cartData
 *    Array of objects with productId and quantity of products in cart
 * 
 * @param { Array.<Product> } productsData
 *    Array of objects with complete data on all available products
 *
 * @returns { Array.<CartItem> }
 *    Array of objects with complete data on products in cart
 *
 */

export const generateCartItemsFrom = (cartData, quantity) => {
  let result = [];
  for(let i=0; i<cartData.length; i++) {
    cartData[i].product.quantity = cartData[i].quantity;
    result.push(cartData[i].product)
  }
  return result
};
/**
 * Get the total value of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products added to the cart
 *
 * @returns { Number }
 *    Value of all items in the cart
 *
 */
export const getTotalCartValue = (items = []) => {
  if (items.length === 0) {return 0}
  let totalValue = 0
  for (let i=0; i<items.length; i++) {
    totalValue += items[i].cost * items[i].quantity
  }
  return totalValue
};

/**
 * Return the sum of quantities of all products added to the cart
 *
 * @param { Array.<CartItem> } items
 *    Array of objects with complete data on products in cart
 *
 * @returns { Number }
 *    Total quantity of products added to the cart
 *
 */
export const getTotalItems = (items = []) => {
  let totalItems = 0
  for (let i=0; i<items.length; i++) {
    totalItems += items[i].quantity
  }
  return totalItems
};

/**
 * Component to display the current quantity for a product and + and - buttons to update product quantity on cart
 * 
 * @param {Number} value
 *    Current quantity of product in cart
 * 
 * @param {Function} handleAdd
 *    Handler function which adds 1 more of a product to cart
 * 
 * @param {Function} handleDelete
 *    Handler function which reduces the quantity of a product in cart by 1
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const ItemQuantity = ({
  value,
  handleAdd,
  handleDelete,
  isReadOnly
}) => {
  if (isReadOnly) {
    return (
      <Box padding="0.5rem" data-testid="item-quantity">
        quantity: {value}
      </Box>
    )
  }

  return (
    <Stack direction="row" alignItems="center">
      <IconButton size="small" color="primary" onClick={handleDelete}>
        <RemoveOutlined />
      </IconButton>
      <Box padding="0.5rem" data-testid="item-quantity">
        {value}
      </Box>
      <IconButton size="small" color="primary" onClick={handleAdd}>
        <AddOutlined />
      </IconButton>
    </Stack>
  );
};

/**
 * Component to display the Cart view
 * 
 * @param { Array.<Product> } products
 *    Array of objects with complete data of all available products
 * 
 * @param { Array.<Product> } items
 *    Array of objects with complete data on products in cart
 * 
 * @param {Function} handleDelete
 *    Current quantity of product in cart
 * 
 * @param {Boolean} isReadOnly
 *    If product quantity on cart is to be displayed as read only without the + - options to change quantity
 * 
 */
const Cart = ({
  products,
  items = [],
  handleQuantity,
  isReadOnly
}) => {
  const navigate = useNavigate()
  if (!items.length) {
    return (
      <Box className="cart empty">
        <ShoppingCartOutlined className="empty-cart-icon" />
        <Box color="#aaa" textAlign="center">
          Cart is empty. Add more items to the cart to checkout.
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Box className="cart">
          {items.map(item => (
              <Box display="flex" alignItems="flex-start" padding="1rem" key={item._id}>
                  <Box className="image-container">
                      <img
                          src= {item.image}
                          alt= {item.name}
                          width="100%"
                          height="100%"
                      />
                    </Box>
                  <Box
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                      height="6rem"
                      paddingX="1rem"
                  >
                      <div>{item.name}</div>
                      <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                      >
                        <ItemQuantity value = {item.quantity}
                        handleDelete = {async() => {handleQuantity(
                          items,
                          products,
                          item._id,
                          item.quantity -1
                        )}}
                        handleAdd = {async() => {handleQuantity(
                          items,
                          products,
                          item._id,
                          item.quantity +1
                        )}}
                        isReadOnly = {isReadOnly}
                        />
                        <Box padding="0.5rem" fontWeight="700">
                            ${item.cost}
                        </Box>
                      </Box>
                    </Box>
                </Box>
            ))
          }
        <Box
          padding="1rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box color="#3C3C3C" alignSelf="center">
            Order total
          </Box>
          <Box
            color="#3C3C3C"
            fontWeight="700"
            fontSize="1.5rem"
            alignSelf="center"
            data-testid="cart-total"
          >
            ${getTotalCartValue(items)}
          </Box>
        </Box>
        {isReadOnly? null :
          <Box display="flex" justifyContent="flex-end" className="cart-footer">
            <Button
              color="primary"
              variant="contained"
              startIcon={<ShoppingCart />}
              className="checkout-btn"
              onClick={() => navigate("/checkout", { from: "HomePage" })}
            >
              Checkout
            </Button>
          </Box>
        }
      </Box>
      {isReadOnly?
        <Box className="cart">
          <Box
            padding="1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              paddingTop="1rem"
              color="#3C3C3C"
              fontWeight="720"
              fontSize="1.5rem"
              alignSelf="center"
              data-testid="cart-total"
            >
              Order Details
            </Box>
          </Box>
          <Box
            padding="0.5rem 1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="#3C3C3C" alignSelf="center">
              Products
            </Box>
            <Box color="#3C3C3C" alignSelf="center">
              {getTotalItems(items)}
            </Box>
          </Box>
          <Box
            padding="0.5rem 1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="#3C3C3C" alignSelf="center">
              Subtotal
            </Box>
            <Box color="#3C3C3C" alignSelf="center">
              ${getTotalCartValue(items)}
            </Box>
          </Box>
          <Box
            padding="0.5rem 1rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box color="#3C3C3C" alignSelf="center">
              Shipping Charges
            </Box>
            <Box color="#3C3C3C" alignSelf="center">
              $0
            </Box>
          </Box>
          <Box
            padding="1rem"
            paddingTop="0.5rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              color="#3C3C3C"
              fontWeight="700"
              fontSize="1.4rem"
              alignSelf="center"
              data-testid="cart-total"
            >
              Total
            </Box>
            <Box
              color="#3C3C3C"
              fontWeight="800"
              fontSize="1.4rem"
              alignSelf="center"
              data-testid="cart-total"
            >
              ${getTotalCartValue(items)}
            </Box>
          </Box>
        </Box>:
      null
      }
    </>
  );
};

export default Cart;