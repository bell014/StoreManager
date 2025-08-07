package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.persistence.Table;

@Entity(name = "Inventory")
public class Inventory {

    @Id
    private Long productId; // Assuming productId is also the primary key for Inventory
    private int quantity;
    private String location;

    public Inventory() {
    }

    public Inventory(Long productId, int quantity, String location) {
        this.productId = productId;
        this.quantity = quantity;
        this.location = location;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}