package com.utp.ProyectoMarcos.repository;

import com.utp.ProyectoMarcos.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByCorreo(String correo);
}