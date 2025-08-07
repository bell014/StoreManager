package com.example.demo.model;

import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "orders") // Use "orders" as table name to avoid conflict with SQL keyword
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_date")
    private Date orderDate;
    private Long supplierId;
    private List<Long> items;

    public Order() {
    }

    public Order(Long id, Date orderDate, Long supplierId, List<Long> items) {
        this.id = id;
        this.orderDate = orderDate;
        this.supplierId = supplierId;
        this.items = items;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public Long getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Long supplierId) {
        this.supplierId = supplierId;
    }

    public List<Long> getItems() {
        return items;
    }

    public void setItems(List<Long> items) {
        this.items = items;
    }
}