package ru.resumeplus.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        String name,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 6, message = "Пароль должен быть не короче 6 символов") String password
) {}
