package com.rajveersingh.cashcraft.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.rajveersingh.cashcraft.dto.CategorySummaryResponse;
import com.rajveersingh.cashcraft.dto.DashboardResponse;
import com.rajveersingh.cashcraft.dto.MonthlySummaryResponse;
import com.rajveersingh.cashcraft.entity.Transaction.TransactionType;
import com.rajveersingh.cashcraft.service.DashboardService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/summary")
    @ResponseStatus(HttpStatus.OK)
    public DashboardResponse getDashboard() {
        return service.getDashboardSummary();
    }

    @GetMapping("/categories")
    @ResponseStatus(HttpStatus.OK)
    public List<CategorySummaryResponse> getCategory(@RequestParam("type") TransactionType transactionType) {
        return service.getCategorySummary(transactionType);
    }

    @GetMapping("/monthly")
    @ResponseStatus(HttpStatus.OK)
    public List<MonthlySummaryResponse> getMonthlySummary() {
        return service.getMonthlySummary();
    }

}
