package com.acko.tool.controller;

import com.acko.tool.entity.search.SearchParam;
import com.acko.tool.entity.search.TaskSearch;
import com.acko.tool.service.SearchService;
import com.acko.tool.utils.JSONUtils;
import com.acko.tool.utils.ReflectionUtil;
import com.acko.tool.utils.SearchUtils;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
@AllArgsConstructor
public class SearchController {
    SearchService searchService;
    SearchUtils searchUtils;
    private final ReflectionUtil reflectionUtil;
    private final JSONUtils jsonUtils;
    @GetMapping("/params")
    SearchParam getParamsForEntity(
        @RequestParam(value = "entity") String entity
    ) {
        return searchService.getParamsForEntity(entity);
    }

    @PutMapping("/params")
    SearchParam getParamsForEntity(
        @RequestBody SearchParam searchParamRequest
    ) {
        return searchService.createOrUpdateSearchParam(searchParamRequest);
    }

    @PostMapping("/{entity}")
    Object searchTasks(

        @PathVariable(value = "entity") String entity,
        @RequestBody TaskSearch searchRequest
    ) throws IOException {
        return searchService.searchTasks(searchRequest, entity);
    }

    @GetMapping("/fields/{entity}")
    public Object getTaskSearchFields(
        @PathVariable(value = "entity") String entity
    ) throws NoSuchFieldException {
        HashMap<String, Object> response = new HashMap<>();
        List<String> list = reflectionUtil.getFieldPaths(searchUtils.isEntityValid(entity), "");
        for(int i= 0; i<list.size(); i++){
            jsonUtils.setKeyInObject(response, list.get(i), new HashMap<>());
        }
        return response;
    }
}
