package com.ssafy.dabid.domain.inquiry.service;

import com.opencsv.CSVWriter;
import com.ssafy.dabid.domain.auction.entity.Category;
import com.ssafy.dabid.domain.inquiry.dto.InquiryRequestDto;
import com.ssafy.dabid.domain.inquiry.dto.InquiryResponseDto;
import com.ssafy.dabid.domain.inquiry.entity.Inquiry;
import com.ssafy.dabid.domain.inquiry.entity.InquiryImage;
import com.ssafy.dabid.domain.inquiry.repository.InquiryImageRepository;
import com.ssafy.dabid.domain.inquiry.repository.InquiryRepository;
import com.ssafy.dabid.domain.member.dto.response.TransactionResponseDto;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.global.status.CommonResponseDto;
import com.ssafy.dabid.global.utils.S3Util;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService {

    private static final Logger log = LoggerFactory.getLogger(InquiryServiceImpl.class);
    private final InquiryRepository inquiryRepository;
    private final MemberRepository memberRepository;
    private final InquiryImageRepository inquiryImageRepository;
    private final S3Util s3Util;

    @Override
    public CommonResponseDto createInquiry(InquiryRequestDto dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NullPointerException("존재하지 않는 Member"));

        Inquiry inquiry = Inquiry.createInquiry(dto, member);

        inquiry = inquiryRepository.save(inquiry);

        List<String> imageList = s3Util.uploadFiles(dto.getImages());

        for(String image : imageList) {
            inquiryImageRepository.save(InquiryImage.builder()
                    .inquiry(inquiry)
                    .imageUrl(image)
                    .build()
            );
        }

        return new CommonResponseDto();
    }

    @Override
    public CommonResponseDto getMyInquiry(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NullPointerException("존재하지 않는 Member"));
        InquiryResponseDto dto = new InquiryResponseDto();
        List<InquiryResponseDto.InquiryItem> itemList = new ArrayList<>();

        List<Inquiry> inquiryList = inquiryRepository.findByMember(member);

        for(Inquiry inquiry : inquiryList) {
            InquiryResponseDto.InquiryItem item = new InquiryResponseDto.InquiryItem();
            item.setTitle(inquiry.getTitle());
            item.setContent(inquiry.getContent());
            item.setCategory(inquiry.getCategory().name());
            item.setInquiryId(inquiry.getId());

            List<String> imageUrlList = new ArrayList<>();
            List<InquiryImage> imageList = inquiryImageRepository.findByInquiry_Id(inquiry.getId());
            for(InquiryImage image : imageList) {
                imageUrlList.add(s3Util.generateFileUrl(image.getImageUrl()));
            }
            item.setImageUrls(imageUrlList);
            itemList.add(item);
        }
        dto.setList(itemList);

        return dto;
    }

    private List<InquiryResponseDto.InquiryItem>  getInquiry() {
        List<InquiryResponseDto.InquiryItem> itemList = new ArrayList<>();

        List<Inquiry> inquiryList = inquiryRepository.findAll();

        for(Inquiry inquiry : inquiryList) {
            InquiryResponseDto.InquiryItem item = new InquiryResponseDto.InquiryItem();
            item.setTitle(inquiry.getTitle());
            item.setContent(inquiry.getContent());
            item.setCategory(inquiry.getCategory().name());
            item.setInquiryId(inquiry.getId());

            List<String> imageUrlList = new ArrayList<>();
            List<InquiryImage> imageList = inquiryImageRepository.findByInquiry_Id(inquiry.getId());
            for(InquiryImage image : imageList) {
                imageUrlList.add(s3Util.generateFileUrl(image.getImageUrl()));
            }
            item.setImageUrls(imageUrlList);
            itemList.add(item);
        }
        return itemList;
    }


    public String writeCsv() throws IOException {
        String filePath = System.getProperty("user.home")+"/Downloads/inquiries.csv";
        List<InquiryResponseDto.InquiryItem> dtos = getInquiry();

        try (FileWriter writer = new FileWriter(filePath, Charset.forName("EUC-KR"));
             CSVWriter csvWriter = new CSVWriter(writer)) {

            String[] header = {"ID", "제목", "내용", "카테고리", "이미지"};
            csvWriter.writeNext(header);

            for (InquiryResponseDto.InquiryItem dto : dtos) {
                String[] data = {
                        String.valueOf(dto.getInquiryId()),
                        dto.getTitle(),
                        dto.getContent(),
                        dto.getCategory(),
                        String.join(", ", dto.getImageUrls())
                };
                csvWriter.writeNext(data);
            }
        }

        return filePath;
    }

    @Override
    public Workbook createExcelFile() {
        Workbook wb = new SXSSFWorkbook();
        Sheet sheet = wb.createSheet();

        List<InquiryResponseDto.InquiryItem> inquiryItems = getInquiry();

        String[] header = {"ID", "제목", "내용", "카테고리", "이미지"};
        Row headerRow = sheet.createRow(0);
        for (int i = 0; i < header.length; i++)
            headerRow.createCell(i).setCellValue(header[i]);

        for(int i = 0; i < inquiryItems.size(); i++) {
            Row bodyRow = sheet.createRow(1 + i);

            //코드 리팩토링 필요
            InquiryResponseDto.InquiryItem item = inquiryItems.get(i);
            Cell id = bodyRow.createCell(0);
            id.setCellValue(item.getInquiryId());
            Cell title = bodyRow.createCell(1);
            title.setCellValue(item.getTitle());
            Cell content = bodyRow.createCell(2);
            content.setCellValue(item.getContent());
            Cell category = bodyRow.createCell(3);
            category.setCellValue(item.getCategory());
            Cell imageUrls = bodyRow.createCell(4);
            imageUrls.setCellValue(String.join(", ", item.getImageUrls()));
        }

        return wb;
    }
}
