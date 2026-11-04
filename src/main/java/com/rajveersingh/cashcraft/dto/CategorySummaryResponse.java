package com.rajveersingh.cashcraft.dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategorySummaryResponse {
    private String category;
    private BigDecimal totalAmount;

    public CategorySummaryResponse(String category, BigDecimal totalAmount) {
        this.category = category;
        this.totalAmount = totalAmount;
    }
}
