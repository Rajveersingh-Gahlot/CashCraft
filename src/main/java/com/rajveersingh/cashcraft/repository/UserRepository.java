package com.rajveersingh.cashcraft.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.rajveersingh.cashcraft.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

}
