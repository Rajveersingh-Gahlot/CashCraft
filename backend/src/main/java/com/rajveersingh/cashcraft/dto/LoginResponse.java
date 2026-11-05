package com.rajveersingh.cashcraft.dto;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String token;
    private String tokenType;
    private UUID id;
    private String name;
    private String email;
}
