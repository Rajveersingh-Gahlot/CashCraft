package com.rajveersingh.cashcraft.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardResponse {
    private BigDecimal totalIncome;
    private BigDecimal totalExpenses;
    private BigDecimal balance;
}
