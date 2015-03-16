package com.springbootstrapper.apps.docmgmt;

import java.util.List;

import lombok.Data;

import org.springframework.data.annotation.Id;

@Data
@org.springframework.data.mongodb.core.mapping.Document (collection = "org.docmgmt.documents")
public class Document {

	@Id private String id;
	
	private String title;
	
	private String description;
	
	private String status;
	
	private String entityType;
	
	private String file;

	private String owner;
	
	private String assignee;

	private List<DocumentAttribute> attributes;

	public static class DocumentAttribute {
		
		private String name;
		
		private String value;
		
		private Document document;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public Document getDocument() {
			return document;
		}

		public void setDocument(Document document) {
			this.document = document;
		}
		
	}
	
}
