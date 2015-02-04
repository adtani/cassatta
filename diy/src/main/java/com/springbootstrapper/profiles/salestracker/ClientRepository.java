package com.springbootstrapper.profiles.salestracker;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "clients", path = "clients")
public interface ClientRepository extends PagingAndSortingRepository<Client, Long> {

//	List<User> findByName(@Param("name") String name);

    @Query(value = "select * from clients c where c.name like %:name%",  nativeQuery = true)
	List<Client> searchByName(@Param("name") String name);
}
