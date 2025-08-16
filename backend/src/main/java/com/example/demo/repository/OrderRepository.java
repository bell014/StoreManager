package com.example.demo.repository;

import com.example.demo.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface OrderRepository extends MongoRepository<Order, String> {
    long countByStatus(String status);
    List<Order> findByStatus(String status);
}