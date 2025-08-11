package com.example.demo.config;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Configuration
public class MongoDataInitializer {

    @Bean
    public CommandLineRunner initData(
            ProductRepository productRepository,
            SupplierRepository supplierRepository,
            InventoryRepository inventoryRepository,
            OrderRepository orderRepository,
            OrderItemsRepository orderItemsRepository) {
        return args -> {
            // Clear existing data
            productRepository.deleteAll();
            supplierRepository.deleteAll();
            inventoryRepository.deleteAll();
            orderRepository.deleteAll();
            orderItemsRepository.deleteAll();

            // Create realistic suppliers
            Supplier supplier1 = supplierRepository.save(new Supplier(
                "sup1", "TechGear Inc", "contact@techgear.com", "100 Tech Park", 
                "+1 (555) 123-4567", "www.techgear.com"));
            
            Supplier supplier2 = supplierRepository.save(new Supplier(
                "sup2", "OfficeSupplies Co", "sales@officesupplies.com", "200 Business Ave", 
                "+1 (555) 987-6543", "www.officesupplies.com"));
            
            Supplier supplier3 = supplierRepository.save(new Supplier(
                "sup3", "HomeElectronics Ltd", "info@homeelectronics.com", "300 Digital Lane", 
                "+1 (555) 456-7890", "www.homeelectronics.com"));

            // Create realistic products
            List<Product> products = Arrays.asList(
                new Product("prod1", "UltraBook Pro", "15.6\" 4K Touchscreen, 16GB RAM, 1TB SSD", 1499.99, supplier1.getId()),
                new Product("prod2", "Gaming Monitor", "32\" QHD 165Hz, 1ms Response", 499.99, supplier1.getId()),
                new Product("prod3", "Wireless Keyboard", "Ergonomic, Bluetooth, Backlit", 79.99, supplier2.getId()),
                new Product("prod4", "Office Chair", "Ergonomic, Adjustable, Mesh Back", 299.99, supplier2.getId()),
                new Product("prod5", "Smart Speaker", "Voice Assistant, Hi-Fi Sound", 129.99, supplier3.getId()),
                new Product("prod6", "Robot Vacuum", "Smart Mapping, Self-Charging", 399.99, supplier3.getId())
            );
            productRepository.saveAll(products);

            // Create inventory with realistic quantities
            inventoryRepository.saveAll(Arrays.asList(
                new Inventory("prod1", 150, "Warehouse A, Shelf 12"),
                new Inventory("prod2", 80, "Warehouse A, Shelf 5"),
                new Inventory("prod3", 300, "Warehouse B, Shelf 2"),
                new Inventory("prod4", 120, "Warehouse B, Shelf 8"),
                new Inventory("prod5", 250, "Warehouse C, Shelf 1"),
                new Inventory("prod6", 90, "Warehouse C, Shelf 3")
            ));

            // Create realistic orders with statuses
            Order order1 = orderRepository.save(new Order(
                "ord1", "cust1001", "processing", new Date(), 
                "John Smith", "john.smith@example.com", "123 Main St, Anytown"));
                
            Order order2 = orderRepository.save(new Order(
                "ord2", "cust1002", "shipped", new Date(System.currentTimeMillis() - 86400000), 
                "Sarah Johnson", "sarah.j@example.com", "456 Oak Ave, Somewhere"));
                
            Order order3 = orderRepository.save(new Order(
                "ord3", "cust1003", "delivered", new Date(System.currentTimeMillis() - 172800000), 
                "Michael Brown", "michael.b@example.com", "789 Pine Rd, Anycity"));

            // Create realistic order items
            List<OrderItem> items = Arrays.asList(
                new OrderItem(order1.getId(), "prod1", 1, 1499.99),
                new OrderItem(order1.getId(), "prod3", 2, 79.99),
                new OrderItem(order2.getId(), "prod2", 1, 499.99),
                new OrderItem(order2.getId(), "prod5", 3, 129.99),
                new OrderItem(order3.getId(), "prod4", 1, 299.99),
                new OrderItem(order3.getId(), "prod6", 1, 399.99)
            );
            orderItemsRepository.saveAll(items);

            // Update orders with items
            order1.setItems(Arrays.asList(items.get(0), items.get(1)));
            order2.setItems(Arrays.asList(items.get(2), items.get(3)));
            order3.setItems(Arrays.asList(items.get(4), items.get(5)));
            
            orderRepository.saveAll(Arrays.asList(order1, order2, order3));
        };
    }
}
