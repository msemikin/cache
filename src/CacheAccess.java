/**
 * Created by Max on 2/9/2015.
 */
import java.sql.*;
public class CacheAccess{
     private String url;
     //the Url to connect to (jdbc:Cache://IP-Addr:IP-Port/Nspace/LogFile)
     private String username="_SYSTEM";  //JDBC Username in Cache
     private String password="SYS";      //Password for _SYSTEM user
     private Connection conn;	 	 	 //JDBC Connection Object

     public CacheAccess(String url){
         this.url = url;
     }
     public CacheAccess(String username, String password, String url){
         this.username = username;
         this.password = password;
         this.url = url;
     }

     private void establishConnection(){

         //--- Load the Cache JDBC Driver ---
         try {
             //TODO: LOAD Cache JDBC DRIVER
             Class.forName("com.intersys.jdbc.CacheDriver");

         } catch (java.lang.ClassNotFoundException e) {
             System.err.print("ClassNotFoundException: ");
             System.err.print(e.getMessage());
             return ;
         }

         //--- Connect to the Datasource ---
         try {
             //TODO:Connect to the DataSource
             conn=DriverManager.getConnection(url,username,password);

         } catch (Exception e) {
             e.printStackTrace();
             return ;
         }
     }

     public void insertUser(User user){

     }

     public User selectUser(String ID){
         Statement stmt;
         ResultSet rs;
         String stQuery="SELECT * FROM USER WHERE UID = "+ID+";";

         establishConnection();

         //TODO: Create Statement for the connection "conn"
         try{
             stmt=conn.createStatement();

             //TODO: Execute The Query
             rs=stmt.executeQuery(stQuery);

             //TODO: Browse ResultSet & Print columns
             ResultSetMetaData rsmd=rs.getMetaData();
             int column=rsmd.getColumnCount();
             while (rs.next()) {
                 for (int i=1;i<=column;i++) {
                     System.out.print(rs.getString(i)+"  ");
                 }
             }
             return new User();
         } catch (SQLException e) {
             e.printStackTrace();
             return null;
         }
     }
 }


