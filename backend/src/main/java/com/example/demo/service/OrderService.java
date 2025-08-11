package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.example.demo.model.Order;
import com.example.demo.model.OrderItem;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.OrderItemsRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemsRepository orderItemsRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemsRepository orderItemsRepository) {
        this.orderRepository = orderRepository;
        this.orderItemsRepository = orderItemsRepository;
    }

    public List<Order> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        orders.forEach(order -> {
            if (order.getItems() == null) {
                order.setItems(List.of());
            }
        });
        return orders;
    }

    public Optional<Order> getOrderById(String id) {
        if (id == null) {
            throw new IllegalArgumentException("Order ID cannot be null");
        }
        return orderRepository.findById(id);
    }

    public List<OrderItem> getOrderItems(String orderId) {
        return orderItemsRepository.findItemsById(orderId);
    }

    public Order saveOrder(Order order) {
        if (order == null) {
            throw new IllegalArgumentException("Order cannot be null");
        }
        if (order.getOrderDate() == null) {
            throw new IllegalArgumentException("Order date is required");
        }
        return orderRepository.save(order);
    }

    public void updateOrderItems(String orderId, List<OrderItem> items) {
        if (orderId == null) {
            throw new IllegalArgumentException("Order ID cannot be null");
        }
        orderItemsRepository.updateOrderItems(orderId, items);
    }

    public void deleteOrder(String id) {
        if (id == null) {
            throw new IllegalArgumentException("Order ID cannot be null");
        }
        // Delete the order (items are embedded and will be deleted automatically)
        orderRepository.deleteById(id);
    }
}