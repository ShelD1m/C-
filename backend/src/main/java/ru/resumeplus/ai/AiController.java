package ru.resumeplus.ai;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {
    private final AiService aiService;

    public AiController(AiService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/improve-text")
    public AiResponse improveText(@RequestBody AiTextRequest request) {
        return aiService.improveText(request);
    }

    @PostMapping("/generate-about")
    public AiResponse generateAbout(@RequestBody AiTextRequest request) {
        return aiService.generateAbout(request);
    }

    @PostMapping("/generate-skills")
    public AiResponse generateSkills(@RequestBody AiTextRequest request) {
        return aiService.generateSkills(request);
    }

    @PostMapping("/analyze-resume")
    public AiResponse analyzeResume(@RequestBody AiTextRequest request) {
        return aiService.analyzeResume(request);
    }
}
