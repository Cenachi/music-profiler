package com.music.api.storage;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class InvokeScript {
    public static void runScript(String pathPython){
        String command = pathPython;
        try {
            // print a message
            System.err.println("Executing python\n"+command);
            // create a process
            Process p = Runtime.getRuntime().exec(command);
            BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()));
            String line;
            System.out.println("Linha: "+ reader.readLine());
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
}
