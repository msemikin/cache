package ua.nure.cache.entity;

public enum UserRoles {
    STUDENT("STUDENT"),
    TEACHER("TEACHER");

    String name;

    UserRoles(String name) {
        this.name = name;
    }

    public String toRole() {
        return "ROLE_" + this.name;
    }
}
