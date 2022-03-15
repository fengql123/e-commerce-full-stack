# #E-Commerce API

An API that has the basic e-commerce functions.

## ###Functionalities

1. Sign Up (post request to /user/create returns user id)
2. Login (get request to /user/login returns user id)
3. Update User info (put request to /user/:id)
4. Delete a User (delete request to /user/:id)
5. Get Single User Info (get request to /user/:id)
6. Get a user's checkout info (get request to /user/:id/checkout)
7. Add a product by a Seller (post request to /user/:id/product)
8. Get all product info (get request to /user/:id/product)
9. Get single product info (get request to /user/:id/product/:productId)
10. Add a product to cart (post request to /user/:id/product/:productId/addToCart **make sure attach quantity wanted to req.body as req.body.productQt**)
11. Create a cart for a user (post request to /user/:id/cart **each user can only create one cart**)
12. Get a user's cart's items (get request to /user/:id/cart)
13. Send order (post request to /user/:id/cart/sendOrder **this will empty the cart but will not delete the cart**)
14. Check a single user's order (get request to /user/:id/order)

**Feel free to give me some feedbacks!**
