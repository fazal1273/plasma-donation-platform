package com.plasma.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity @Table(name = "donors")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Donor {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String name;
    @Column(name = "blood_group", nullable = false) private String bloodGroup;
    @Column(nullable = false) private String location;
    @Column(nullable = false) private String contact;
    @Column(name = "last_donation_date") private LocalDate lastDonationDate;
}
