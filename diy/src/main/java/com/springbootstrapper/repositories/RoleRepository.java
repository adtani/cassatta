package com.springbootstrapper.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.springbootstrapper.domain.Role;

@RepositoryRestResource(collectionResourceRel = "org.roles", path = "org.roles")
public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {


}
