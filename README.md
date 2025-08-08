# Retail Store Management Backend

Welcome to the backend for the Retail Store Management application! This Spring Boot application provides the core API services for managing products, suppliers, inventory, and customer orders.

## Technologies Used

*   **Spring Boot:** Provides the foundation for building a robust and easy-to-deploy application.
*   **Maven:** Used for dependency management and building the project.
*   **SQLite:** A lightweight, file-based database used for storing application data.

## Functionality

This backend exposes RESTful APIs to manage the following entities:

### Products

Manage information about the products available in the store.

*   `GET /products`: Get a list of all products.
*   `GET /products/{id}`: Get details of a specific product by ID.
*   `POST /products`: Create a new product.
*   `PUT /products/{id}`: Update an existing product by ID.
*   `DELETE /products/{id}`: Delete a product by ID.

### Suppliers

Manage information about product suppliers.

*   `GET /suppliers`: Get a list of all suppliers.
*   `GET /suppliers/{id}`: Get details of a specific supplier by ID.
*   `POST /suppliers`: Create a new supplier.
*   `PUT /suppliers/{id}`: Update an existing supplier by ID.
*   `DELETE /suppliers/{id}`: Delete a supplier by ID.

### Inventory

Manage the stock levels of products.

*   `GET /inventory`: Get the current inventory levels for all products.
*   `GET /inventory/{productId}`: Get the inventory level for a specific product.
*   `POST /inventory/add`: Add stock to a product (request body likely includes productId and quantity).
*   `POST /inventory/remove`: Remove stock from a product (request body likely includes productId and quantity).
*   `PUT /inventory/{productId}`: Update the inventory level for a specific product.

### Orders

Handle customer orders.

*   `GET /orders`: Get a list of all orders.
*   `GET /orders/{id}`: Get details of a specific order by ID.
*   `POST /orders`: Create a new order (request body likely includes product(s) and quantity(ies)).
*   `PUT /orders/{id}`: Update an existing order by ID.
*   `DELETE /orders/{id}`: Cancel or delete an order by ID.

## Getting Started

Server should run automatically when starting a workspace. To run manually, run:
```sh
mvn spring-boot:run
```