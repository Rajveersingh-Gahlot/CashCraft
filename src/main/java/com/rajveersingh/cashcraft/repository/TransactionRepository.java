package com.rajveersingh.cashcraft.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rajveersingh.cashcraft.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    // All transactions of particular user
    List<Transaction> findByUserId(UUID userId);

    // Specific transaction for that user
    Optional<Transaction> findByIdAndUserId(UUID id, UUID userId);
}
