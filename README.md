# Product Catalog API

This repository contains a **Product Catalog API** built using **Node.js** and **Express.js**, designed to manage products, categories, product variants, and inventory for an e-commerce platform. The API provides functionality for adding, retrieving, updating, and removing products, managing categories, handling product variants, and keeping track of inventory levels.

## Setup and Installation

### Prerequisites
Before you begin, ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) (or use MongoDB Atlas for cloud storage)

### Step-by-Step Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Atsijibomi/Product-Catalog-API.git
    cd Product-Catalog-API
    ```

2. Install the required dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables. Create a `.env` file in the root directory of the project with the following content:
    ```text
    PORT=5000
    MONGO_URI=your-mongodb-connection-string
    ```

4. Start the server:
    ```bash
    npm run dev
    ```

    The server will be running on `http://localhost:5000`.

---

## API Documentation

This API provides several routes for managing products, categories, variants, and inventory. Below is the list of available endpoints and their descriptions.

### Product Management Endpoints

#### 1. **Create Product**
- **URL:** `/api/products`
- **Method:** `POST`
- **Description:** Creates a new product in the catalog.
- **Request Body:**
    ```json
    {
      "name": "Smartphone",
      "description": "Latest model with advanced features.",
      "price": 799.99,
      "category": "Electronics",
      "stock": 100
    }
    ```
- **Response:**
    ```json
    {
      "message": "Product created successfully",
      "product": {
        "_id": "product-id",
        "name": "Smartphone",
        "description": "Latest model with advanced features.",
        "price": 799.99,
        "category": "Electronics",
        "stock": 100
      }
    }
    ```

#### 2. **Get All Products**
- **URL:** `/api/products`
- **Method:** `GET`
- **Description:** Retrieves all products in the catalog.
- **Response:**
    ```json
    [
      {
        "_id": "product-id",
        "name": "Smartphone",
        "description": "Latest model with advanced features.",
        "price": 799.99,
        "category": "Electronics",
        "stock": 100
      }
    ]
    ```

#### 3. **Get Product by ID**
- **URL:** `/api/products/:id`
- **Method:** `GET`
- **Description:** Retrieves a product by its unique ID.
- **Response:**
    ```json
    {
      "_id": "product-id",
      "name": "Smartphone",
      "description": "Latest model with advanced features.",
      "price": 799.99,
      "category": "Electronics",
      "stock": 100
    }
    ```

#### 4. **Update Product**
- **URL:** `/api/products/:id`
- **Method:** `PUT`
- **Description:** Updates a product's details by its ID.
- **Request Body:**
    ```json
    {
      "name": "Smartphone",
      "description": "Updated model with more features.",
      "price": 899.99,
      "category": "Electronics",
      "stock": 120
    }
    ```
- **Response:**
    ```json
    {
      "_id": "product-id",
      "name": "Smartphone",
      "description": "Updated model with more features.",
      "price": 899.99,
      "category": "Electronics",
      "stock": 120
    }
    ```

#### 5. **Delete Product**
- **URL:** `/api/products/:id`
- **Method:** `DELETE`
- **Description:** Deletes a product by its ID.
- **Response:**
    ```json
    {
      "message": "Product deleted successfully"
    }
    ```

### Category Management Endpoints

#### 1. **Create Category**
- **URL:** `/api/categories`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
      "name": "Electronics",
      "description": "Devices and gadgets."
    }
    ```
- **Response:**
    ```json
    {
      "message": "Category created successfully",
      "category": {
        "_id": "category-id",
        "name": "Electronics",
        "description": "Devices and gadgets."
      }
    }
    ```

#### 2. **Get All Categories**
- **URL:** `/api/categories`
- **Method:** `GET`
- **Response:**
    ```json
    [
      {
        "_id": "category-id",
        "name": "Electronics",
        "description": "Devices and gadgets."
      }
    ]
    ```

#### 3. **Delete Category**
- **URL:** `/api/categories/:id`
- **Method:** `DELETE`
- **Response:**
    ```json
    {
      "message": "Category deleted successfully"
    }
    ```

---

## Example Requests and Responses

### Create Product Request

**Request:**
```bash
POST /api/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "A high-performance laptop.",
  "price": 1200,
  "category": "Electronics",
  "stock": 50
}

## Assumptions

- The API assumes that MongoDB is running locally or on a cloud service (e.g., MongoDB Atlas) and the connection string is correctly configured in the `.env` file.
- The categories are defined upfront and cannot be dynamically changed through the API without administrative permissions.
- Product variants (like size, color) are assumed to be pre-defined and not dynamically generated.
- The API expects all requests to follow the defined validation schema, and errors will be thrown if invalid data is provided.

## Limitations

- The API currently only supports basic CRUD operations (Create, Read, Update, Delete) for products, categories, variants, and inventory.
- Search functionality is very basic, limited to exact matches of product attributes.
- The API does not include user authentication or authorization, so all endpoints are publicly accessible (a future enhancement could add roles and permissions).
- Inventory updates are done manually by sending requests to update stock levels. There's no automatic tracking of inventory changes (e.g., when an order is placed).
- The current implementation does not handle pagination or filtering for retrieving large sets of data, which could cause performance issues when scaling.
- Basic error handling is in place, but more sophisticated error tracking and logging can be implemented for production use.

