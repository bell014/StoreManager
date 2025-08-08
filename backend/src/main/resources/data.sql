-- Sample Suppliers
INSERT INTO supplier (name, contact, address) VALUES 
('Tech Supplies Inc', 'John Smith', '123 Tech Street, Silicon Valley'),
('Office Essentials', 'Sarah Johnson', '456 Business Ave, New York'),
('Global Distributors', 'Mike Brown', '789 Trade Blvd, Chicago');

-- Sample Products
INSERT INTO product (name, description, price, supplier_id) VALUES 
('Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 1),
('Mechanical Keyboard', 'RGB mechanical keyboard', 89.99, 1),
('Notebook', 'Premium leather notebook', 19.99, 2),
('Desk Lamp', 'Adjustable LED desk lamp', 39.99, 3),
('Monitor Stand', 'Wooden monitor stand', 49.99, 3);

-- Sample Orders
INSERT INTO orders (order_date, supplier_id, items) VALUES 
('2023-05-01', 1, '1,2'),
('2023-05-02', 2, '3'),
('2023-05-03', 3, '4,5');

-- Sample Inventory
INSERT INTO inventory (product_id, quantity) VALUES 
(1, 50),
(2, 30),
(3, 100),
(4, 25),
(5, 40);
