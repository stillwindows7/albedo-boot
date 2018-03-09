package com.albedo.java.common.config;

import org.mybatis.spring.annotation.MapperScan;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@ComponentScan(basePackages = "com.albedo.java.*")
@MapperScan("com.albedo.java.modules.*.repository")
public class DatabaseAutoConfiguration {

    private final Logger log = LoggerFactory.getLogger(DatabaseAutoConfiguration.class);

    private ResourceLoader resourceLoader;

//    @Bean
//    public SqlSessionFactoryBean sqlSessionFactory(DataSource dataSource) {
//        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
//        factoryBean.setDataSource(dataSource);
//        factoryBean.setTransactionFactory(new ReadWriteManagedTransactionFactory());
//        return factoryBean;
//    }

    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

//    @Bean
//    public AuditorAware<Long> auditorAware() {
//        return new AuditorAware<Long>() {
//            @Override
//            public Long getCurrentAuditor() {
//                return 1001L;
//            }
//        };
//    }

//    @Bean
//    @ConditionalOnMissingBean
//    public AuditDateAware<Date> auditDateAware() {
//        return new AuditDateAware<Date>() {
//            @Override
//            public Date getCurrentDate() {
//                return new Date();
//            }
//        };
//    }
//
//    @Override
//    public void setResourceLoader(ResourceLoader resourceLoader) {
//
//        this.resourceLoader = resourceLoader;
//    }
}
