package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(collection = "orders")
public class Order {
    @Id
    private String id;
    private Date orderDate;
    private String customerId;
    private String status;
    private List<OrderItem> items;

    public Order() {
        this.orderDate = new Date();
    }

    public Order(String id, String customerId, String status) {
        this.id = id;
        this.customerId = customerId;
        this.status = status;
        this.orderDate = new Date();
    }

    public Order(String id, Date orderDate, String customerId, List<OrderItem> items) {
        this.id = id;
        this.orderDate = orderDate;
        this.customerId = customerId;
        this.items = items;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }
}