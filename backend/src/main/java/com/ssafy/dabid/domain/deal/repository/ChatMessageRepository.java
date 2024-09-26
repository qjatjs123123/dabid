package com.ssafy.dabid.domain.deal.repository;

import com.ssafy.dabid.domain.deal.entity.ChatMessage;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatMessageRepository extends MongoRepository<ChatMessage, ObjectId> {
    List<ChatMessage> findByDealIdOrderByCreatedAtAsc(int dealId);
}
