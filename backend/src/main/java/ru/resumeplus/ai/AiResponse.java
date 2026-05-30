package ru.resumeplus.ai;

import java.util.List;
import java.util.Map;

public record AiResponse(
        String result,
        int score,
        List<String> recommendations,
        Map<String, Object> meta
) {}
