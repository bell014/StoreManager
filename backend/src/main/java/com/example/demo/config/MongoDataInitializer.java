package com.example.demo.config;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Arrays;

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

            // Create suppliers
            Supplier supplier1 = supplierRepository.save(new Supplier("sup1", "Acme Corp", "contact@acme.com", "123 Main St"));
            Supplier supplier2 = supplierRepository.save(new Supplier("sup2", "Globex", "sales@globex.com", "456 Oak Ave"));

            // Create products
            Product product1 = productRepository.save(new Product("prod1", "Laptop", "High performance laptop", 999.99, supplier1.getId()));
            Product product2 = productRepository.save(new Product("prod2", "Monitor", "27\" 4K monitor", 299.99, supplier1.getId()));
            Product product3 = productRepository.save(new Product("prod3", "Keyboard", "Mechanical keyboard", 89.99, supplier2.getId()));

            // Create inventory
            inventoryRepository.save(new Inventory(product1.getId(), 50, "Warehouse A"));
            inventoryRepository.save(new Inventory(product2.getId(), 100, "Warehouse B"));
            inventoryRepository.save(new Inventory(product3.getId(), 200, "Warehouse C"));

            // Create orders
            Order order1 = orderRepository.save(new Order("ord1", "cust1", "pending"));
            Order order2 = orderRepository.save(new Order("ord2", "cust2", "shipped"));

            // Create order items
            OrderItem item1 = new OrderItem(order1.getId(), product1.getId(), 1, product1.getPrice());
            OrderItem item2 = new OrderItem(order1.getId(), product2.getId(), 2, product2.getPrice());
            OrderItem item3 = new OrderItem(order2.getId(), product3.getId(), 3, product3.getPrice());
            
            orderItemsRepository.save(item1);
            orderItemsRepository.save(item2);
            orderItemsRepository.save(item3);
            
            // Update orders with items
            order1.setItems(Arrays.asList(item1, item2));
            order2.setItems(Arrays.asList(item3));
            orderRepository.save(order1);
            orderRepository.save(order2);
        };
    }
}
