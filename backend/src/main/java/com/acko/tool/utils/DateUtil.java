package com.acko.tool.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class DateUtil {

	public static String getDateInUTC(String dateString) {
        if (Objects.isNull(dateString)) {
            return null;
        }
        return getDateInUTC(toLocalDateTimeAtStartOfDay(dateString));
    }
	
    public static LocalDateTime toLocalDateTimeAtStartOfDay(String dateString) {
        if (Objects.isNull(dateString)) {
            return null;
        }
        return LocalDate.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd")).atStartOfDay();
    }
    
    public static String getDateInUTC(LocalDateTime dateToConvert) {
        if (Objects.isNull(dateToConvert)) {
            return null;
        }
        return dateToConvert.atZone(ZoneId.of("Asia/Kolkata")).withZoneSameInstant(ZoneOffset.UTC).toInstant().toString();
    }
    
    public static String getEndOfDayInUTC(String dateString) {
        if (Objects.isNull(dateString)) {
            return null;
        }
        return getDateInUTC(toLocalDateTimeAtEndOfDay(dateString));
    }
    
    public static LocalDateTime toLocalDateTimeAtEndOfDay(String dateString) {
        if (Objects.isNull(dateString)) {
            return null;
        }
        return LocalDate.parse(dateString, DateTimeFormatter.ofPattern("yyyy-MM-dd")).atTime(23,59,59);
    }
}
