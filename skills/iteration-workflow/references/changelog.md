# CHANGELOG 格式规范

## 锚点标记

CHANGELOG.md 使用 HTML 注释锚点定位插入位置，脚本通过锚点自动追加：

```markdown
<!-- VERSION_TABLE_START -->
| 版本 | 日期 | 大小 | 行数 | 核心变更 |
|------|------|------|------|---------|
| v7 | 2026-05-22 | 153K | 1801 | 模型卡片视觉升级 + 文本优化 |
<!-- VERSION_TABLE_END -->

<!-- VERSION_DETAILS_START -->
## v7 - 卡片视觉升级
...
<!-- VERSION_DETAILS_END -->

<!-- MODULE_TABLE_START -->
...
<!-- MODULE_TABLE_END -->
```

## 每个版本的记录结构

```markdown
## v7 - 变更标题

| 属性 | 值 |
|------|-----|
| 日期 | 2026-05-22 |
| 备份文件 | index-v7.html（153K，1801 行） |
| Commit | `a56e1ce` |

### 新增
- 条目 A
- 条目 B

### 修改
- 条目 C

### 修复
- 条目 D
```

## 脚本参数

```bash
bash update-changelog.sh <版本号> <标题> [新增] [修改] [修复]
```

- 版本号：必填，如 `v8`
- 标题：必填，一句话概述
- 新增/修改/修复：可选，多条用分号 `;` 分隔

## 去重

脚本自动检查版本号是否已存在，重复则跳过。
