package com.springbootstrapper.apps.system;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.springbootstrapper.apps.system.Role;
import com.springbootstrapper.config.AppJpaRepository;
@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "org.roles", path = "org.roles")
public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {

}
