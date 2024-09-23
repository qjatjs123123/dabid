//package com.ssafy.dabid.global.config;
//
//import ch.qos.logback.classic.Level;
//import ch.qos.logback.classic.Logger;
//import ch.qos.logback.classic.LoggerContext;
//import ch.qos.logback.core.util.StatusPrinter;
//import net.logstash.logback.appender.LogstashTcpSocketAppender;
//import net.logstash.logback.encoder.LogstashEncoder;
//import org.slf4j.LoggerFactory;
//
//public class LogstashConfig {
//
//    public static void main(String[] args) {
//        LoggerContext context = (LoggerContext) LoggerFactory.getILoggerFactory();
//
//        // Logstash Appender 설정
//        LogstashTcpSocketAppender logstashAppender = new LogstashTcpSocketAppender();
//        logstashAppender.setName("LOGSTASH");
//        logstashAppender.setContext(context);
//        logstashAppender.addDestination("172.26.161.164:5000");
//
//        // Encoder 설정
//        LogstashEncoder encoder = new LogstashEncoder();
//        logstashAppender.setEncoder(encoder);
//
//        // Appender 시작
//        logstashAppender.start();
//
//        // Root logger 설정
//        Logger rootLogger = context.getLogger(Logger.ROOT_LOGGER_NAME);
//        rootLogger.setLevel(Level.INFO);
//        rootLogger.addAppender(logstashAppender);
//
//        // 상태 확인 (옵션)
//        StatusPrinter.print(context);
//    }
//}
