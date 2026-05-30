package ru.resumeplus.publicapi;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.resumeplus.resume.ResumeResponse;
import ru.resumeplus.resume.ResumeService;

@RestController
@RequestMapping("/api/public/resumes")
public class PublicResumeController {
    private final ResumeService resumeService;

    public PublicResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/{slug}")
    public ResumeResponse getPublic(@PathVariable String slug) {
        return resumeService.getPublic(slug);
    }
}
