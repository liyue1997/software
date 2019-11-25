package com.qgbase.util;
/*

---------------------
    作者：zhangchao19890805
    来源：CSDN
    原文：https://blog.csdn.net/zhangchao19890805/article/details/53893735
    版权声明：本文为博主原创文章，转载请附上博文链接！
 */
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
public class CrosUtil{

}
//
//@Configuration
//public class CrosUtil extends WebMvcConfigurerAdapter {
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//       // registry.addMapping("/**").allowedOrigins("*")
//       //         .allowedMethods("GET", "HEAD", "POST","PUT", "DELETE", "OPTIONS")
//        //        .allowCredentials(false).maxAge(3600);
//        registry.addMapping("/**")
//                .allowedMethods("*")
//                .allowedOrigins("*")
//                .allowedHeaders("*");
//        super.addCorsMappings(registry);
//    }
//}
