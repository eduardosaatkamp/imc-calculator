package com.example.imc_calculator.controller;

import com.example.imc_calculator.model.ImcRecord;
import com.example.imc_calculator.service.ImcService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/imc")
public class ImcController {

    @Autowired
    private ImcService imcService;

    @PostMapping
    public ImcRecord calculateImc(@RequestBody ImcRecord imcRecord) {
        System.out.println("Received weight: " + imcRecord.getWeight());
        System.out.println("Received height: " + imcRecord.getHeight());
        return imcService.calculateImc(imcRecord.getWeight(), imcRecord.getHeight());
    }
}

