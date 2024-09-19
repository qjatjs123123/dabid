package com.ssafy.dabid.domain.deal.repository;

import com.ssafy.dabid.domain.deal.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DealRepository extends JpaRepository<Deal, String>{
    Deal findById(int id);
}
