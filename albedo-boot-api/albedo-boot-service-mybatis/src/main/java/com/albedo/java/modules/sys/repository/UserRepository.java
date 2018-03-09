package com.albedo.java.modules.sys.repository;

import com.albedo.java.common.persistence.repository.BaseRepository;
import com.albedo.java.modules.sys.domain.User;
import org.springframework.data.repository.query.Param;

/**
 * Spring Data JPA repository for the User entity.
 */
public interface UserRepository extends BaseRepository<User, String> {

    void deleteUserRoles(@Param("user") User user);

    void addUserRoles(@Param("user") User user);

    User selectUserByLoginId(String loginId);
}
