package com.qgbase.util;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;


/**
 * 从promotionClient里移过来的
 *
 * @author 葛建科
 * @version 1.0.0
 * @date 2012-11-20 copy
 */

public class JsonUtil {
    private static Gson gson = new GsonBuilder()
            .setDateFormat("yyyy-MM-dd HH:mm:ss")
            .create();
    protected static Logger log = LoggerFactory.getLogger(JsonUtil.class);

    private static ObjectMapper mapper = new ObjectMapper();

    private static ObjectMapper mapperObject = new ObjectMapper();

    static {
        mapper.configure(SerializationFeature.INDENT_OUTPUT, true);
        mapperObject.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    /**
     * 将json字符串转为Map,json字符串必须是简单类型，不能包含子类
     *
     * @param jsonStr
     * @return
     */
    public static Map fromJsonToMap(String jsonStr) {
        Gson json = new GsonBuilder().registerTypeAdapter(Map.class, new JsonDeserializer<Map>() {
            public Map deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) {
                Map newMap = new HashMap();
                JsonObject jsonObject = json.getAsJsonObject();
                Set<Map.Entry<String, JsonElement>> entrySet = jsonObject.entrySet();
                for (Map.Entry<String, JsonElement> entry : entrySet) {
                    if (!entry.getValue().isJsonObject()) {
                        Object value = entry.getValue().isJsonNull() ? JsonNull.INSTANCE
                                : entry.getValue().getAsString();
                        newMap.put(entry.getKey(), value);
                    }

                }
                return newMap;
            }
        }).create();
        Map object = (Map) json.fromJson(jsonStr, Map.class);
        return object;
    }

    /**
     * 把JSON字符串转成对象
     *
     * @param jsonString json字符串
     * @param clazz      类
     * @return 对象
     * @throws IOException          抛出异常
     * @throws JsonMappingException 抛出异常
     * @throws JsonParseException   抛出异常
     */
    public static <T> T getObjectFormJsonByjackson(String jsonString, Class<T> clazz) throws JsonParseException, JsonMappingException, IOException {
        T jsonObject = null;
        jsonObject = mapper.readValue(jsonString, clazz);
        return jsonObject;
    }

    /**
     * 把JSON字符串转成对象
     *
     * @param jsonString json字符串
     * @param clazz      类
     * @return 对象
     * @throws IOException          抛出异常
     * @throws JsonMappingException 抛出异常
     * @throws JsonParseException   抛出异常
     */
    public static <T> T toObject(String jsonString, Class<T> clazz) throws JsonParseException, JsonMappingException, IOException {
        T jsonObject = null;
        jsonObject = mapperObject.readValue(jsonString, clazz);
        return jsonObject;
    }

    /**
     * 把对象转换成json字符串
     *
     * @param object 对象
     * @return json字符串
     * @throws JsonGenerationException
     * @throws JsonMappingException
     * @throws IOException
     */
    public static String getJsonStrByObject(Object object) throws JsonGenerationException, JsonMappingException, IOException {
        return mapper.writeValueAsString(object);
    }

    public static Object fromJson(String jsonStr, Type type) {
        Gson json = new Gson();
        Object object = json.fromJson(jsonStr, type);
        return object;
    }

    public static List<HashMap<String, Object>> fromJsonToList(String jsonStr) {
        Gson json = new Gson();
        List<HashMap<String, Object>> list = json.fromJson(jsonStr, new TypeToken<List<HashMap<String, Object>>>() {
        }.getType());
        return list;
    }

    public static String toJson(Object obj) {
        return gson.toJson(obj);
    }

    public static Object fromJson2Obj(String jsonStr, Type type) {
        Gson json = new Gson();
        Object list = json.fromJson(jsonStr, type);
        return list;
    }

    public static String genJsonData(Object jsonData) {
        Gson json = new Gson();
        String resultString = json.toJson(jsonData);
        return resultString;
    }
}
