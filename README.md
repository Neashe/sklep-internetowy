# Online Shop Website
This project is an online shop website that allows users to browse products, add items to their cart, and make purchases. It features two types of users: regular customers and employees. Regular customers can browse products, add them to their cart, and proceed to checkout. Employees have additional privileges such as modifying product listings and managing inventory.

![image](https://github.com/Neashe/sklep-internetowy/assets/72348810/fdc9dbd4-0591-44b0-b239-f25c7ad9ee3c)
# Key Features:
User Authentication and Authorization: Secure login and access control for both regular customers and employees.
Product Management: Employees can add, edit, and delete products from the inventory.
Shopping Cart: Users can add items to their cart and proceed to checkout for purchase.
Server Integration: Utilizes a server to handle requests and interact with the database.



# Technologies Used:
Frontend: React.js for the user interface and client-side interactions.
Backend: Flask, SQLAlchemy, and Flask-JWT-Extended for server-side logic, database management, and user authentication.
State Management: Context API and custom hooks for managing application state.
Styling: CSS for styling and layout design.
Routing: React Router for managing navigation within the application.

# Getting Started
1. Clone the repository
2. Install dependencies using `npm in` root project folder and `pip install -r requirements.txt` for backend.
3. Start backend server with `python app.py` and frontend with `npm start`

## Exploring user roles
To see the website from admin perspective you can use as login: `admin@test.com` password: `admin`.
For customer you can either create account with imaginary data or use e.g `test@gmail.com`, password: `test`

# Future development
Aspects of the app that are still in the development state:
- simulation of items purchase (with backend consistency)
- responsivity (view adjustments for tablets and phones)
- and more

![image](https://github.com/Neashe/sklep-internetowy/assets/72348810/f53af833-ac85-474c-be60-5790840f1c00)
