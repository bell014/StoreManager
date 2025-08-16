package com.example.demo.repository;

import com.example.demo.model.OrderItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderItemsRepository extends MongoRepository<OrderItem, String> {
    List<OrderItem> findByOrderId(String orderId);
    List<OrderItem> findItemsById(String orderId);
    

    
    void deleteByOrderId(String orderId);
}
