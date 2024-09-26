package com.ssafy.dabid.domain.inquiry.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "INQUIRY_IMAGE")
public class InquiryImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "INQUIRY_ID")
    private Inquiry inquiry;
}
