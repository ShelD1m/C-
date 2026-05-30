package ru.resumeplus.auth;

import ru.resumeplus.user.UserResponse;

public record AuthResponse(
        String token,
        UserResponse user
) {}
