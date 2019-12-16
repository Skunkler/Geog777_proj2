package dbutility;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Connection conn;
		Statement stmt;
		try {
			Class.forName("org.postgresql.Driver");
			
			String url = "jdbc:postgresql://localhost:5432/Park_Database";
			conn=DriverManager.getConnection(url, "postgres", "Gloworm2");
			String sql = "select * from user_info;";
			stmt = conn.createStatement();
			ResultSet res = stmt.executeQuery(sql);
			
			if(res != null) {
				while(res.next()) {
					System.out.println("first_name: " + res.getString("first_name"));
				}
			}
			stmt.close();
			conn.close();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
	}

}
