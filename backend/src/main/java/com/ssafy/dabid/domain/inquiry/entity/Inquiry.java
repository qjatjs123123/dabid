package com.ssafy.dabid.domain.inquiry.entity;

import com.ssafy.dabid.domain.inquiry.dto.InquiryRequestDto;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.global.config.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Inquiry extends BaseEntity {
    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    private String title;

    private String content;

    @Enumerated(EnumType.STRING)
    private Category category;

    public static Inquiry createInquiry(InquiryRequestDto inquiryRequestDto, Member member) {
        Inquiry inquiry = new Inquiry();
        inquiry.title = inquiryRequestDto.getTitle();
        inquiry.content = inquiryRequestDto.getContent();
        inquiry.member = member;
        inquiry.category = Category.valueOf(inquiryRequestDto.getCategory());
        return inquiry;
    }


}
