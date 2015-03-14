package com.springbootstrapper.apps.salestracker;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "regions", path = "regions")
public interface RegionRepository extends PagingAndSortingRepository<Region, Long> {

	List<Region> findByName(@Param("name") String name);

}
