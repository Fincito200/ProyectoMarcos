import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        SistemaClinica sistema = new SistemaClinica();

        // Registrar usuario de prueba
        sistema.registrar(new Paciente("Juan", "juan@gmail.com", "1234"));

        System.out.println("=== LOGIN CLINICA ===");

        System.out.print("Correo: ");
        String correo = sc.nextLine();

        System.out.print("Password: ");
        String password = sc.nextLine();

        if (sistema.login(correo, password)) {
            System.out.println("✅ Login correcto");
        } else {
            System.out.println("❌ Credenciales incorrectas");
        }
    }
}