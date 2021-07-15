package com.dsi.banbeis.controller;


import com.dsi.banbeis.model.Book;
import com.dsi.banbeis.repository.BookRepository;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@CrossOrigin("*")
public class LibraryController {

	String redirectUrl = "http" + "://localhost:3000";
	private final HttpServletRequest request;
	private final BookRepository bookRepository;

	@Autowired
	public LibraryController(HttpServletRequest request, BookRepository bookRepository) {
		this.request = request;
		this.bookRepository = bookRepository;
	}

	@GetMapping(value = "books/all", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Book>
	all() {
/*		configCommonAttributes(model);
		model.addAttribute("books", bookRepository.readAll());*/
		return  bookRepository.readAll();
	}

	@GetMapping(value = "/books")
	public String getBooks(Model model, HttpSession session) {


		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		KeycloakPrincipal keycloakPrincipal = (KeycloakPrincipal) request.getUserPrincipal();

		AccessToken token = keycloakPrincipal.getKeycloakSecurityContext().getToken();

		//System.out.println(authentication);
		System.out.println(token.getEmail());
		//redirect to react
		//

		configCommonAttributes(model);
		model.addAttribute("books", bookRepository.readAll());
		model.addAttribute("session_id",session.getId());

		//String redirectUrl = "http" + "://demo-board.com";
		return "redirect:" + redirectUrl;
	}

	@GetMapping(value = "/manager")
	public String getManager(Model model) {
		configCommonAttributes(model);
		model.addAttribute("books", bookRepository.readAll());
		return "manager";
	}

	@GetMapping(value = "/logout")
	public String logout() throws ServletException {
		request.logout();
		return "redirect:"+redirectUrl;
	}

	private void configCommonAttributes(Model model) {
		model.addAttribute("name", getKeycloakSecurityContext().getIdToken().getGivenName());
	}

	/**
	 * The KeycloakSecurityContext provides access to several pieces of information
	 * contained in the security token, such as user profile information.
	 */
	private KeycloakSecurityContext getKeycloakSecurityContext() {
		return (KeycloakSecurityContext) request.getAttribute(KeycloakSecurityContext.class.getName());
	}
}
