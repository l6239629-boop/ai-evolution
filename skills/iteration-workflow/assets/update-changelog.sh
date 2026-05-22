#!/bin/bash
# 通用 CHANGELOG 自动更新脚本
# 用法: bash update-changelog.sh <版本号> <标题> [新增] [修改] [修复]
set -euo pipefail

VERSION="$1"; TITLE="${2:-}"; ADDITIONS="${3:-}"; MODIFICATIONS="${4:-}"; FIXES="${5:-}"
CHANGELOG="${CHANGELOG_FILE:-CHANGELOG.md}"
BACKUP="${BACKUP_PREFIX:-index-}${VERSION}.html"
TODAY=$(date +%Y-%m-%d)

if [ -z "$VERSION" ] || [ -z "$TITLE" ]; then
  echo "用法: $0 <版本号> <标题> [新增] [修改] [修复]"
  echo "示例: $0 v7 \"卡片升级\" \"卡片A;卡片B\" \"边框优化\" \"空\""
  exit 1
fi

if [ -f "$CHANGELOG" ] && grep -q "^## $VERSION " "$CHANGELOG"; then
  echo "错误: $VERSION 已存在, 跳过"; exit 1
fi

if [ -f "$BACKUP" ]; then
  FS=$(du -h "$BACKUP" | cut -f1); FL=$(wc -l < "$BACKUP" | tr -d ' ')
  FI="${BACKUP} (${FS}, ${FL}行)"
else
  FS="-"; FL="-"; FI="${BACKUP} (未找到)"
fi

CH=$(git log -1 --format='%h' 2>/dev/null || echo "无")
fmt() { [ -z "$1" ] && echo "(无)" || echo "$1" | tr ';' '\n' | sed 's/^ *//;s/ *$//' | grep -v '^$' | sed 's/^/- /'; }

AM=$(fmt "$ADDITIONS"); MM=$(fmt "$MODIFICATIONS"); FM=$(fmt "$FIXES")
SD=$(echo "$TITLE" | cut -c1-40); OR="| $VERSION | $TODAY | $FS | $FL | $SD |"

TD=0; DD=0; TMP="${CHANGELOG}.tmp"
while IFS= read -r line; do
  echo "$line"
  [ "$TD" = "0" ] && echo "$line" | grep -q "VERSION_TABLE_START" && { echo "$OR"; TD=1; }
  if [ "$DD" = "0" ] && echo "$line" | grep -q "VERSION_DETAILS_START"; then
    cat << BLOCK

## $VERSION - $TITLE

| 属性 | 值 |
|------|-----|
| 日期 | $TODAY |
| 备份文件 | $FI |
| Commit | \`$CH\` |

### 新增
$AM

### 修改
$MM

### 修复
$FM

BLOCK
    DD=1
  fi
done < "$CHANGELOG" > "$TMP"
mv "$TMP" "$CHANGELOG"
echo "Done: $VERSION - $TITLE"
