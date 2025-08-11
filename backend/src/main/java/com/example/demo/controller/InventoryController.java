package com.example.demo.controller;

import com.example.demo.model.Inventory;
import com.example.demo.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventory() {
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Inventory> getInventoryByProductId(@PathVariable String productId) {
        Optional<Inventory> inventory = inventoryService.getInventoryByProductId(productId);
        return inventory.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Inventory> createInventory(@RequestBody Inventory inventory) {
        Inventory savedInventory = inventoryService.saveInventory(inventory);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedInventory);
    }

    @PutMapping("/{productId}")
    public ResponseEntity<Inventory> updateInventory(@PathVariable String productId, @RequestBody Inventory inventoryDetails) {
        Optional<Inventory> optionalInventory = inventoryService.getInventoryByProductId(productId);
        if (optionalInventory.isPresent()) {
            Inventory existingInventory = optionalInventory.get();
            existingInventory.setQuantity(inventoryDetails.getQuantity());
            existingInventory.setLocation(inventoryDetails.getLocation());
            return ResponseEntity.ok(inventoryService.saveInventory(existingInventory));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> deleteInventory(@PathVariable String productId) {
        Optional<Inventory> optionalInventory = inventoryService.getInventoryByProductId(productId);
        if (optionalInventory.isPresent()) {
            inventoryService.deleteInventoryByProductId(productId);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}