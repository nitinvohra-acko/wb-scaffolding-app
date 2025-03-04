package com.acko.tool.dtos;

import java.util.Objects;

public class CellEntry {
    Object value;
    String key;
    String dataType;

    public String getDataType() {
        return dataType;
    }

    public void setDataType(String dataType) {
        this.dataType = dataType;
    }

    public Object getValue() {
        return value;
    }

    public void setValue(Object value) {
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CellEntry)) return false;
        CellEntry cellEntry = (CellEntry) o;
        return Objects.equals(getValue(), cellEntry.getValue()) && Objects.equals(getKey(), cellEntry.getKey());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getValue(), getKey());
    }

    @Override
    public String toString() {
        return "CellEntry{" +
                "value=" + value +
                ", key='" + key + '\'' +
                ", dataType='" + dataType + '\'' +
                '}';
    }
}
