import React from "react";
import "../styles/ResumeTemplate.css";

const ResumeTemplate = ({data, template}) => {
    const {
        personal,
        contacts,
        experience,
        education,
        additionalEducation,
        skills
    } = data;

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
                    <p>{personal.desiredPosition}</p>
                    <p>{personal.birthDate} | {personal.city}</p>
                </div>

                {template !== "modern" && (
                    <div className="contacts-header">
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
                {template === "modern" && (
                    <section className="contacts">
                        <h2>Контакты</h2>
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
                                .split(", ")
                                .map((skill, i) => (
                                    <li key={i}>{skill.trim()}</li>
                                ))}
                        </ul>
                    </section>
                )}

                {(skills.languages?.length > 0 || skills.driverLicense?.length > 0) && (
                    <section className="languages-and-license">
                        <h2>Дополнительный навыки</h2>

                        {skills.languages?.length > 0 && (
                            <div className="languages">
                                {skills.languages.map((l, i) => (
                                    <p key={i}>{l.language} — {l.level}</p>
                                ))}
                            </div>
                        )}

                        {skills.driverLicense?.length > 0 && (
                            <div className="driver-license">
                                <p>
                                    {skills.driverLicense.length === 1
                                        ? `Водительские права категории ${skills.driverLicense[0]}`
                                        : `Водительские права категорий: ${skills.driverLicense.join(", ")}`}
                                </p>
                            </div>
                        )}
                    </section>
                )}

                <section className="experience">
                    <h2>Опыт работы</h2>
                    {experience.map((exp, i) => (
                        <div key={i}>
                            <h3>{exp.position} — {exp.company}</h3>
                            <p>
                                {exp.startDate} — {exp.endDate || "по наст. время"}
                            </p>
                            <p>{exp.responsibilities}</p>
                        </div>
                    ))}
                </section>

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

                {additionalEducation?.length > 0 && (
                    <section className="additional-education">
                        <h2>Дополнительное образование</h2>
                        {additionalEducation.map((item, i) => (
                            <div key={i}>
                                <h3>{item.title}</h3>
                                <p>{item.organization}, {item.year}</p>
                                {item.hasCertificate && <p>Сертификат получен</p>}
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