package org.project2_geog777.servlet;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.project2_geog777.servlet.Project2_DBUtility;
import java.sql.*;


/**
 * Servlet implementation class HttpServlet
 */
@WebServlet("/HttpServlet")
public class HttpServlet extends javax.servlet.http.HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see javax.servlet.http.HttpServlet#javax.servlet.http.HttpServlet()
     */
    public HttpServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		JSONObject data = new JSONObject();
		
		String tab_id = request.getParameter("tab_id");
		System.out.println(tab_id);
		
		if(tab_id.equals("0")) {
			System.out.println("A report is submitted!");
			try {
				createReport(request, response);
			}catch(SQLException e ) {
				e.printStackTrace();
			}
		}
		
		else if(tab_id.equals("1")) {
			try {
				queryReport(request, response);
			}catch (JSONException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		else if(tab_id.equals("2")) {
			try {
				ReportSiting(request, response);
			}catch (JSONException e) {
				e.printStackTrace();
			}catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	private void createReport(HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException{
		Project2_DBUtility dbutil = new Project2_DBUtility();
		String sql;
		
		int contact_id;
		String user_fn = request.getParameter("user_fn");
		String user_ln = request.getParameter("user_ln");
		String user_tel = request.getParameter("user_tel");
		String user_email = request.getParameter("user_email");
		String user_add = request.getParameter("user_add");
		if(user_fn != null) {user_fn = "'" + user_fn + "'";}
		if(user_ln != null) {user_ln = "'" + user_ln + "'";}
		if(user_tel != null) {user_tel = "'" + user_tel + "'";}
		if(user_email != null) {user_email = "'" + user_email + "'";}
		if(user_fn != null && user_ln != null) {
			sql = "insert into user_info(first_name, last_name, email, phone, address) VALUES (" +
			user_fn + "," + user_ln + "," + user_email + "," + user_tel + "," + user_add + ")";
		dbutil.modifyDB(sql);
		//ResultSet res_1 = dbutil.queryDB("select last_value from ID");
		//res_1.next();
		//contact_id = res_1.getInt(1);
		System.out.println("Success! user created!");
		
		JSONObject data = new JSONObject();
		try{
		data.put("status", "success");
		
		}catch (JSONException e) {
			e.printStackTrace();
		}
		response.getWriter().write(data.toString());
		
		}else {
		System.out.println("error");	
		}
		}
	private void ReportSiting(HttpServletRequest request, HttpServletResponse response) throws JSONException, SQLException, IOException{
		Project2_DBUtility dbutil = new Project2_DBUtility();
		String sql;
		String Lat = request.getParameter("Lat");
		String Lon = request.getParameter("Lon");
		String animal = request.getParameter("animal");
		
		if(Lat != null) {Lat = Lat;}
		if(Lon != null) {Lon = Lon;}
		if(animal != null) {animal = "'" + animal + "'";}
		if(Lat != null && Lon != null && animal != null) {
			sql = "insert into wildlife_sites(location_area, description) VALUES (ST_GeomFromText(" + "'" + "POINT(" + Lat + " " + Lon + ")" + "'" + ", 4326)," + animal + ")";
			System.out.println(sql);
			dbutil.modifyDB(sql);		
			JSONObject data = new JSONObject();
			try{
			data.put("status", "success");
			
			}catch (JSONException e) {
				e.printStackTrace();
			}
			response.getWriter().write(data.toString());
			
			}else {
			System.out.println("error");	
			}
		}
		
		
	
	private void queryReport(HttpServletRequest request, HttpServletResponse response) throws JSONException, SQLException, IOException{
	JSONArray list = new JSONArray();
	
	/*if(request.getParameter("description") == "rabbit") {
	//String name = request.getParameter("rabbit");
	String sql = "select * from wildlife_sites where description = 'rabbit'";
	queryReportHelper(sql, list);
	response.getWriter().write(list.toString());
	} else if(request.getParameter("description") == "deer") {
		//String name = request.getParameter("deer");
		String sql = "select * from wildlife_sites where description = 'deer'";
		queryReportHelper(sql, list);
		response.getWriter().write(list.toString());
		
	} else if(request.getParameter("description") == "bear") {
		
		//String name = request.getParameter("bear");
		String sql = "select * from wildlife_sites where description = 'bear'";
		queryReportHelper(sql, list);
		response.getWriter().write(list.toString());
	}*/
	System.out.println(request.getParameter("description"));
	String sql = "select description, ST_AsText(location_area) as location_area from wildlife_sites where description = " + "'" + request.getParameter("description") + "'";
	queryReportHelper(sql, list);
	response.getWriter().write(list.toString());
	}
	
	private void queryReportHelper(String sql, JSONArray list) throws SQLException{
		Project2_DBUtility dbutility = new Project2_DBUtility();
		
		ResultSet res = dbutility.queryDB(sql);
		System.out.println(sql);
		while(res.next()) {
			HashMap<String, String> m = new HashMap<String, String>();
			//m.put("ID", res.getString("animal_spot_id"));
			m.put("Animal Description", res.getString("Description"));
			m.put("Location", res.getString("location_area"));
			//m.put("Time", res.getString("time_val"));
			list.put(m);
			
		}
	}
	public void main() throws JSONException{
		
	}
}