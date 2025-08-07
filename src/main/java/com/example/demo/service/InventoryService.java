package com.example.demo.service;

import com.example.demo.model.Inventory;
import com.example.demo.repository.InventoryRepository; // Ensure this import is correct
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List; // Ensure this import is correct

@Service 
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getAllInventory() {
 return inventoryRepository.findAll();
    }

    // Corrected return type to List<Inventory> as findByProductId likely returns a list
    /**
     * Retrieves inventory by product ID
     * @param productId the ID of the product to find inventory for
     * @return Optional containing the inventory if found, empty Optional otherwise
     * @throws IllegalArgumentException if productId is null
     */
    public Optional<Inventory> getInventoryByProductId(Long productId) {
        if (productId == null) {
            throw new IllegalArgumentException("Product ID cannot be null");
        }
        return inventoryRepository.findByProductId(productId);
    }

    public Inventory saveInventory(Inventory inventory) {
 return inventoryRepository.save(inventory);
    }

 public void deleteInventoryByProductId(Long productId) {
        // Assuming deleteByProductId in repository handles deletion by product ID
        inventoryRepository.deleteByProductId(productId);
    }
}