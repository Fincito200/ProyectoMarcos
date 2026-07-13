package com.utp.ProyectoMarcos.security;

import com.utp.ProyectoMarcos.repository.AdminRepository;
import com.utp.ProyectoMarcos.repository.MedicoRepository;
import com.utp.ProyectoMarcos.repository.PacienteRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClinicaUserDetailsService implements UserDetailsService {

    private final AdminRepository adminRepo;
    private final MedicoRepository medicoRepo;
    private final PacienteRepository pacienteRepo;

    public ClinicaUserDetailsService(AdminRepository adminRepo,
                                        MedicoRepository medicoRepo,
                                        PacienteRepository pacienteRepo) {
        this.adminRepo = adminRepo;
        this.medicoRepo = medicoRepo;
        this.pacienteRepo = pacienteRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        var admin = adminRepo.findByCorreo(correo);
        if (admin.isPresent()) {
            return User.builder()
                    .username(correo)
                    .password(admin.get().getPassword())
                    .authorities(List.of(new SimpleGrantedAuthority("ROLE_ADMIN")))
                    .build();
        }

        var medico = medicoRepo.findByCorreo(correo);
        if (medico.isPresent()) {
            return User.builder()
                    .username(correo)
                    .password(medico.get().getPassword())
                    .authorities(List.of(new SimpleGrantedAuthority("ROLE_MEDICO")))
                    .build();
        }

        var paciente = pacienteRepo.findByCorreo(correo);
        if (paciente.isPresent()) {
            return User.builder()
                    .username(correo)
                    .password(paciente.get().getPassword())
                    .authorities(List.of(new SimpleGrantedAuthority("ROLE_PACIENTE")))
                    .build();
        }

        throw new UsernameNotFoundException("Usuario no encontrado: " + correo);
    }
}