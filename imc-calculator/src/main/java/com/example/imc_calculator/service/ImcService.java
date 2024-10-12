package com.example.imc_calculator.service;

import com.example.imc_calculator.model.ImcRecord;
import com.example.imc_calculator.repository.ImcRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImcService {

    @Autowired
    private ImcRecordRepository imcRecordRepository;

    public ImcRecord calculateImc(Float weight, Float height) {
        ImcRecord record = new ImcRecord(weight, height);
        // Salva o registro com IMC calculado
        return imcRecordRepository.save(record);
    }
}
