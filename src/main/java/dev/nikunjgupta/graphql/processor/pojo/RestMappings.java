package dev.nikunjgupta.graphql.processor.pojo;

import java.util.ArrayList;
import java.util.List;

public class RestMappings {
    private List<Rest> rests = new ArrayList<>();

    public RestMappings() {
    }

    public RestMappings(List<Rest> list) {
        this.rests = list;
    }

    public List<Rest> getRests() {
        return rests;
    }

    public void setRests(List<Rest> rests) {
        this.rests = rests;
    }
}
