package com.music.api.service;

import com.music.api.repositories.UserRepository;

import org.apache.commons.math3.ml.clustering.Clusterer;
import org.apache.commons.math3.ml.clustering.KMeansPlusPlusClusterer;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;
import smile.clustering.CentroidClustering;
import smile.clustering.KMeans;
import weka.clusterers.SimpleKMeans;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.converters.CSVLoader;
import weka.filters.unsupervised.attribute.Remove;


import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
    }
    @Value("${user.home}")
    private String root;

    private String directory = " ";

    private String originalFileName;


    //salvando o arquivo no diretório passado
    public void savedFile(MultipartFile file, String namePath){

        System.out.println("Nome do arquivo: "+file.getOriginalFilename());

        this.originalFileName = file.getOriginalFilename();
        this.directory = extractExtension(originalFileName);
        this.save(namePath, file);
    }

    //extraindo apenas o nome do arquivo sem a extensão
    private String extractExtension(String nameFile){
        System.out.println("Nome do arquivo: "+nameFile);

        int index = nameFile.indexOf(".");
        return nameFile.substring(0, index);
    }
    public void save(String namePath, MultipartFile file) {

        System.out.println("Nome do arquivo: " + file.getOriginalFilename());

        // diretório padrão que a aplicação vai sempre criar
        Path patternPath = Paths.get(this.root, namePath);

        // diretório onde será salvo
        Path dirPath = Paths.get(this.root, namePath);

        // diretório mais o nome do arquivo
        Path filePath = dirPath.resolve(file.getOriginalFilename());

        try {
            // criando o diretório caso não existe
            if (!Files.exists(patternPath)) {
                Files.createDirectories(patternPath);            }

            // transferindo o arquivo para onde deve ser salvo
            file.transferTo(filePath.toFile());
        } catch (IOException e) {
            throw new RuntimeException("Problema na tentativa de salvar o arquivo");
        }
    }
}