package ru.resumeplus.resume;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ResumeRepository extends JpaRepository<ResumeEntity, UUID> {
    List<ResumeEntity> findAllByOwner_IdOrderByUpdatedAtDesc(UUID ownerId);
    Optional<ResumeEntity> findByIdAndOwner_Id(UUID id, UUID ownerId);
    Optional<ResumeEntity> findByPublicSlugAndPublishedTrue(String publicSlug);
    boolean existsByPublicSlug(String publicSlug);
}
