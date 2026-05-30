export const mapFormToResumeData = (form) => ({
    personal: {
        firstName: form.firstName || "",
        lastName: form.lastName || "",
        middleName: form.middleName || "",
        desiredPosition: form.desiredPosition || "",
        birthDate: form.birthDate || "",
        country: form.country || "",
        city: form.city || "",
        photo: form.photo || "",
    },

    contacts: {
        phone: form.phone || "",
        email: form.email || "",
        social:
            form.socialLinks?.map((s) => ({
                type: s.platform,
                link: s.link?.trim() || "",
            })) || [],
    },

    experience:
        form.workExperience?.map((exp) => ({
            company: exp.company || "",
            position: exp.position || "",
            country: exp.country || "",
            city: exp.city || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            responsibilities: exp.description || "",
        })) || [],

    education:
        form.education?.map((e) => ({
            institution: e.institution || "",
            specialization: e.specialty || "",
            level: e.level || "",
            graduationYear: e.endYear || "",
        })) || [],

    additionalEducation:
        form.additionalEducation?.map((a) => ({
            title: a.course || "",
            organization: a.provider || "",
            year: a.year || "",
            hasCertificate: !!a.hasCertificate,
        })) || [],

    skills: {
        aboutMe: [
            form.personalQualities,
            form.professionalSkills,
            form.about
        ]
            .filter(Boolean)
            .join("\n\n")
            .trim() || "",

        personalQualities: form.personalQualities || "",
        professionalSkills: form.professionalSkills || "",

        languages:
            form.languages?.map((l) => ({
                language: l.language || "",
                level: l.level || "",
            })) || [],

        driverLicense: Object.entries(form.driverCategories || {})
            .filter(([, enabled]) => enabled)
            .map(([category]) => category),

        medicalBook: !!form.medicalBook,
        militaryTicket: !!form.militaryTicket,
    },
});

export const mapResumeDataToForm = (resume) => ({
    firstName: resume.personal?.firstName || "",
    lastName: resume.personal?.lastName || "",
    middleName: resume.personal?.middleName || "",
    desiredPosition: resume.personal?.desiredPosition || "",
    birthDate: resume.personal?.birthDate || "",
    country: resume.personal?.country || "",
    city: resume.personal?.city || "",
    photo: resume.personal?.photo || "",

    phone: resume.contacts?.phone || "",
    email: resume.contacts?.email || "",
    socialLinks:
        resume.contacts?.social?.map((s) => ({
            platform: s.type || "",
            link: s.link?.trim() || "",
        })) || [{ platform: "", link: "" }],

    workExperience:
        resume.experience?.map((exp) => ({
            company: exp.company || "",
            position: exp.position || "",
            country: exp.country || "",
            city: exp.city || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            description: exp.responsibilities || "",
        })) || [],

    education:
        resume.education?.map((e) => ({
            institution: e.institution || "",
            specialty: e.specialization || "",
            level: e.level || "",
            endYear: e.graduationYear || "",
        })) || [],

    additionalEducation:
        resume.additionalEducation?.map((a) => ({
            course: a.title || "",
            provider: a.organization || "",
            year: a.year || "",
            hasCertificate: !!a.hasCertificate,
        })) || [],

    languages:
        resume.skills?.languages?.map((l) => ({
            language: l.language || "",
            level: l.level || "",
        })) || [],

    driverCategories: ["A", "B", "C", "D", "BE", "CE", "DE"].reduce(
        (acc, cat) => {
            acc[cat] = Array.isArray(resume.skills?.driverLicense)
                ? resume.skills.driverLicense.includes(cat)
                : false;
            return acc;
        },
        {}
    ),

    medicalBook: !!resume.skills?.medicalBook,
    militaryTicket: !!resume.skills?.militaryTicket,

    personalQualities: resume.skills?.personalQualities || "",
    professionalSkills: resume.skills?.professionalSkills || "",
    about: resume.skills?.aboutMe || "",
});