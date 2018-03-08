package com.albedo.java.modules.sys.domain;

import com.albedo.java.common.persistence.domain.IdEntity;
import com.albedo.java.util.annotation.SearchField;
import com.albedo.java.util.domain.Globals;
import com.alibaba.fastjson.annotation.JSONField;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Date;
import java.util.List;

/**
 * A user.
 */
@TableName("sys_user_t")
@Data
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class User extends IdEntity<Area> {

    /*** F_LOGINID */
    public static final String F_LOGINID = "loginId";
    /*** F_LOGINID */
    public static final String F_EMAIL = "email";
    private static final long serialVersionUID = 1L;
    @NotBlank
    @Pattern(regexp = Globals.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    @TableField("login_id")
    @SearchField
    private String loginId;

    @JSONField(serialize = false)
    @NotBlank
    @Size(min = 60, max = 60)
    @TableField("password_hash")
    private String password;

    @Size(max = 32)
    @TableField("org_id")
    private String orgId;

    @ApiModelProperty(hidden = true)
    @TableField("org.id")
    private Org org;

    @Size(max = 50)
    @TableField("name_")
    private String name;
    @Size(max = 50)
    @TableField("phone_")
    private String phone;

    @Email
    @Size(max = 100)
    @TableField("email_")
    private String email;

    @NotNull
    @TableField("activated_")
    private boolean activated = false;

    @Size(min = 2, max = 5)
    @TableField("lang_key")
    private String langKey;

    @Size(max = 20)
    @TableField("activation_key")
    @JSONField(serialize = false)
    private String activationKey;

    @Size(max = 20)
    @TableField("reset_key")
    private String resetKey;

    @TableField("reset_date")
    private Date resetDate = null;

    @TableField(exist = false)
    @ApiModelProperty(hidden = true)
    private String roleNames;
    @TableField(exist = false)
    private List<String> roleIdList;

    public User(String id) {
        this.id = id;
    }

    /**
     * 用户拥有的角色名称字符串, 多个角色名称用','分隔.
     */
    public String getRoleNames() {
        return roleNames;
    }

    public void setRoleNames(String roleNames) {
        this.roleNames = roleNames;
    }

    public String getLoginId() {
        return loginId;
    }

    //Lowercase the login before saving it in database
    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean getActivated() {
        return activated;
    }

    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    public String getActivationKey() {
        return activationKey;
    }

    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    public String getResetKey() {
        return resetKey;
    }

    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getResetDate() {
        return resetDate;
    }

    public void setResetDate(Date resetDate) {
        this.resetDate = resetDate;
    }

    public String getLangKey() {
        return langKey;
    }

    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }




    public Org getOrg() {
        return org;
    }

    public void setOrg(Org org) {
        this.org = org;
    }

    public List<String> getRoleIdList() {
        return roleIdList;
    }

    public void setRoleIdList(List<String> roleIdList) {
        this.roleIdList = roleIdList;
    }

}
