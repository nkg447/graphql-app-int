package dev.nikunjgupta.graphql;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public final class Util {
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private Util() {
    }

    public static String readFile(String filePath) throws IOException {
        StringBuilder resultStringBuilder = new StringBuilder();
        try (BufferedReader br
                     = new BufferedReader(new InputStreamReader(new FileInputStream(filePath)))) {
            String line;
            while ((line = br.readLine()) != null) {
                resultStringBuilder.append(line).append("\n");
            }
        }
        return resultStringBuilder.toString();
    }

    public static String readResourceFile(String file) throws IOException {
        return readFile(Util.class.getClassLoader().getResource(file).getFile());
    }

    public static <T> T jsonToObject(String json, Class<T> clazz) throws JsonProcessingException {
        return OBJECT_MAPPER.readValue(json, clazz);
    }

    public static <T> T jsonToObject(String json, TypeReference<T> typeReference) throws JsonProcessingException {
        return OBJECT_MAPPER.readValue(json, typeReference);
    }

    public static String objectToJson(Object object) throws JsonProcessingException {
        String output = OBJECT_MAPPER.writeValueAsString(object);
        if (output.startsWith("\"") && output.endsWith("\""))
            output = output.substring(1, output.length() - 1);
        return output;
    }

    public static boolean notNullOrEmpty(String value) {
        return value != null && value.length() > 0;
    }
}
