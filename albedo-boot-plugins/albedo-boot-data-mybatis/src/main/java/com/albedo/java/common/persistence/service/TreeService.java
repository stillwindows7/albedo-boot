package com.albedo.java.common.persistence.service;

import com.albedo.java.common.persistence.domain.BaseEntity;
import com.albedo.java.common.persistence.domain.TreeEntity;
import com.albedo.java.common.persistence.repository.TreeRepository;
import com.albedo.java.util.PublicUtil;
import com.albedo.java.util.base.Assert;
import com.albedo.java.util.exception.RuntimeMsgException;
import com.albedo.java.vo.sys.query.TreeQuery;
import com.albedo.java.vo.sys.query.TreeResult;
import com.baomidou.mybatisplus.mapper.Condition;
import com.google.common.collect.Lists;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;


@Transactional
public abstract class TreeService<Repository extends TreeRepository<T, PK>, T extends TreeEntity, PK extends Serializable>
        extends DataService<Repository, T, PK> {
    public Integer countByParentId(String parentId){
       return repository.selectCount(
           Condition.create().eq(TreeEntity.F_PARENTID, parentId)
       );
    }

    public Integer countByParentIdAndStatusNot(String parentId, String status){
        return repository.selectCount(
            Condition.create().eq(TreeEntity.F_PARENTID, parentId).ne(TreeEntity.F_STATUS, status)
        );

    }

    public List<T> findAllByParentIdsLike(String parentIds){
        return repository.selectList(
            Condition.create().like(TreeEntity.F_PARENTIDS, parentIds));
    }

    public List<T> findAllByParentIdAndStatusNot(String parentId, String status){
        return repository.selectList(Condition.create().eq(TreeEntity.F_PARENTID, parentId).ne(TreeEntity.F_STATUS, status));

    }

    public List<T> findAllByStatusNot(String status){
        return repository.selectList(Condition.create().ne(TreeEntity.F_STATUS, status));

    }

    public List<T> findTop1ByParentIdAndStatusNotOrderBySortDesc(String parentId, String status){

        return repository.selectList(
            Condition.create().eq(TreeEntity.F_PARENTID, parentId).ne(TreeEntity.F_STATUS, status)
        );

    }

    public List<T> findAllByIdOrParentIdsLike(PK id, String likeParentIds){
        return repository.selectList(
            Condition.create().eq(TreeEntity.F_PARENTIDS, likeParentIds).or().ne(TreeEntity.F_ID, id)
        );
    }
    /**
     * 逻辑删除
     *
     * @param id
     * @param likeParentIds
     * @return
     */
    public int deleteById(PK id, String likeParentIds, String lastModifiedBy) {
        Assert.assertNotNull(id, "ids 信息为空，操作失败");
        Assert.assertNotNull(likeParentIds, "likeParentIds 信息为空，操作失败");
        Assert.assertNotNull(lastModifiedBy, "lastModifiedBy 信息为空，操作失败");
        return operateStatusById(id, likeParentIds, BaseEntity.FLAG_DELETE, lastModifiedBy);
    }

    public int operateStatusById(PK id, String likeParentIds, String status, String lastModifiedBy) {
        List<T> entityList = findAllByIdOrParentIdsLike(id, PublicUtil.toAppendStr(likeParentIds, id, ",", "%"));
//        Assert.assertNotNull(entityList, "无法查询到对象信息");
        Assert.assertNotNull(id, "id 信息为空，操作失败");
        Assert.assertNotNull(likeParentIds, "likeParentIds 信息为空，操作失败");
        Assert.assertNotNull(status, "status 信息为空，操作失败");
        Assert.assertNotNull(lastModifiedBy, "lastModifiedBy 信息为空，操作失败");
        for (T entity : entityList) {
            entity.setStatus(status);
            repository.updateById(entity);
        }
        return entityList!=null ? entityList.size() : 0;
    }


    @Override
    public T save(T entity) {
        String oldParentIds = entity.getParentIds(); // 获取修改前的parentIds，用于更新子节点的parentIds
        if (entity.getParentId() != null) {
            T parent = repository.selectById(entity.getParentId());
            if (parent == null || PublicUtil.isEmpty(parent.getId())) {
                throw new RuntimeMsgException("无法获取模块的父节点，插入失败");
            }
            if (parent != null) {
                parent.setLeaf(false);
//                checkSave(parent);
                insertOrUpdate(parent);
            }
            entity.setParentIds(PublicUtil.toAppendStr(parent.getParentIds(), parent.getId(), ","));
        }

        if (PublicUtil.isNotEmpty(entity.getId())) {
            Integer count = countByParentId(entity.getId());
            entity.setLeaf(count == null || count == 0 ? true : false);
        } else {
            entity.setLeaf(true);
        }
//        checkSave(entity);
        insertOrUpdate(entity);
        // 更新子节点 parentIds
        List<T> list = findAllByParentIdsLike(PublicUtil.toAppendStr("%,", entity.getId(), ",%"));
        for (T e : list) {
            if (PublicUtil.isNotEmpty(e.getParentIds())) {
                e.setParentIds(e.getParentIds().replace(oldParentIds, entity.getParentIds()));
            }
        }
        insertOrUpdateBatch(list);
        log.debug("Save Information for T: {}", entity);
        return entity;
    }

    @Transactional(readOnly = true, rollbackFor = Exception.class)
    public List<TreeResult> findTreeData(TreeQuery query) {
        String extId = query != null ? query.getExtId() : null, all = query != null ? query.getAll() : null;
        List<TreeResult> mapList = Lists.newArrayList();
        List<T> list = findAllByStatusNot(BaseEntity.FLAG_DELETE);
        TreeResult treeResult = null;
        for (T e : list) {
            if ((PublicUtil.isEmpty(extId)
                    || PublicUtil.isEmpty(e.getParentIds()) || (PublicUtil.isNotEmpty(extId) && !extId.equals(e.getId()) && e.getParentIds() != null && e.getParentIds().indexOf("," + extId + ",") == -1))
                    && (all != null || (all == null && BaseEntity.FLAG_NORMAL.equals(e.getStatus())))) {
                treeResult = new TreeResult();
                treeResult.setId(e.getId());
                treeResult.setPid(PublicUtil.isEmpty(e.getParentId()) ? "0" : e.getParentId());
                treeResult.setLabel(e.getName());
                treeResult.setKey(e.getName());
                treeResult.setValue(e.getId());
                mapList.add(treeResult);
            }
        }
        return mapList;
    }

    @Transactional(readOnly = true, rollbackFor = Exception.class)
    public Integer countTopByParentId(String parentId) {
        return countByParentIdAndStatusNot(parentId, TreeEntity.FLAG_DELETE);
    }

    @Transactional(readOnly = true, rollbackFor = Exception.class)
    public T findTopByParentId(String parentId) {
        List<T> tempList = findTop1ByParentIdAndStatusNotOrderBySortDesc(parentId, BaseEntity.FLAG_DELETE);
        return PublicUtil.isNotEmpty(tempList) ? tempList.get(0) : null;
    }

    /**
     * 逻辑删除，更新子节点
     *
     * @param ids
     * @param lastModifiedBy
     * @return
     */
    public void deleteByParentIds(List<PK> ids,String lastModifiedBy) {
        Assert.assertNotNull(ids, "ids 信息为空，操作失败");
        Assert.assertNotNull(lastModifiedBy, "lastModifiedBy 信息为空，操作失败");
        ids.forEach(id ->deleteByParentIds(id, lastModifiedBy));
    }
    /**
     * 逻辑删除，更新子节点
     *
     * @param id
     * @param lastModifiedBy
     * @return
     */
    public void deleteByParentIds(PK id,String lastModifiedBy) {
        Assert.assertNotNull(id, "id 信息为空，操作失败");
        Assert.assertNotNull(lastModifiedBy, "lastModifiedBy 信息为空，操作失败");
        T entity = repository.selectById(id);
        operateStatusById(id, PublicUtil.toAppendStr(entity.getParentIds(), entity.getId(),","), BaseEntity.FLAG_DELETE, lastModifiedBy);
    }
    /**
     * 锁定/启用，更新子节点
     *
     * @param id
     * @param lastModifiedBy
     * @return
     */
    public void lockOrUnLockByParentIds(PK id,String lastModifiedBy) {
        Assert.assertNotNull(id, "id 信息为空，操作失败");
        Assert.assertNotNull(lastModifiedBy, "lastModifiedBy 信息为空，操作失败");
        T entity = repository.selectById(id);
        Assert.assertNotNull(entity, "对象 " + id + " 信息为空，操作失败");
        operateStatusById(id, PublicUtil.toAppendStr(entity.getParentIds(), entity.getId(),","), BaseEntity.FLAG_NORMAL.equals(entity.getStatus()) ? BaseEntity.FLAG_UNABLE : BaseEntity.FLAG_NORMAL, lastModifiedBy);
        log.debug("LockOrUnLock Entity: {}", entity);
    }
    /**
     * 锁定/启用，更新子节点
     *
     * @param ids
     * @param lastModifiedBy
     * @return
     */
    public void lockOrUnLockByParentIds(List<PK> ids,String lastModifiedBy) {
        Assert.assertNotNull(ids, "ids 信息为空，操作失败");
        Assert.assertNotNull(lastModifiedBy, "lastModifiedBy 信息为空，操作失败");
        ids.forEach(id -> lockOrUnLockByParentIds(id, lastModifiedBy));
    }
}
