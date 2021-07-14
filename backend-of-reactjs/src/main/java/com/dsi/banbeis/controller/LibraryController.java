package com.dsi.banbeis.controller;


import com.dsi.banbeis.repository.BookRepository;
import org.keycloak.KeycloakPrincipal;
import org.keycloak.KeycloakSecurityContext;
import org.keycloak.representations.AccessToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class LibraryController {
	private final HttpServletRequest request;
	private final BookRepository bookRepository;

	@Autowired
	public LibraryController(HttpServletRequest request, BookRepository bookRepository) {
		this.request = request;
		this.bookRepository = bookRepository;
	}

/*	@GetMapping(value = "/")
	public String getHome() {
		return "index";
	}*/

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
		return "session_id";
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
		return "redirect:/";
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
