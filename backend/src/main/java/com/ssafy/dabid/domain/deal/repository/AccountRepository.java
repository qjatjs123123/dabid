package com.ssafy.dabid.domain.deal.repository;

import com.ssafy.dabid.domain.deal.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Account findByMember_Id(int userKey);
}
