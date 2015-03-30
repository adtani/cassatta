package org.cassatta.appbuilder.apps.system.repositories;

import org.cassatta.appbuilder.apps.system.Role;
import org.cassatta.appbuilder.config.AppJpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "org.roles", path = "org.roles")
public interface RoleRepository extends PagingAndSortingRepository<Role, Long> {

}
