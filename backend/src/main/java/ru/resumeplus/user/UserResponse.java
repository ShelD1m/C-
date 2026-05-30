package ru.resumeplus.user;

import java.time.LocalDateTime;
import java.util.UUID;

public record UserResponse(
        UUID id,
        String name,
        String email,
        String subscriptionPlan,
        LocalDateTime createdAt
) {
    public static UserResponse from(UserEntity user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getSubscriptionPlan(),
                user.getCreatedAt()
        );
    }
}
