package com.music.api.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.apache.commons.math3.ml.clustering.Clusterable;


@Entity
@Data
@AllArgsConstructor
public class User implements Clusterable {

    @Id
//  @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_user;

    @Column
    private int horas_rock;
    @Column
    private int horas_samba;
    @Column
    private int horas_pop;
    @Column
    private  int horas_rap;

    public User() {

    }

    @Override
    public double[] getPoint() {
        return new double[0];
    }
}
