package com.rajveersingh.cashcraft.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rajveersingh.cashcraft.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

}
