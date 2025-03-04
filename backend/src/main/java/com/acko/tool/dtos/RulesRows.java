package com.acko.tool.dtos;

import java.util.List;

public class RulesRows {


    List<CellEntry> inputEntries;
    List<CellEntry> outputEntries;
    String annotations;

    public List<CellEntry> getInputEntries() {
        return inputEntries;
    }

    public void setInputEntries(List<CellEntry> inputEntries) {
        this.inputEntries = inputEntries;
    }

    public List<CellEntry> getOutputEntries() {
        return outputEntries;
    }

    @Override
    public String toString() {
        return "RulesRows{" +
                "inputEntries=" + inputEntries +
                ", outputEntries=" + outputEntries +
                ", annotations='" + annotations + '\'' +
                '}';
    }

    public void setOutputEntries(List<CellEntry> outputEntries) {
        this.outputEntries = outputEntries;
    }

    public String getAnnotations() {
        return annotations;
    }

    public void setAnnotations(String annotations) {
        this.annotations = annotations;
    }
}
