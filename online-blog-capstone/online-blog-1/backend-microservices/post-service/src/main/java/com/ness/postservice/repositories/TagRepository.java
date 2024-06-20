package com.ness.postservice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ness.postservice.entities.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
}
