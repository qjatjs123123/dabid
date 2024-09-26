package com.ssafy.dabid.global.api.ssafy.response;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetUserKeyResponse {
    private String userId;
    private String userName;
    private String institutionCode;
    private String userKey;
    private String created;
    private String modified;
}
