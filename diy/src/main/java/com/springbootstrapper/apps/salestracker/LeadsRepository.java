package com.springbootstrapper.apps.salestracker;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.springbootstrapper.config.AppJpaRepository;

@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "leads", path = "leads")
public interface LeadsRepository extends PagingAndSortingRepository<Lead, Long> {


}
