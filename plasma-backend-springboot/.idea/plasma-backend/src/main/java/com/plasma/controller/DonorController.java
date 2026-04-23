package com.plasma.controller;
import com.plasma.dto.DonorDto;
import com.plasma.entity.Donor;
import com.plasma.service.DonorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/donors")
public class DonorController {
    private final DonorService service;
    public DonorController(DonorService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<Donor> add(@Valid @RequestBody DonorDto d) { return ResponseEntity.ok(service.add(d)); }

    @GetMapping
    public ResponseEntity<List<Donor>> all() { return ResponseEntity.ok(service.all()); }

    @GetMapping("/search")
    public ResponseEntity<List<Donor>> search(@RequestParam(required = false) String bloodGroup,
                                              @RequestParam(required = false) String location) {
        return ResponseEntity.ok(service.search(bloodGroup, location));
    }
}
