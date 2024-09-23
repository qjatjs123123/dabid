package com.ssafy.dabid.global.api.ssafy.request;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.dabid.global.api.ssafy.request.SsafyApiRequest;
import com.ssafy.dabid.global.consts.StaticConst;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetUserKeyRequest extends SsafyApiRequest {
    private String userId;
    private final String apiKey = StaticConst.apiKey;
}
