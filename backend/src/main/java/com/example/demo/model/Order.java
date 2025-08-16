package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(collection = "orders")
public class Order {
    public static final String STATUS_SUCCESS = "success";
    public static final String STATUS_PENDING = "pending";
    public static final String STATUS_DECLINED = "declined";
    
    @Id
    private String id;
    private Date orderDate;
    private String customerId;
    private String status;
    private String customerName;
    private String customerEmail;
    private String shippingAddress;
    private List<OrderItem> items;
    private String supplierId;

    public Order() {
        this.orderDate = new Date();
        this.status = STATUS_PENDING; // Default status
    }

    public boolean isSuccessful() {
        return STATUS_SUCCESS.equals(this.status);
    }

    public boolean isPending() {
        return STATUS_PENDING.equals(this.status);
    }

    public boolean isDeclined() {
        return STATUS_DECLINED.equals(this.status);
    }

    public Order(String id, String customerId, String status, Date orderDate, 
                String customerName, String customerEmail, String shippingAddress) {
        this.id = id;
        this.customerId = customerId;
        this.status = status;
        this.orderDate = orderDate;
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.shippingAddress = shippingAddress;
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

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public String getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(String supplierId) {
        this.supplierId = supplierId;
    }
}