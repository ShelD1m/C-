package ru.resumeplus.resume;

import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.resumeplus.user.UserEntity;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {
    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public List<ResumeResponse> list(@AuthenticationPrincipal UserEntity user) {
        return resumeService.list(user);
    }

    @PostMapping
    public ResumeResponse create(@AuthenticationPrincipal UserEntity user, @Valid @RequestBody ResumeSaveRequest request) {
        return resumeService.create(user, request);
    }

    @GetMapping("/{id}")
    public ResumeResponse get(@AuthenticationPrincipal UserEntity user, @PathVariable UUID id) {
        return resumeService.get(user, id);
    }

    @PutMapping("/{id}")
    public ResumeResponse update(@AuthenticationPrincipal UserEntity user, @PathVariable UUID id, @Valid @RequestBody ResumeSaveRequest request) {
        return resumeService.update(user, id, request);
    }

    @PatchMapping("/{id}")
    public ResumeResponse patch(@AuthenticationPrincipal UserEntity user, @PathVariable UUID id, @Valid @RequestBody ResumeSaveRequest request) {
        return resumeService.update(user, id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal UserEntity user, @PathVariable UUID id) {
        resumeService.delete(user, id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/publish")
    public ResumeResponse publish(@AuthenticationPrincipal UserEntity user, @PathVariable UUID id) {
        return resumeService.publish(user, id);
    }

    @PostMapping("/{id}/unpublish")
    public ResumeResponse unpublish(@AuthenticationPrincipal UserEntity user, @PathVariable UUID id) {
        return resumeService.unpublish(user, id);
    }

    @GetMapping("/{id}/export/json")
    public ResponseEntity<Map<String, Object>> exportJson(@AuthenticationPrincipal UserEntity user, @PathVariable UUID id) {
        Map<String, Object> body = resumeService.exportJson(user, id);
        String fileName = "resume-" + id + ".json";
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileName + "\"")
                .body(body);
    }
}
