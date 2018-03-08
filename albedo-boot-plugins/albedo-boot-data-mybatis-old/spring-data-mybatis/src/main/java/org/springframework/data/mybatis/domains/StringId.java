package org.springframework.data.mybatis.domains;

import org.springframework.data.domain.Persistable;
import org.springframework.data.mybatis.annotations.Id;

import static org.springframework.data.mybatis.annotations.Id.GenerationType.ASSIGNATION;

public class StringId implements Persistable<String> {

  @Id(strategy = ASSIGNATION)
  protected String id;

  @Override
  public String getId() {
    return id;
  }

  @Override
  public boolean isNew() {
    return null == id || id.length() == 0;
  }
}
