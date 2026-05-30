package ru.resumeplus.importing;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ru.resumeplus.resume.ResumeResponse;
import ru.resumeplus.resume.ResumeSaveRequest;
import ru.resumeplus.resume.ResumeService;
import ru.resumeplus.user.UserEntity;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/import")
public class ImportController {
    private final ObjectMapper objectMapper;
    private final ResumeService resumeService;

    public ImportController(ObjectMapper objectMapper, ResumeService resumeService) {
        this.objectMapper = objectMapper;
        this.resumeService = resumeService;
    }

    @PostMapping("/json")
    public ResumeResponse importJson(@AuthenticationPrincipal UserEntity user, @RequestParam("file") MultipartFile file) throws Exception {
        Map<String, Object> root = objectMapper.readValue(file.getBytes(), new TypeReference<Map<String, Object>>() {});
        String title = root.get("title") == null ? "Импортированное резюме" : root.get("title").toString();
        String template = root.get("template") == null ? "modern" : root.get("template").toString();
        Object data = root.get("data");
        Map<String, Object> resumeData = data instanceof Map<?, ?> map
                ? objectMapper.convertValue(map, new TypeReference<Map<String, Object>>() {})
                : root;
        return resumeService.create(user, new ResumeSaveRequest(title, template, resumeData));
    }

    @PostMapping("/pdf")
    public ResumeResponse importPdf(@AuthenticationPrincipal UserEntity user, @RequestParam("file") MultipartFile file) {
        Map<String, Object> data = new LinkedHashMap<>();
        data.put("personal", Map.of(
                "firstName", "",
                "lastName", "",
                "middleName", "",
                "desiredPosition", "Резюме из PDF",
                "birthDate", "",
                "country", "",
                "city", "",
                "photo", ""
        ));
        data.put("contacts", Map.of("phone", "", "email", "", "social", java.util.List.of()));
        data.put("experience", java.util.List.of());
        data.put("education", java.util.List.of());
        data.put("additionalEducation", java.util.List.of());
        data.put("skills", Map.of(
                "aboutMe", "Файл загружен: " + file.getOriginalFilename() + ". Автораспознавание PDF можно подключить на следующем этапе.",
                "personalQualities", "",
                "professionalSkills", "",
                "languages", java.util.List.of(),
                "driverLicense", java.util.List.of(),
                "medicalBook", false,
                "militaryTicket", false
        ));
        return resumeService.create(user, new ResumeSaveRequest("Импорт из PDF", "modern", data));
    }
}
