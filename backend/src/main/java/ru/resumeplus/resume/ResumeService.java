package ru.resumeplus.resume;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import ru.resumeplus.user.UserEntity;

import java.text.Normalizer;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ResumeService {
    private final ResumeRepository resumeRepository;

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    @Transactional(readOnly = true)
    public List<ResumeResponse> list(UserEntity user) {
        return resumeRepository.findAllByOwner_IdOrderByUpdatedAtDesc(user.getId())
                .stream()
                .map(ResumeResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public ResumeResponse create(UserEntity user, ResumeSaveRequest request) {
        ResumeEntity resume = new ResumeEntity();
        resume.setOwner(user);
        applySaveRequest(resume, request);
        return ResumeResponse.from(resumeRepository.save(resume));
    }

    @Transactional(readOnly = true)
    public ResumeResponse get(UserEntity user, UUID id) {
        return ResumeResponse.from(findForUser(user, id));
    }

    @Transactional
    public ResumeResponse update(UserEntity user, UUID id, ResumeSaveRequest request) {
        ResumeEntity resume = findForUser(user, id);
        applySaveRequest(resume, request);
        return ResumeResponse.from(resumeRepository.save(resume));
    }

    @Transactional
    public void delete(UserEntity user, UUID id) {
        ResumeEntity resume = findForUser(user, id);
        resumeRepository.delete(resume);
    }

    @Transactional
    public ResumeResponse publish(UserEntity user, UUID id) {
        ResumeEntity resume = findForUser(user, id);
        if (resume.getPublicSlug() == null || resume.getPublicSlug().isBlank()) {
            resume.setPublicSlug(generateUniqueSlug(resume));
        }
        resume.setPublished(true);
        return ResumeResponse.from(resumeRepository.save(resume));
    }

    @Transactional
    public ResumeResponse unpublish(UserEntity user, UUID id) {
        ResumeEntity resume = findForUser(user, id);
        resume.setPublished(false);
        return ResumeResponse.from(resumeRepository.save(resume));
    }

    @Transactional
    public ResumeResponse getPublic(String slug) {
        ResumeEntity resume = resumeRepository.findByPublicSlugAndPublishedTrue(slug)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Публичное резюме не найдено"));
        resume.setViews(resume.getViews() + 1);
        return ResumeResponse.from(resumeRepository.save(resume));
    }

    @Transactional
    public Map<String, Object> exportJson(UserEntity user, UUID id) {
        ResumeEntity resume = findForUser(user, id);
        resume.setDownloads(resume.getDownloads() + 1);
        resumeRepository.save(resume);
        return Map.of(
                "id", resume.getId(),
                "title", resume.getTitle(),
                "template", resume.getTemplate(),
                "data", resume.getData(),
                "published", resume.isPublished(),
                "publicSlug", resume.getPublicSlug() == null ? "" : resume.getPublicSlug()
        );
    }

    private ResumeEntity findForUser(UserEntity user, UUID id) {
        return resumeRepository.findByIdAndOwner_Id(id, user.getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Резюме не найдено"));
    }

    private void applySaveRequest(ResumeEntity resume, ResumeSaveRequest request) {
        resume.setTitle(normalizeTitle(request.title(), request.data()));
        resume.setTemplate(normalizeTemplate(request.template()));
        resume.setData(request.data());
    }

    private String normalizeTitle(String title, Map<String, Object> data) {
        if (title != null && !title.isBlank()) {
            return title.trim();
        }
        Object personal = data.get("personal");
        if (personal instanceof Map<?, ?> map) {
            Object desiredPosition = map.get("desiredPosition");
            if (desiredPosition != null && !desiredPosition.toString().isBlank()) {
                return desiredPosition.toString().trim();
            }
        }
        return "Новое резюме";
    }

    private String normalizeTemplate(String template) {
        if (template == null || template.isBlank()) {
            return "modern";
        }
        String value = template.trim().toLowerCase(Locale.ROOT);
        if (!List.of("modern", "classic", "creative").contains(value)) {
            return "modern";
        }
        return value;
    }

    private String generateUniqueSlug(ResumeEntity resume) {
        String base = slugify(resume.getTitle());
        if (base.isBlank()) {
            base = "resume";
        }
        String candidate = base;
        int counter = 1;
        while (resumeRepository.existsByPublicSlug(candidate)) {
            counter++;
            candidate = base + "-" + counter;
        }
        return candidate;
    }

    private String slugify(String value) {
        String normalized = Normalizer.normalize(value == null ? "resume" : value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9а-яё]+", "-")
                .replaceAll("^-|-$", "");
        return normalized.length() > 64 ? normalized.substring(0, 64).replaceAll("-$", "") : normalized;
    }
}
