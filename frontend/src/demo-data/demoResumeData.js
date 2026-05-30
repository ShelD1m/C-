export const demoResumeData = {
    personal: {
        photo: "https://avatars.mds.yandex.net/i?id=2615197f205f9a4b2cedba4082b024b3b1808649-5245175-images-thumbs&n=13",
        firstName: "Анна",
        lastName: "Коваленко",
        middleName: "Сергеевна",
        birthDate: "1995-03-14",
        country: "Россия",
        city: "Санкт-Петербург",
        desiredPosition: "Frontend-разработчик"
    },
    contacts: {
        phone: "+7 (999) 123-45-67",
        email: "anna.kovalenko@example.com",
        social: [
            {type: "Telegram", link: "https://t.me/annadev"},
            {type: "GitHub", link: "https://github.com/annadev"},
            {type: "LinkedIn", link: "https://linkedin.com/in/anna-kovalenko"}
        ]
    },
    experience: [
        {
            position: "Frontend-разработчик",
            company: "Digital Studio",
            country: "Россия",
            city: "Москва",
            startDate: "2021-06",
            endDate: "2025-03",
            responsibilities:
                "Разработка SPA на React, настройка сборки, интеграция с API, оптимизация интерфейсов под мобильные устройства."
        },
        {
            position: "Frontend-стажер",
            company: "TechLab",
            country: "Россия",
            city: "Москва",
            startDate: "2020-03",
            endDate: "2021-05",
            responsibilities: "Верстка компонентов, поддержка библиотеки компонентов, работа с Git."
        }
    ],
    education: [
        {
            institution: "СПбГУ",
            specialization: "Прикладная информатика",
            graduationYear: "2017",
            level: "Бакалавр"
        }
    ],
    additionalEducation: [
        {
            title: "React-разработка",
            organization: "Яндекс.Практикум",
            year: "2021",
            hasCertificate: true
        },
        {
            title: "UX/UI-дизайн",
            organization: "Skillbox",
            year: "2020",
            hasCertificate: false
        }
    ],
    skills: {
        medicalBook: false,
        militaryTicket: false,
        driverLicense: ["B"],
        languages: [
            {language: "Английский", level: "B2"},
            {language: "Немецкий", level: "A2"}
        ],
        personalQualities: "Ответственность, коммуникабельность, самоорганизация.",
        professionalSkills:
            "HTML5, CSS3, JavaScript (ES6+), React, Redux, Git, REST API, Адаптивная верстка",
        aboutMe:
            "Фронтенд-разработчик с опытом создания отзывчивых и доступных интерфейсов. Люблю разбираться в деталях и автоматизировать рутину."
    }
};