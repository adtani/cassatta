
package org.cassatta.appbuilder.apps.docmgmt.repositories;

import java.util.List;

import org.cassatta.appbuilder.apps.docmgmt.Document;
import org.cassatta.appbuilder.config.AppMongoRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@AppMongoRepository
@RepositoryRestResource(collectionResourceRel = "org.docmgmt.documents", path = "org.docmgmt.documents")
public interface DocumentRepository extends MongoRepository<Document, String> {

}
