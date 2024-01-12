package com.music.api.controller;

import com.music.api.repositories.UserRepository;
import com.music.api.service.UserService;

import com.music.api.storage.InvokeScript;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    public UserController(UserService userService) {
    }

    @PostMapping("/upload")
    public ResponseEntity<Object> savedFile(@RequestBody MultipartFile file) {
        userService.savedFile(file, "uploads");

        InvokeScript.runScript("python "+ System.getProperty("user.dir")+ "\\cluster.py");

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Arquivo salvo com sucesso!"));
    }
}






