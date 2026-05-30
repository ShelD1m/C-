package ru.resumeplus.user;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.resumeplus.resume.ResumeResponse;
import ru.resumeplus.resume.ResumeService;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {
    private final ResumeService resumeService;

    public ProfileController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping
    public ProfileResponse getProfile(@AuthenticationPrincipal UserEntity user) {
        List<ResumeResponse> resumes = resumeService.list(user);
        return new ProfileResponse(UserResponse.from(user), resumes);
    }

    public record ProfileResponse(UserResponse user, List<ResumeResponse> resumes) {}
}
