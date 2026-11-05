package com.rajveersingh.cashcraft.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private UUID id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
}
