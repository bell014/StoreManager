package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Objects;

@Document
public class OrderItem {
    @Id
    private String id;
    
    @Field("order_id")
    private String orderId;
    
    @Field("product_id")
    private String productId;
    
    @Field("quantity")
    private Integer quantity;
    
    @Field("price")
    private Double price;

    public OrderItem() {
    }

    public OrderItem(String productId, Integer quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    public OrderItem(String orderId, String productId, Integer quantity, Double price) {
        this.orderId = orderId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItem orderItem = (OrderItem) o;
        return Objects.equals(id, orderItem.id) && 
               Objects.equals(orderId, orderItem.orderId) &&
               Objects.equals(productId, orderItem.productId) && 
               Objects.equals(quantity, orderItem.quantity) &&
               Objects.equals(price, orderItem.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, orderId, productId, quantity, price);
    }

    @Override
    public String toString() {
        return "OrderItem{" +
               "id='" + id + '\'' +
               ", orderId='" + orderId + '\'' +
               ", productId='" + productId + '\'' +
               ", quantity=" + quantity +
               ", price=" + price +
               '}';
    }
}
