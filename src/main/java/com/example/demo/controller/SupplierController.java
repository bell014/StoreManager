package com.example.demo.controller;

import com.example.demo.model.Supplier;
import com.example.demo.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    private final SupplierService supplierService;

    @Autowired
    public SupplierController(SupplierService supplierService) {
        this.supplierService = supplierService;
    }

    @GetMapping
    public ResponseEntity<List<Supplier>> getAllSuppliers() {
 return ResponseEntity.ok(supplierService.findAllSuppliers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) {
 Optional<Supplier> supplier = supplierService.findSupplierById(id);
 return supplier.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Supplier> createSupplier(@RequestBody Supplier supplier) {
 return ResponseEntity.ok(supplierService.saveSupplier(supplier));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Supplier> updateSupplier(@PathVariable Long id, @RequestBody Supplier supplierDetails) {
 Optional<Supplier> supplierOptional = supplierService.findSupplierById(id);
        if (supplierOptional.isPresent()) {
 Supplier supplier = supplierOptional.get();
 supplier.setName(supplierDetails.getName());
 supplier.setContact(supplierDetails.getContact());
 supplier.setAddress(supplierDetails.getAddress());
 return ResponseEntity.ok(supplierService.saveSupplier(supplier));
        } else {
 return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSupplier(@PathVariable Long id) {
        // Basic implementation: return no content for now
        return ResponseEntity.noContent().build();
    }
}