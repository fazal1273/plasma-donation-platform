package com.plasma.service;
import com.plasma.dto.DonorDto;
import com.plasma.entity.Donor;
import com.plasma.repository.DonorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DonorService {
    private final DonorRepository repo;
    public DonorService(DonorRepository repo) { this.repo = repo; }

    public Donor add(DonorDto d) {
        return repo.save(Donor.builder()
            .name(d.getName()).bloodGroup(d.getBloodGroup())
            .location(d.getLocation()).contact(d.getContact())
            .lastDonationDate(d.getLastDonationDate()).build());
    }
    public List<Donor> all() { return repo.findAll(); }
    public List<Donor> search(String bloodGroup, String location) {
        String bg = (bloodGroup == null || bloodGroup.isBlank()) ? null : bloodGroup;
        String loc = (location == null || location.isBlank()) ? null : location;
        return repo.search(bg, loc);
    }
}
