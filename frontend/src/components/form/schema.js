import * as yup from 'yup';

export const resumeSchema = yup.object().shape({
    photo: yup.mixed().test('fileSize', 'Файл слишком большой (max 2MB)', (value) => !value || (value && value.size <= 2 * 1024 * 1024)),

    firstName: yup.string().required('Имя обязательно'),
    lastName: yup.string().required('Фамилия обязательна'),
    middleName: yup.string(),
    desiredPosition: yup.string().required('Желаемая должность обязательна'),

    birthDate: yup.date()
        .required('Дата рождения обязательна')
        .max(new Date(), 'Дата не может быть в будущем'),

    country: yup.string().required('Страна обязательна'),
    city: yup.string().required('Город обязателен'),

    phone: yup.string().matches(/^[+\d\s().-]{6,20}$/, 'Неверный формат телефона'),
    email: yup.string().email('Неверный email'),

    socialLinks: yup.array().of(
        yup.object().shape({
            platform: yup.string().required('Платформа обязательна'),
            link: yup.string().url('Неверный URL социальной сети'),
        })
    ).optional(),

    workExperience: yup.array().of(
        yup.object().shape({
            position: yup.string().required('Должность обязательна'),
            company: yup.string().required('Компания обязательна'),
            country: yup.string().required('Страна обязательна'),
            city: yup.string().required('Город обязателен'),
            startDate: yup.date().nullable(),
            endDate: yup.date().nullable(),
            description: yup.string(),
        }).test('date-order', 'Дата увольнения не может быть раньше устройства', function (exp) {
            const { startDate, endDate } = exp;
            if (startDate && endDate) {
                return new Date(startDate) <= new Date(endDate);
            }
            return true;
        })
    ),

    education: yup.array().of(
        yup.object().shape({
            institution: yup.string().required('Учебное заведение обязательно'),
            specialty: yup.string().required('Специальность обязательна'),
            level: yup.string().required('Уровень образования обязателен'),
            endYear: yup
                .number()
                .integer('Год должен быть целым числом')
                .min(1900, 'Год слишком ранний')
                .max(new Date().getFullYear(), 'Год не может быть в будущем')
                .required('Год окончания обязателен'),
        })
    ),

    additionalEducation: yup.array().of(
        yup.object().shape({
            course: yup.string().required('Название курса обязательно'),
            provider: yup.string().required('Организация обязательна'),
            year: yup
                .number()
                .integer('Год должен быть целым числом')
                .min(1900)
                .max(new Date().getFullYear(), 'Год не может быть в будущем')
                .required('Год прохождения обязателен'),
            hasCertificate: yup.boolean(),
        })
    ),

    personalQualities: yup.string(),
    professionalSkills: yup.string(),
    about: yup.string(),

    medicalBook: yup.boolean(),
    militaryTicket: yup.boolean(),
    driverCategories: yup.object({
        A: yup.boolean(),
        B: yup.boolean(),
        C: yup.boolean(),
        D: yup.boolean(),
        BE: yup.boolean(),
        CE: yup.boolean(),
        DE: yup.boolean(),
    }).optional(),
});