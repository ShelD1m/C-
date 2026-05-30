import React from "react";
import "../../styles/ResumeTemplate.css";

const ResumeTemplate = ({data, template}) => {
    const {
        personal = {},
        contacts = {},
        experience = [],
        education = [],
        additionalEducation = [],
        skills = {}
    } = data || {};

    return (
        <div className={`resume-template resume-template--${template}`}>
            <header className="resume-header">
                {personal.photo && (
                    <img src={personal.photo} alt="Фото" className="avatar"/>
                )}

                <div className="info">
                    <h1>
                        {personal.lastName} {personal.firstName} {personal.middleName}
                    </h1>
                    <p className="desired-position">{personal.desiredPosition}</p>
                    <p className="location">
                        {personal.birthDate && `${personal.birthDate} • `}
                        {personal.city}{personal.country && `, ${personal.country}`}
                    </p>
                </div>

                {template !== "modern" && contacts.social?.length > 0 && (
                    <div className="contacts-header">
                        {contacts.phone && <p>{contacts.phone}</p>}
                        {contacts.email && <p>{contacts.email}</p>}
                        {contacts.social.map((s, i) => (
                            <p key={i}>
                                {s.type}:{" "}
                                <a
                                    href={s.link.trim()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{color: "inherit", textDecoration: "none"}}
                                >
                                    {s.link.trim()}
                                </a>
                            </p>
                        ))}
                    </div>
                )}
            </header>

            <main className="main-content">
                {template === "modern" && contacts.social?.length > 0 && (
                    <section className="contacts">
                        <h2>Контакты</h2>
                        {contacts.phone && <p>{contacts.phone}</p>}
                        {contacts.email && <p>{contacts.email}</p>}
                        {contacts.social.map((s, i) => (
                            <p key={i}>
                                {s.type}:{" "}
                                <a
                                    href={s.link.trim()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{color: "inherit", textDecoration: "none"}}
                                >
                                    {s.link.trim()}
                                </a>
                            </p>
                        ))}

                    </section>
                )}

                {skills.aboutMe && (
                    <section className="aboutMe">
                        <h2>О себе</h2>
                        <p>{skills.aboutMe}</p>
                    </section>
                )}

                {skills.professionalSkills && (
                    <section className="skills">
                        <h2>Профессиональные навыки</h2>
                        <ul>
                            {skills.professionalSkills
                                .split(/[,;]/)
                                .map((s) => s.trim())
                                .filter(Boolean)
                                .map((skill, i) => <li key={i}>{skill}</li>)}
                        </ul>
                    </section>
                )}

                {(skills.languages?.length > 0 ||
                    skills.driverLicense?.length > 0 ||
                    skills.medicalBook ||
                    skills.militaryTicket) && (
                    <section className="additional-skills">
                        <h2>Дополнительные навыки</h2>

                        {skills.languages?.length > 0 && (
                            <div className="languages">
                                {skills.languages.map((l, i) => (
                                    <p key={i}>• {l.language} — {l.level}</p>
                                ))}
                            </div>
                        )}

                        {skills.driverLicense?.length > 0 && (
                            <p>
                                Водительские права: {skills.driverLicense.join(", ")}
                            </p>
                        )}

                        {skills.medicalBook && <p>Медицинская книжка</p>}
                        {skills.militaryTicket && <p>Военный билет</p>}
                    </section>
                )}

                {experience.length > 0 && (
                    <section className="experience">
                        <h2>Опыт работы</h2>
                        {experience.map((exp, i) => (
                            <div key={i} className="job">
                                <h3>{exp.position} — {exp.company}</h3>
                                <p className="period">
                                    {exp.startDate} — {exp.endDate || "по настоящее время"}
                                </p>
                                {(exp.city || exp.country) && (
                                    <p className="location">
                                        {exp.city}{exp.country && `, ${exp.country}`}
                                    </p>
                                )}
                                {exp.responsibilities && <p>{exp.responsibilities}</p>}
                            </div>
                        ))}
                    </section>
                )}

                {education.length > 0 && (
                    <section className="education">
                        <h2>Образование</h2>
                        {education.map((e, i) => (
                            <div key={i}>
                                <h3>{e.institution}</h3>
                                <p>{e.specialization}</p>
                                <p>{e.level}, {e.graduationYear}</p>
                            </div>
                        ))}
                    </section>
                )}

                {additionalEducation?.length > 0 && (
                    <section className="additional-education">
                        <h2>Дополнительное образование</h2>
                        {additionalEducation.map((item, i) => (
                            <div key={i}>
                                <h3>{item.title}</h3>
                                <p>
                                    {item.organization}, {item.year}
                                    {item.hasCertificate && " • Сертификат"}
                                </p>
                            </div>
                        ))}
                    </section>
                )}

                {skills.personalQualities && (
                    <section className="personal-qualities">
                        <h2>Личные качества</h2>
                        <p>{skills.personalQualities}</p>
                    </section>
                )}
            </main>
        </div>
    );
};

export default ResumeTemplate;