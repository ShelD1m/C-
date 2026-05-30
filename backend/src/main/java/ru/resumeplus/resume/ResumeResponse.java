package ru.resumeplus.resume;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

public record ResumeResponse(
        UUID id,
        String title,
        String template,
        Map<String, Object> data,
        boolean published,
        String publicSlug,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        long views,
        long downloads
) {
    public static ResumeResponse from(ResumeEntity resume) {
        return new ResumeResponse(
                resume.getId(),
                resume.getTitle(),
                resume.getTemplate(),
                resume.getData(),
                resume.isPublished(),
                resume.getPublicSlug(),
                resume.getCreatedAt(),
                resume.getUpdatedAt(),
                resume.getViews(),
                resume.getDownloads()
        );
    }
}
