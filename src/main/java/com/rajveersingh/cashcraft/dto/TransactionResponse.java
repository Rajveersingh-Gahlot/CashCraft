package com.rajveersingh.cashcraft.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import com.rajveersingh.cashcraft.entity.Transaction;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionResponse {
    private UUID id;
    private BigDecimal amount;
    private Transaction.TransactionType transactionType;
    private String description;
    private String category;
    private LocalDate transactionDate;
    private LocalDateTime createdAt;
}
