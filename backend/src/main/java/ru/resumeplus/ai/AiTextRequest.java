package ru.resumeplus.ai;

import java.util.Map;

public record AiTextRequest(
        String text,
        String position,
        String action,
        Map<String, Object> resumeData
) {}
