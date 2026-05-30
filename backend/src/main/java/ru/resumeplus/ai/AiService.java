package ru.resumeplus.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class AiService {
    private final String apiKey;
    private final String providerUrl;

    public AiService(
            @Value("${app.ai.api-key}") String apiKey,
            @Value("${app.ai.provider-url}") String providerUrl
    ) {
        this.apiKey = apiKey;
        this.providerUrl = providerUrl;
    }

    public AiResponse improveText(AiTextRequest request) {
        String text = request.text() == null || request.text().isBlank()
                ? "Опишите свой опыт, задачи и достижения."
                : request.text().trim();
        String result = "Улучшенный вариант: " + text
                + " Добавьте конкретные результаты, используемые технологии и измеримые достижения.";
        return response(result, 78, List.of(
                "Добавить цифры: сроки, проценты, количество пользователей или проектов",
                "Сделать формулировку более профессиональной",
                "Указать стек технологий"
        ));
    }

    public AiResponse generateAbout(AiTextRequest request) {
        String position = request.position() == null || request.position().isBlank()
                ? "специалист"
                : request.position().trim();
        String result = "Я " + position + ", ориентированный на практический результат и развитие профессиональных навыков. "
                + "Умею быстро разбираться в новых задачах, работать в команде и доводить проекты до завершения.";
        return response(result, 82, List.of(
                "Уточнить ключевые технологии под конкретную вакансию",
                "Добавить 1-2 сильных достижения",
                "Сделать текст короче для junior/middle вакансий"
        ));
    }

    public AiResponse generateSkills(AiTextRequest request) {
        String position = request.position() == null || request.position().isBlank()
                ? "выбранной должности"
                : request.position().trim();
        String result = "Профессиональные навыки для позиции " + position + ": работа с профильными инструментами, "
                + "анализ задач, коммуникация с командой, подготовка документации, соблюдение сроков.";
        return response(result, 75, List.of(
                "Разделить навыки на hard skills и soft skills",
                "Убрать навыки, которые не относятся к вакансии",
                "Добавить уровень владения важными инструментами"
        ));
    }

    public AiResponse analyzeResume(AiTextRequest request) {
        return response("Резюме выглядит рабочим для MVP, но его можно усилить под конкретную вакансию.", 76, List.of(
                "Заполнить блок с опытом через достижения, а не только обязанности",
                "Добавить ссылки на портфолио, GitHub, LinkedIn или личный сайт",
                "Проверить, чтобы должность и ключевые навыки совпадали с вакансией",
                "Сократить общие фразы и добавить факты"
        ));
    }

    private AiResponse response(String result, int score, List<String> recommendations) {
        Map<String, Object> meta = new LinkedHashMap<>();
        meta.put("mode", apiKey == null || apiKey.isBlank() ? "stub" : "external-ready");
        meta.put("providerUrlConfigured", providerUrl != null && !providerUrl.isBlank());
        return new AiResponse(result, score, recommendations, meta);
    }
}
