package org.cassatta.appbuilder.apps.salestracker;

import java.util.List;

import org.cassatta.appbuilder.config.AppJpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "regions", path = "regions")
public interface RegionRepository extends PagingAndSortingRepository<Region, Long> {

	List<Region> findByName(@Param("name") String name);

}
