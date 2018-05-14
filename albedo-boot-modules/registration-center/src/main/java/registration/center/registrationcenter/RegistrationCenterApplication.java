package registration.center.registrationcenter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class RegistrationCenterApplication {

	public static void main(String[] args) {
		     SpringApplication.run(RegistrationCenterApplication.class, args);
		     //new SpringApplicationBuilder(RegistrationCenterApplication.class).web(true).run(args);
	}
}
