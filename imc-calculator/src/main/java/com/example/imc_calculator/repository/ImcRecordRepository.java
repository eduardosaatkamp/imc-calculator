package com.example.imc_calculator.repository;

import com.example.imc_calculator.model.ImcRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface ImcRecordRepository extends JpaRepository<ImcRecord, Long> {
}
