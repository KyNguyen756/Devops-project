package com.example.backend.controller;

import com.example.backend.model.ProductModel;
import com.example.backend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<ProductModel> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ProductModel getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public ProductModel createProduct(@RequestBody ProductModel product) {
        return productService.createProduct(product);
    }

    @PutMapping("/{id}")
    public ProductModel updateProduct(@PathVariable String id, @RequestBody ProductModel product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }
}
