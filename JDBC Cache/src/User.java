/**
 * Created by Max on 2/9/2015.
 */
public class User{
    private String ID;
    private String Name;
    private String type;
    private String login;
    private String password;
    private String email;
    private String jobTitle;
    private String workPlace;
    private String Projects;
    private String Documents;

    public String getID() {
        return ID;
    }
    public void setID(String ID) {
        this.ID = ID;
    }

    public String getName() {
        return Name;
    }
    public void setName(String name) {
        Name = name;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getLogin() {
        return login;
    }
    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getJobTitle() {
        return jobTitle;
    }
    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getWorkPlace() {
        return workPlace;
    }
    public void setWorkPlace(String workPlace) {
        this.workPlace = workPlace;
    }

    public String getProjects() {
        return Projects;
    }
    public void setProjects(String projects) {
        Projects = projects;
    }

    public String getDocuments() {
        return Documents;
    }
    public void setDocuments(String documents) {
        Documents = documents;
    }
}
