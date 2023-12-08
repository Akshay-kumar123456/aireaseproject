package com.airlinereservationsystem.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.airlinereservationsystem.main.enums.Role;
import com.airlinereservationsystem.main.service.UserService;


@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserService userService;
	
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(getProvider());
		
	}
    
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.authorizeRequests()
		.antMatchers("/flight/getbyairline/{date}/{aid}","/flight/getbytoday/{aid}","/flight//delete/{fid}","/flight/delete/{fid}","/flight/update/{id}/{date}","/flight/add/{aid}","/customerflight/flight/passengers/{fid}/{date}","/flight/getbyairline/{aid}","/airline/statistics/income/{aid}","/airline/statistics/passengers/{aid}","/airline/statistics/flights/{aid}","/customer/signup","/executive/add","/auth/login","/flight/all","/flight/getbysdd","/airline/getall","/route/getall","/flight/getbysdd/filter","/user/login","/flight/getone/{fid}","/getall/{fid}","/getavaliable/{fid}","/customerflight/bookticket/{cid}/{fid}","/customerflight/bookings/{cid}").permitAll()
		//.antMatchers("/flight/add/{aid}").hasRole("AIRLINE")
		.antMatchers(HttpMethod.POST,"/auth/login").authenticated()
		.anyRequest().authenticated()
		.and().httpBasic()
		.and()
		.csrf().disable()
		.cors().disable();
		
	}
	@Bean
	public PasswordEncoder getEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	public AuthenticationProvider getProvider() {
		DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
		dao.setPasswordEncoder(getEncoder());
		dao.setUserDetailsService(userService);
		
		return dao;
	}
	
	@Bean
	public Logger getLogger() {
		return LoggerFactory.getLogger("Log Records");
	}
	
	
	
	
	
	
	

}
