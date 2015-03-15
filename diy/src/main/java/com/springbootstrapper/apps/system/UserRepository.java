package com.springbootstrapper.apps.system;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.springbootstrapper.apps.system.User;
import com.springbootstrapper.config.AppJpaRepository;
@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "org.users", path = "org.users")
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

	List<User> findByName(@Param("name") String name);
	List<User> findByLogin(@Param("login") String login);

}
