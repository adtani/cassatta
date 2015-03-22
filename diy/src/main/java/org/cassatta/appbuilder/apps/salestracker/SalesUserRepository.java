package org.cassatta.appbuilder.apps.salestracker;

import java.util.List;

import org.cassatta.appbuilder.config.AppJpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "salesusers", path = "salesusers")
public interface SalesUserRepository extends PagingAndSortingRepository<SalesUser, Long> {

	List<SalesUser> findByFirstName(@Param("name") String name);
	List<SalesUser> findByLastName(@Param("name") String name);

}
