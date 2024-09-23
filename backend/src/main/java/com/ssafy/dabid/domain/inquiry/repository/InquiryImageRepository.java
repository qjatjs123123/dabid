package com.ssafy.dabid.domain.inquiry.repository;

import com.ssafy.dabid.domain.inquiry.entity.InquiryImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InquiryImageRepository extends JpaRepository<InquiryImage, Integer> {
    List<InquiryImage> findByInquiryId(int inquiryId);
}
