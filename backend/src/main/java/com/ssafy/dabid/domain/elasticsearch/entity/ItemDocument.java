package com.ssafy.dabid.domain.elasticsearch.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Builder
@Document(indexName = "item")
//@Mapping(mappingPath = "static/elastic-mapping.json")
//@Setting(settingPath = "static/elastic-token.json")
public class ItemDocument {

    @Id
    @Field(name = "id", type = FieldType.Keyword)
    private String itemId;

    @Field(type = FieldType.Keyword)
    private String user;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text)
    private String description;

    @Field(type = FieldType.Text)
    private String category;

    @Field(type = FieldType.Integer)
    private int price;

    @Field(type = FieldType.Text)
    private String itemImage;

}
