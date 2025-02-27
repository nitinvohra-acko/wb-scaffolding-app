package com.acko.tool.utils;

import java.util.HashMap;
import java.util.Objects;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class JSONUtils {
    public Object setKeyInObject(Object mainObj, String location, Object dataToSet) {
        String[] keys = location.split("\\.");
        HashMap<String, Object> result = (HashMap<String, Object>) mainObj;
        for(int i = 0;i<keys.length;i++) {
            if(i == keys.length-1) {
                result.put(keys[i], dataToSet);
            } else if(Objects.nonNull(result.get(keys[i]))) {
                result = (HashMap<String, Object>) result.get(keys[i]);
            } else if(i != keys.length-1){
                (result).put(keys[i], new HashMap<>());
                result = (HashMap<String, Object>) result.get(keys[i]);
            }
        }
        return mainObj;
    }

}
