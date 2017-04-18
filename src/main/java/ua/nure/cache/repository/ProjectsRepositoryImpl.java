package ua.nure.cache.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import ua.nure.cache.entity.Project;
import ua.nure.cache.entity.User;

import javax.transaction.Transactional;
import java.security.Principal;

@Transactional
public class ProjectsRepositoryImpl implements ProjectRepositoryCustom {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final Principal principal;

    @Autowired
    public ProjectsRepositoryImpl(ProjectRepository projectRepository, UserRepository userRepository, Principal principal) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.principal = principal;
    }

    @Override
    public Project save(Project project) {
        final User owner = userRepository.findUserByEmail(principal.getName());
        project.setOwner(owner);
        return ((CrudRepository<Project, Integer>)projectRepository).save(project);
    }

}
