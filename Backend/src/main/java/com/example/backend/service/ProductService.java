package com.example.backend.service;

import com.example.backend.model.ProductModel;
import com.example.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public List<ProductModel> getAllProducts() {
        return productRepository.findAll();
    }

    public ProductModel getProductById(String id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public ProductModel createProduct(ProductModel product) {
        return productRepository.save(product);
    }

    public ProductModel updateProduct(String id, ProductModel updatedProduct) {
        return productRepository.findById(id)
                .map(p -> {
                    p.setName(updatedProduct.getName());
                    p.setDescription(updatedProduct.getDescription());
                    p.setPrice(updatedProduct.getPrice());
                    p.setImageUrl(updatedProduct.getImageUrl());
                    return productRepository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}
