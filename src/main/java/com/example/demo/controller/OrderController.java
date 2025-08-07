package com.example.demo.controller;

import com.example.demo.model.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.demo.service.OrderService;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final com.example.demo.service.OrderService orderService;
    
    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Optional<Order> order = orderService.getOrderById(id);
        return order.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
 // Assuming saveOrder returns the saved order with generated ID
 return orderService.saveOrder(order);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        Optional<Order> order = orderService.getOrderById(id);
        if (order.isPresent()) {
            Order existingOrder = order.get();
            existingOrder.setOrderDate(orderDetails.getOrderDate());
            existingOrder.setSupplierId(orderDetails.getSupplierId());
            existingOrder.setItems(orderDetails.getItems());
            // Set other fields as needed
            return ResponseEntity.ok(orderService.saveOrder(existingOrder));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
 Optional<Order> order = orderService.getOrderById(id);
 if (order.isPresent()) {
 orderService.deleteOrder(id);
 return ResponseEntity.noContent().build();
        } else {
 return ResponseEntity.notFound().build();
        }
    }
}