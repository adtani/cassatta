
package com.springbootstrapper.apps.docmgmt;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.springbootstrapper.config.AppMongoRepository;

@AppMongoRepository
@RepositoryRestResource(collectionResourceRel = "org.docmgmt.documents", path = "org.docmgmt.documents")
public interface DocumentRepository extends MongoRepository<Document, String> {

}
