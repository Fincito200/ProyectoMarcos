import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String nombres = request.getParameter("nombres");
        String apellidos = request.getParameter("apellidos");
        String dni = request.getParameter("dni");
        String correo = request.getParameter("correo");
        String password = request.getParameter("password");

        try {
            // Conexión a MySQL
            Connection con = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/clinica", "root", "1234");

            String sql = "INSERT INTO pacientes(nombres, apellidos, dni, correo, password) VALUES (?, ?, ?, ?, ?)";

            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, nombres);
            ps.setString(2, apellidos);
            ps.setString(3, dni);
            ps.setString(4, correo);
            ps.setString(5, password);

            ps.executeUpdate();

            response.sendRedirect("login.html");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}