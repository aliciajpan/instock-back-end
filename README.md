# Team Killarney instock-back-end API Documentation

Front-end repo: https://github.com/aliciajpan/instock-front-end

## Overview
Base URL when run locally: http://localhost:8080

## Errors
The API may return a 400 error if the request is bad or a 500 error in the case that the server fails.
Trying to do operations on a warehouse or inventory item ID that does not exist will yield a 404 error.
Errors descriptions will be returned.

Example:
```
{
    "message": "Warehouse with ID 88 not found"
}
```

## Endpoint and HTTP verb combinations - Warehouse
### POST /api/warehouses
- Adds a new warehouse
  
Example request body:
```
{
    "warehouse_name": "Test",
    "address": "123 Test Rd",
    "city": "Toronto",
    "country": "Canada",
    "contact_name": "Jon Mazin",
    "contact_position": "Cool Guy",
    "contact_phone": "+1 (123) 456-7890",
    "contact_email": "test@email.com"
}
```

Example response body:
```
{
    "id": 14,
    "warehouse_name": "Test",
    "address": "123 Test Rd",
    "city": "Toronto",
    "country": "Canada",
    "contact_name": "Jon Mazin",
    "contact_position": "Cool Guy",
    "contact_phone": "+1 (123) 456-7890",
    "contact_email": "test@email.com"
}
```
Empty string, missing properties, and properties set to NULL are all invalid.

### PUT /api/warehouses/:id
- Edits an existing warehouse
  
Example request body:
```
{
    "warehouse_name": "Test NEW NAME",
    "address": "123 Test Rd",
    "city": "Toronto",
    "country": "Canada",
    "contact_name": "Jon Mazin",
    "contact_position": "Cool Guy",
    "contact_phone": "+1 (123) 456-7890",
    "contact_email": "test@email.com"
}
```

Example response body:
```
{
    "warehouse_name": "Test NEW NAME",
    "address": "123 Test Rd",
    "city": "Toronto",
    "country": "Canada",
    "contact_name": "Jon Mazin",
    "contact_position": "Cool Guy",
    "contact_phone": "+1 (123) 456-7890",
    "contact_email": "test@email.com"
}
```
ID cannot be replaced.

### GET /api/warehouses
- Returns array of information for all warehouses
  
Example response body:
```
[
    {
        "id": 1,
        "warehouse_name": "Manhattan",
        "address": "503 Broadway",
        "city": "New York",
        "country": "USA",
        "contact_name": "Parmin Aujla",
        "contact_position": "Warehouse Manager",
        "contact_phone": "+1 (646) 123-1234",
        "contact_email": "paujla@instock.com"
    },
    {
        "id": 2,
        "warehouse_name": "Washington",
        "address": "33 Pearl Street SW",
        "city": "Washington",
        "country": "USA",
        "contact_name": "Greame Lyon",
        "contact_position": "Warehouse Manager",
        "contact_phone": "+1 (646) 123-1234",
        "contact_email": "glyon@instock.com"
    }
]
```
**Additional functionality:** Can add search query parameters (`/api/warehouses?s={searchTerm}`)

**Additional functionality:** Can add sort query parameters (`/api/warehouses?sort_by={sortKey}&order_by={sortOrderBy}`) where`order_by` is optional

Search and sort can be used in combination.

### GET /api/warehouses/:id
- Returns information for a specific warehouse
- Replace ```:id``` with a warehouse's ID
  
Example response body:
```
{
    "id": 1,
    "warehouse_name": "Manhattan",
    "address": "503 Broadway",
    "city": "New York",
    "country": "USA",
    "contact_name": "Parmin Aujla",
    "contact_position": "Warehouse Manager",
    "contact_phone": "+1 (646) 123-1234",
    "contact_email": "paujla@instock.com"
}
```

### GET /api/warehouses/:id/inventories
- Returns inventory information for a specific warehouse
- Replace ```:id``` with a warehouse's ID
  
Example response body:
```
[
    {
        "id": 93,
        "item_name": "Test item EDITED",
        "category": "Electronics",
        "status": "In Stock",
        "quantity": 123
    }
]
```

### DELETE /api/warehouses/:id
- Deletes a warehouse
- Replace ```:id``` with a warehouse's ID
- No response body


## Endpoint and HTTP verb combinations - Inventory
### POST /api/inventories
- Adds a new inventory item
  
Example request body:
```
{
  "warehouse_id": 14,
  "item_name": "Test item",
  "description": "Good inventory item",
  "category": "Gear",
  "status": "Out of Stock",
  "quantity": 0
}
```

Example response body:
```
{
    "id": 93,
    "warehouse_id": 14,
    "item_name": "Test item",
    "description": "Good inventory item",
    "category": "Gear",
    "status": "Out of Stock",
    "quantity": 0
}
```
Empty string, missing properties, and properties set to NULL are all invalid.
The `warehouse_id` must belong to an existing warehouse.
Quantity must be a positive number. Quantity -> 0 means Status -> Out of Stock.

### PUT /api/inventories/:id
- Edits an existing inventory item
  
Example request body:
```
{
  "warehouse_id": 14,
  "item_name": "Test item EDITED",
  "description": "Nevermind, this item is mid",
  "category": "Electronics",
  "status": "In Stock",
  "quantity": 123
}
```

Example response body:
```
{
    "id": "93",
    "warehouse_id": 14,
    "item_name": "Test item EDITED",
    "description": "Nevermind, this item is mid",
    "category": "Electronics",
    "status": "In Stock",
    "quantity": 123
}
```
ID cannot be replaced.

### GET /api/inventories
- Returns array of information for all inventory items
  
Example response body:
```
[
    {
        "id": 93,
        "warehouse_name": "Test NEW NAME",
        "item_name": "Test item EDITED",
        "description": "Nevermind, this item is mid",
        "category": "Electronics",
        "status": "In Stock",
        "quantity": 123
    },
    {
        "id": 2,
        "warehouse_name": "Manhattan",
        "item_name": "Gym Bag",
        "description": "Made out of military-grade synthetic materials, this gym bag is highly durable, water resistant, and easy to clean.",
        "category": "Gear",
        "status": "Out of Stock",
        "quantity": 0
    }
]
```
Note that newly added inventory items will be shown at the top for ease of users seeing their newly created items first.

**Additional functionality:** Can add search query parameters (`/api/inventories?s={searchTerm}`)

**Additional functionality:** Can add sort query parameters (`/api/inventories?sort_by={sortKey}&order_by={sortOrderBy}`) where`order_by` is optional
Search and sort can be used in combination.

### GET /api/inventories/:id
- Returns information for a specific inventory item
- Replace ```:id``` with an inventory item's ID
  
Example response body:
```
{
    "id": 93,
    "item_name": "Test item EDITED",
    "description": "Nevermind, this item is mid",
    "category": "Electronics",
    "status": "In Stock",
    "quantity": 123,
    "warehouse_name": "Test NEW NAME"
}
```

### DELETE /api/inventories/:id
- Deletes an inventory item
- Replace ```:id``` with an inventory item's ID
- No response body

