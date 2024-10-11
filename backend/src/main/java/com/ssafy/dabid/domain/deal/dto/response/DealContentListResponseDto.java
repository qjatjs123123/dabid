package com.ssafy.dabid.domain.deal.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class DealContentListResponseDto {
    private List<ListDealResponseDto> content;
    private int totalPages;
    private int number;
}
