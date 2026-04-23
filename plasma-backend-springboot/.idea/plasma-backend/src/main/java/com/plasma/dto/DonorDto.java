package com.plasma.dto;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDate;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class DonorDto {
    @NotBlank @Size(max = 100) private String name;
    @NotBlank private String bloodGroup;
    @NotBlank @Size(max = 100) private String location;
    @NotBlank @Size(max = 20) private String contact;
    private LocalDate lastDonationDate;
}
