package com.rajveersingh.cashcraft.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rajveersingh.cashcraft.dto.CategorySummaryResponse;
import com.rajveersingh.cashcraft.entity.Transaction;
import com.rajveersingh.cashcraft.entity.Transaction.TransactionType;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    // All transactions of particular user
    List<Transaction> findByUserId(UUID userId);

    // Specific transaction for that user
    Optional<Transaction> findByIdAndUserId(UUID id, UUID userId);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id=:userId AND t.transactionType='INCOME'")
    BigDecimal calculateTotalIncome(@Param("userId") UUID userId);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.id=:userId AND t.transactionType='EXPENSE'")
    BigDecimal calculateTotalExpenses(@Param("userId") UUID userId);

    @Query("""
            SELECT new com.rajveersingh.cashcraft.dto.CategorySummaryResponse(
                t.category,
                SUM(t.amount)
            )
            FROM Transaction t
            WHERE t.user.id = :userId
            AND t.transactionType = :transactionType
            GROUP BY t.category
            """)

    List<CategorySummaryResponse> findCategorySummary(@Param("userId") UUID userId,
            @Param("transactionType") TransactionType transactionType);
}
