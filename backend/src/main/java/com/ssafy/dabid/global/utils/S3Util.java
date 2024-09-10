package com.ssafy.dabid.global.utils;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Util {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    // 파일 업로드
    public List<String> uploadFiles(List<MultipartFile> multipartFile) {
        List<String> fileNameList = new ArrayList<>();

        multipartFile.forEach(file -> {
            String fileName = createFileName(file.getOriginalFilename());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try(InputStream inputStream = file.getInputStream()) {
                amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));
            } catch(IOException e) {
//                throw new BusinessException(ErrorCode.FILE_UPLOAD_ERROR, "파일 업로드에 실패했습니다.");
            }

            fileNameList.add(fileName);
        });

        return fileNameList;
    }

    // 파일 삭제
    public void deleteFile(String fileName) {
        amazonS3.deleteObject(bucket, fileName);
    }

    // 파일명 중복 방지 (UUID)
    private String createFileName(String fileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    // 파일 유효성 검사
    private String getFileExtension(String fileName) {
        ArrayList<String> fileValidate = new ArrayList<>();
        fileValidate.add(".jpg");
        fileValidate.add(".jpeg");
        fileValidate.add(".png");
        fileValidate.add(".JPG");
        fileValidate.add(".JPEG");
        fileValidate.add(".PNG");
        String idxFileName = fileName.substring(fileName.lastIndexOf("."));
        if (!fileValidate.contains(idxFileName)) {
//            throw new BusinessException(ErrorCode.FILE_FORMAT_ERROR, "잘못된 파일 포맷 형식입니다.");
        }
        return fileName.substring(fileName.lastIndexOf("."));
    }

    // 파일 URL 조회
    public String generateFileUrl(String fileName) {
        // S3 객체의 URL을 생성합니다. 이 URL은 공개적으로 접근 가능한 경우에만 유효합니다.
        return amazonS3.getUrl(bucket, fileName).toString();
    }
}