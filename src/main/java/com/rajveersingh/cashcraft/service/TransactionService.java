package com.rajveersingh.cashcraft.service;

import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.rajveersingh.cashcraft.dto.CreateTransactionRequest;
import com.rajveersingh.cashcraft.dto.TransactionResponse;
import com.rajveersingh.cashcraft.entity.Transaction;
import com.rajveersingh.cashcraft.entity.User;
import com.rajveersingh.cashcraft.repository.TransactionRepository;
import com.rajveersingh.cashcraft.repository.UserRepository;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.userRepository = userRepository;
    }

    public TransactionResponse createTransaction(CreateTransactionRequest request) {
        String userId = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal()
                .toString();

        UUID userUUID = UUID.fromString(userId);

        User user = userRepository.findById(userUUID)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Transaction transaction = new Transaction();

        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(request.getTransactionType());
        transaction.setDescription(request.getDescription());
        transaction.setCategory(request.getCategory());
        transaction.setTransactionDate(request.getTransactionDate());
        transaction.setUser(user);

        Transaction savedTransaction = transactionRepository.save(transaction);

        TransactionResponse response = new TransactionResponse();

        response.setId(savedTransaction.getId());
        response.setAmount(savedTransaction.getAmount());
        response.setTransactionType(savedTransaction.getTransactionType());
        response.setDescription(savedTransaction.getDescription());
        response.setCategory(savedTransaction.getCategory());
        response.setTransactionDate(savedTransaction.getTransactionDate());
        response.setCreatedAt(savedTransaction.getCreatedAt());

        return response;
    }
}
