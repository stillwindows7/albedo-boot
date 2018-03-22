package com.albedo.java.common.persistence.domain;

import com.albedo.java.common.persistence.pk.IdGen;
import com.albedo.java.util.annotation.SearchField;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@MappedSuperclass
public class IdEntity<PK extends Serializable> extends DataEntity {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "id_")
    @SearchField
    protected PK id; // 编号

    public IdEntity() {
        super();
    }

    @PrePersist
    public void prePersist() {
        if (this.id != TreeEntity.ROOT) {
            this.id = (PK) IdGen.uuid();
        }
    }

    public PK getId() {
        return id;
    }

    public void setId(PK id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        IdEntity idEntity = (IdEntity) o;
        if (idEntity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), idEntity.getId());
    }
    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }
}
