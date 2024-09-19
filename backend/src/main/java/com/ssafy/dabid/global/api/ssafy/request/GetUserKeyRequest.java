package com.ssafy.dabid.global.api.ssafy.request;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.dabid.domain.deal.dto.request.CommonApiRequest;
import com.ssafy.dabid.global.consts.StaticConst;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetUserKeyRequest extends CommonApiRequest {
    private String userId;
    private final String apiKey = StaticConst.apiKey;
}
