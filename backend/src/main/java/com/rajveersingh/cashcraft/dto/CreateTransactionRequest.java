package com.rajveersingh.cashcraft.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.rajveersingh.cashcraft.entity.Transaction;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTransactionRequest {
    @NotNull(message = "Cannot be blank")
    @DecimalMin(value = "0.01", message = "Amount must be greater than zero")
    private BigDecimal amount;

    @NotNull(message = "Transaction type is required")
    private Transaction.TransactionType transactionType;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotBlank(message = "Category cannot be blank")
    private String category;

    @NotNull(message = "Transaction date is required")
    private LocalDate transactionDate;
}
