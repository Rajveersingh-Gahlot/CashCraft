package com.rajveersingh.cashcraft.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.rajveersingh.cashcraft.dto.CategorySummaryResponse;
import com.rajveersingh.cashcraft.dto.DashboardResponse;
import com.rajveersingh.cashcraft.entity.Transaction.TransactionType;
import com.rajveersingh.cashcraft.repository.TransactionRepository;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;

    public DashboardService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    private UUID getAuthenticatedUserId() {
        String userId = SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal()
                .toString();

        return UUID.fromString(userId);
    }

    public DashboardResponse getDashboardSummary() {

        UUID userId = getAuthenticatedUserId();

        BigDecimal totalIncome = transactionRepository.calculateTotalIncome(userId);

        BigDecimal totalExpenses = transactionRepository.calculateTotalExpenses(userId);

        if (totalIncome == null) {
            totalIncome = BigDecimal.ZERO;
        }
        if (totalExpenses == null) {
            totalExpenses = BigDecimal.ZERO;
        }

        BigDecimal balance = totalIncome.subtract(totalExpenses);

        DashboardResponse response = new DashboardResponse();
        response.setTotalIncome(totalIncome);
        response.setTotalExpenses(totalExpenses);
        response.setBalance(balance);

        return response;
    }

    public List<CategorySummaryResponse> getCategorySummary(TransactionType transactionType){
        UUID userId = getAuthenticatedUserId();

        return transactionRepository.findCategorySummary(userId, transactionType);
    }
}
