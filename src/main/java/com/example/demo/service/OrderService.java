package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import com.example.demo.model.Order;
import com.example.demo.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * Retrieves all orders
     * @return List of all orders
     */
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /**
     * Finds an order by ID
     * @param id the order ID to find
     * @return Optional containing the order if found
     * @throws IllegalArgumentException if id is null
     */
    public Optional<Order> getOrderById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Order ID cannot be null");
        }
        return orderRepository.findById(id);
    }

    /**
     * Saves an order
     * @param order the order to save
     * @return the saved order
     * @throws IllegalArgumentException if order is null or missing required fields
     */
    public Order saveOrder(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("Order cannot be null");
        }
        if (order.getOrderDate() == null) {
            throw new IllegalArgumentException("Order date is required");
        }
        if (order.getItems() == null || order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order must have at least one item");
        }
        return orderRepository.save(order);
    }

    /**
     * Deletes an order by ID
     * @param id the order ID to delete
     * @throws IllegalArgumentException if id is null
     */
    public void deleteOrder(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("Order ID cannot be null");
        }
        orderRepository.deleteById(id);
    }
}