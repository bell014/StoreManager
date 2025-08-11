package com.example.demo;

import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.repository.OrderRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class MongoDBConnectionTest {

    @Autowired
    private OrderRepository orderRepository;

    @Test
    public void testMongoDBConnection() {
        // Verify repository is not null (Spring context loaded)
        assertNotNull(orderRepository);
    }

    @Test
    public void testBasicCRUDOperations() {
        // Create test data
        OrderItem item1 = new OrderItem("prod1", 2);
        OrderItem item2 = new OrderItem("prod2", 1);
        List<OrderItem> items = Arrays.asList(item1, item2);
        
        Order order = new Order(null, new Date(), "supplier1", items);
        
        // Test create
        Order savedOrder = orderRepository.save(order);
        assertNotNull(savedOrder.getId());
        
        // Test read
        Order foundOrder = orderRepository.findById(savedOrder.getId()).orElse(null);
        assertNotNull(foundOrder);
        assertEquals("supplier1", foundOrder.getSupplierId());
        assertEquals(2, foundOrder.getItems().size());
        
        // Test update
        foundOrder.setSupplierId("supplier2");
        Order updatedOrder = orderRepository.save(foundOrder);
        assertEquals("supplier2", updatedOrder.getSupplierId());
        
        // Test delete
        orderRepository.deleteById(updatedOrder.getId());
        assertFalse(orderRepository.existsById(updatedOrder.getId()));
    }
}
