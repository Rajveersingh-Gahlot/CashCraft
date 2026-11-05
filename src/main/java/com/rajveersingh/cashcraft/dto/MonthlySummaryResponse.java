package com.rajveersingh.cashcraft.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MonthlySummaryResponse {

    private String month;
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal balance;

    public MonthlySummaryResponse(String month, BigDecimal totalIncome, BigDecimal totalExpenses) {
        this.month = month;
        this.totalIncome = totalIncome;
        this.totalExpenses = totalExpenses;
        this.balance = totalIncome.subtract(totalExpenses);
    }

}
