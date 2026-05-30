package ru.resumeplus.resume;

import jakarta.validation.constraints.NotNull;

import java.util.Map;

public record ResumeSaveRequest(
        String title,
        String template,
        @NotNull Map<String, Object> data
) {}
