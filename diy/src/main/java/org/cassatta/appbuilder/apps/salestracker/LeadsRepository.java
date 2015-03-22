package org.cassatta.appbuilder.apps.salestracker;

import org.cassatta.appbuilder.config.AppJpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@AppJpaRepository
@RepositoryRestResource(collectionResourceRel = "leads", path = "leads")
public interface LeadsRepository extends PagingAndSortingRepository<Lead, Long> {


}
