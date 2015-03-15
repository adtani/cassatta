package com.springbootstrapper.apps.salestracker;

import java.util.List;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.springbootstrapper.config.AppJpaRepository;

@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "industries", path = "industries")
public interface IndustryRepository extends PagingAndSortingRepository<Industry, Long> {

	List<Industry> findByName(@Param("name") String name);

}
