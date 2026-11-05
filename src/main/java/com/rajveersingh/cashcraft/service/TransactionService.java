package com.rajveersingh.cashcraft.service;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.rajveersingh.cashcraft.dto.CreateTransactionRequest;
import com.rajveersingh.cashcraft.dto.TransactionResponse;
import com.rajveersingh.cashcraft.dto.UpdateTransactionRequest;
import com.rajveersingh.cashcraft.entity.Transaction;
import com.rajveersingh.cashcraft.entity.User;
import com.rajveersingh.cashcraft.exception.ResourceNotFoundException;
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
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Transaction transaction = new Transaction();

        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(request.getTransactionType());
        transaction.setDescription(request.getDescription());
        transaction.setCategory(request.getCategory());
        transaction.setTransactionDate(request.getTransactionDate());
        transaction.setUser(user);

        Transaction savedTransaction = transactionRepository.save(transaction);

        return mapToResponse(savedTransaction);
    }

    public List<TransactionResponse> getAllTransations() {

        UUID userUUID = getAuthenticatedUserId();

        List<Transaction> transactions = transactionRepository.findByUserId(userUUID);

        return transactions.stream()
                .map(this::mapToResponse)
                .toList();
    }

    public TransactionResponse getTransactionById(UUID transactionId) {

        UUID userUUID = getAuthenticatedUserId();

        Transaction transaction = transactionRepository
                .findByIdAndUserId(transactionId, userUUID)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        return mapToResponse(transaction);
    }

    public TransactionResponse updateTransaction(UUID transactionId, UpdateTransactionRequest request) {
        UUID userUUID = getAuthenticatedUserId();

        Transaction transaction = transactionRepository
                .findByIdAndUserId(transactionId, userUUID)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        transaction.setAmount(request.getAmount());
        transaction.setTransactionType(request.getTransactionType());
        transaction.setDescription(request.getDescription());
        transaction.setCategory(request.getCategory());
        transaction.setTransactionDate(request.getTransactionDate());

        Transaction updatedTransaction = transactionRepository.save(transaction);

        return mapToResponse(updatedTransaction);
    }

    public void deleteTransaction(UUID transactionId) {
        UUID userUUID = getAuthenticatedUserId();

        Transaction transaction = transactionRepository.findByIdAndUserId(transactionId, userUUID)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found"));

        transactionRepository.delete(transaction);
    }

    private UUID getAuthenticatedUserId() {

        String userId = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal()
                .toString();

        return UUID.fromString(userId);
    }

    private TransactionResponse mapToResponse(Transaction transaction) {

        TransactionResponse response = new TransactionResponse();

        response.setId(transaction.getId());
        response.setAmount(transaction.getAmount());
        response.setTransactionType(transaction.getTransactionType());
        response.setDescription(transaction.getDescription());
        response.setCategory(transaction.getCategory());
        response.setTransactionDate(transaction.getTransactionDate());
        response.setCreatedAt(transaction.getCreatedAt());

        return response;
    }
}