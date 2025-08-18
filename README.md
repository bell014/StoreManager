# Retail Store Management System

A full-stack application for managing retail store operations, including inventory, products, suppliers, and orders.

![Project Screenshot](https://via.placeholder.com/800x400?text=Store+Management+System+Screenshot)

## Features

- **Product Management**: Track all store products with details
- **Inventory Control**: Monitor and update stock levels
- **Supplier Management**: Maintain supplier information
- **Order Processing**: Handle customer orders and fulfillment
- **User Authentication**: Secure login and access control

## Technologies

### Frontend
- React with TypeScript
- Vite build tool
- Tailwind CSS for styling
- Axios for API communication

### Backend
- Spring Boot (Java)
- SQLite database
- JWT authentication
- RESTful API design

## Getting Started

### Prerequisites
- Node.js (v16+) for frontend
- Java JDK (17+) for backend
- Maven for backend dependencies

### Installation

1. **Clone the repository**
```sh
git clone https://github.com/your-repo/store-management.git
cd store-management
```

2. **Backend Setup**
```sh
cd backend
mvn install
mvn spring-boot:run
```

3. **Frontend Setup**
```sh
cd ../frontend
npm install
npm run dev
```

## API Documentation

The backend provides RESTful endpoints for all operations:

### Products
- `GET /products` - List all products
- `POST /products` - Create new product
- `GET /products/{id}` - Get product details
- `PUT /products/{id}` - Update product
- `DELETE /products/{id}` - Remove product

### Inventory
- `GET /inventory` - Current stock levels
- `POST /inventory/add` - Add stock
- `POST /inventory/remove` - Remove stock

### Orders
- `GET /orders` - List all orders
- `POST /orders` - Create new order
- `GET /orders/{id}` - Get order details

## Screenshots

1. **Dashboard View**  
![Dashboard](https://via.placeholder.com/400x200?text=Dashboard)

2. **Product Management**  
![Products](https://via.placeholder.com/400x200?text=Products)

3. **Order Processing**  
![Orders](https://via.placeholder.com/400x200?text=Orders)

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
