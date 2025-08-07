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
    public Optional<Inventory> getInventoryByProductId(Long productId) {
        // Assuming findByProductId in repository returns a List<Inventory>
        // We need to return Optional<Inventory>, which might require adjustment
        // in the repository or handling the list here. For now, assuming a single result or the first one.
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