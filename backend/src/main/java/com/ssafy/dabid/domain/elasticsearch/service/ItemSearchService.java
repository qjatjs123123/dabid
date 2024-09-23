package com.ssafy.dabid.domain.elasticsearch.service;

import com.ssafy.dabid.domain.elasticsearch.entity.ItemDocument;
import com.ssafy.dabid.domain.elasticsearch.repository.ItemSearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemSearchService {

    private final ItemSearchRepository itemSearchRepository;

    public ItemDocument createItem(ItemDocument itemDocument) {
        return itemSearchRepository.save(itemDocument);
    }

    public List<ItemDocument> getItemByName(String keyword) {
        List<ItemDocument> byName = itemSearchRepository.findByName(keyword);
        return byName;
    }

}
