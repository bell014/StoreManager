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

    public List<Order> getAllOrders() {
        // Basic implementation returning an empty list for now
 return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        // Basic implementation returning empty Optional for now
 return orderRepository.findById(id);
    }

    public Order saveOrder(Order order) {
        // Basic implementation returning null for now
 return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
 orderRepository.deleteById(id);
    }
}