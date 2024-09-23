package com.ssafy.dabid.domain.elasticsearch.controller;

import com.ssafy.dabid.domain.elasticsearch.entity.ItemDocument;
import com.ssafy.dabid.domain.elasticsearch.service.ItemSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/item/search")
public class ItemSearchController {

    private final ItemSearchService itemSearchService;

    @GetMapping
    public ResponseEntity<List<ItemDocument>> search(@RequestParam("keyword") String keyword) {
        return ResponseEntity.ok(itemSearchService.getItemByName(keyword));
    }

    @PostMapping
    public ResponseEntity<ItemDocument> create(@RequestBody ItemDocument itemDocument) {
        return ResponseEntity.ok(itemSearchService.createItem(itemDocument));
    }

}
