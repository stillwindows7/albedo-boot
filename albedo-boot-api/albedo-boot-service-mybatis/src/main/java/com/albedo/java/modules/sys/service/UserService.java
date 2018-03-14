package com.albedo.java.modules.sys.service;

import com.albedo.java.common.persistence.DynamicSpecifications;
import com.albedo.java.common.persistence.SpecificationDetail;
import com.albedo.java.common.persistence.service.DataVoService;
import com.albedo.java.modules.sys.domain.User;
import com.albedo.java.modules.sys.repository.OrgRepository;
import com.albedo.java.modules.sys.repository.RoleRepository;
import com.albedo.java.modules.sys.repository.UserRepository;
import com.albedo.java.util.PublicUtil;
import com.albedo.java.util.RandomUtil;
import com.albedo.java.util.domain.PageModel;
import com.albedo.java.util.domain.QueryCondition;
import com.albedo.java.vo.sys.UserVo;
import com.baomidou.mybatisplus.mapper.Condition;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Optional;

/**
 * Service class for managing users.
 *
 * @author somewhere
 */
@Service
public class UserService extends DataVoService<UserRepository, User, String, UserVo> {


    @Resource
    private OrgRepository orgRepository;

    @Override
    public UserVo copyBeanToVo(User user) {
        UserVo userResult = new UserVo();
        super.copyBeanToVo(user, userResult);
        userResult.setRoleNames(user.getRoleNames());
        if (user.getOrg() != null) {
            userResult.setOrgName(user.getOrg().getName());
        }
        return userResult;
    }

    @Override
    public void copyVoToBean(UserVo userVo, User user) {
        super.copyVoToBean(userVo, user);
        user.setRoleIdList(userVo.getRoleIdList());
    }

    @Transactional(readOnly = true, rollbackFor = Exception.class)
    @Override
    public UserVo findOneVo(String id) {
        User user = findOne(id);
        if(user!=null){
            user.setOrg(orgRepository.selectById(user.getOrgId()));
        }
        return copyBeanToVo(user);
    }

    @Override
    public void save(UserVo userVo) {
        User user = PublicUtil.isNotEmpty(userVo.getId()) ? repository.selectById(userVo.getId()) : new User();
        copyVoToBean(userVo, user);
        if (user.getLangKey() == null) {
            // default language
            user.setLangKey("zh-cn");
        } else {
            user.setLangKey(user.getLangKey());
        }
        user.setResetKey(RandomUtil.generateResetKey());
        user.setResetDate(PublicUtil.getCurrentDate());
        user.setActivated(true);
        insertOrUpdate(user);
        if (PublicUtil.isNotEmpty(user.getRoleIdList())) {
            repository.deleteUserRoles(user.getId());
            repository.addUserRoles(user);
        }
        log.debug("Save Information for User: {}", user);

    }

    @Transactional(readOnly = true, rollbackFor = Exception.class)
    public Optional<UserVo> getUserWithAuthoritiesByLogin(String login) {
        return Optional.of(copyBeanToVo(repository.selectUserByLoginId(login)));
    }

    @Transactional(readOnly = true, rollbackFor = Exception.class)
    public UserVo getUserWithAuthorities(String id) {
        User user = repository.selectById(id);
        return copyBeanToVo(user);
    }

    @Transactional(readOnly = true, rollbackFor = Exception.class)
    public UserVo findVo(String id) {
        User user = repository.selectById(id);
        return copyBeanToVo(user);
    }


    @Transactional(readOnly = true, rollbackFor = Exception.class)
    public PageModel<User> findPage(PageModel<User> pm, List<QueryCondition> andQueryConditions, List<QueryCondition> orQueryConditions) {
        //拼接查询动态对象
        SpecificationDetail<User> spec = DynamicSpecifications.bySearchQueryCondition(
                andQueryConditions,
                QueryCondition.ne(User.F_STATUS, User.FLAG_DELETE),
                QueryCondition.ne(User.F_ID, "1"));
        spec.orAll(orQueryConditions);
        //动态生成sql分页查询
//        Page<User> page = repository.findAll(spec, pm);
//        pm.setPageInstance(page);
//        pm.getData().forEach(item -> item.setOrg(orgRepository.findBasicOne(item.getOrgId())));
        //自定义sql分页查询
        findPage(pm, spec);


        return pm;
    }

    @Transactional(readOnly = true, rollbackFor = Exception.class)
    @Override
    public PageModel<User> findPage(PageModel<User> pm, List<QueryCondition> authQueryConditions) {
        //拼接查询动态对象
        SpecificationDetail<User> spec = DynamicSpecifications.
                buildSpecification(pm.getQueryConditionJson(),
                        QueryCondition.ne(User.F_STATUS, User.FLAG_DELETE),
                        QueryCondition.ne(User.F_ID,  "1"));
        spec.setPersistentClass(getPersistentClass()).orAll(authQueryConditions);
        //动态生成sql分页查询
//        Page<User> page = repository.findAll(spec, pm);
//        pm.setPageInstance(page);
//        pm.getData().forEach(item -> item.setOrg(orgRepository.findBasicOne(item.getOrgId())));
        //自定义sql分页查询
        findPage(pm, spec);


        return pm;
    }

    public void changePassword(String loginId, String newPassword) {
        Optional.of(selectOne(Condition.create().eq(User.F_LOGINID, loginId))).ifPresent(
            user -> {
                user.setPassword(newPassword);
                repository.updateById(user);
                log.debug("Changed password for User: {}", user);
            }
        );
    }

    public Optional<User> findOneByLoginId(String loginId) {
        return Optional.of(repository.selectUserByLoginId(loginId));
    }
}
