package com.ssafy.dabid.auction;

import com.ssafy.dabid.domain.auction.dto.response.AuctionListDto;
import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.entity.Category;
import com.ssafy.dabid.domain.auction.repository.AuctionJpaRepository;
import com.ssafy.dabid.domain.auction.service.AuctionServiceImpl;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class AuctionTest {
    @InjectMocks
    AuctionServiceImpl service;

    @Mock
    AuctionJpaRepository auctionJpaRepository;

    @Mock
    MemberRepository memberRepository;

    static Member member;
    static Auction auction1, auction2, auction3;

    @BeforeAll
    static void before() {
        member = Member.builder()
                .id(1)
                //.name("Dummy")
                .build();

        auction1 = Auction.builder()
                .id(1)
                //.name("auction1")
                .title("title1")
                .category(Category.A)
                .member(member)
                .build();

        auction2 = Auction.builder()
                .id(2)
                //.name("auction2")
                .title("titl2")
                .category(Category.B)
                .member(member)
                .build();

        auction3 = Auction.builder()
                .id(3)
                //.name("auction3")
                .title("title3")
                .category(Category.C)
                .member(member)
                .build();
    }

    @Test
    void getAuctions() {
        List<Auction> auctions = new ArrayList<>();
        auctions.add(auction1);
        auctions.add(auction2);
        auctions.add(auction3);

        List<AuctionListDto> dtos = new ArrayList<>();
        AuctionListDto dto1 = AuctionListDto.builder()
                .auctionId(auction1.getId())
                .title(auction1.getTitle())
                .category(auction1.getCategory().toString())
                .build();
        AuctionListDto dto2 = AuctionListDto.builder()
                .auctionId(auction2.getId())
                .title(auction2.getTitle())
                .category(auction2.getCategory().toString())
                .build();
        AuctionListDto dto3 = AuctionListDto.builder()
                .auctionId(auction3.getId())
                .title(auction3.getTitle())
                .category(auction3.getCategory().toString())
                .build();

        dtos.add(dto1);
        dtos.add(dto2);
        dtos.add(dto3);

        Mockito.when(auctionJpaRepository.findAllAuctions()).thenReturn(auctions);

        List<AuctionListDto> result = service.getAuctions();

        Assertions.assertEquals(dtos.get(0).getAuctionId(), result.get(0).getAuctionId());
        Assertions.assertEquals(dtos.get(1).getAuctionId(), result.get(1).getAuctionId());
        Assertions.assertEquals(dtos.get(2).getAuctionId(), result.get(2).getAuctionId());
    }

    @Test
    void getAuction() {
        Mockito.when(auctionJpaRepository.findById(1)).thenReturn(Optional.of(auction1));

//        Assertions.assertEquals(auction1.getTitle(), service.getAuction(1, 1).getTitle());
    }
}
