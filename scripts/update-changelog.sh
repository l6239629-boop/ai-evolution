#!/bin/bash
set -euo pipefail

VERSION="$1"
TITLE="${2:-}"
ADDITIONS="${3:-}"
MODIFICATIONS="${4:-}"
FIXES="${5:-}"
CHANGELOG="CHANGELOG.md"
BACKUP="index-${VERSION}.html"
TODAY=$(date +%Y-%m-%d)

if [ -z "$VERSION" ] || [ -z "$TITLE" ]; then
  echo "用法: $0 <版本号> <标题> [新增] [修改] [修复]"
  exit 1
fi

if [ -f "$CHANGELOG" ] && grep -q "^## $VERSION " "$CHANGELOG"; then
  echo "错误: $VERSION 已存在, 跳过"
  exit 1
fi

if [ -f "$BACKUP" ]; then
  FS=$(du -h "$BACKUP" | cut -f1)
  FL=$(wc -l < "$BACKUP" | tr -d ' ')
  FI="${BACKUP} (${FS}, ${FL}行)"
else
  FS="-"; FL="-"; FI="${BACKUP} (未找到)"
fi

CH=$(git log -1 --format='%h' 2>/dev/null || echo "无")

fmt() {
  if [ -z "$1" ]; then echo "(无)"; return; fi
  echo "$1" | tr ';' '\n' | sed 's/^ *//;s/ *$//' | grep -v '^$' | sed 's/^/- /'
}

AM=$(fmt "$ADDITIONS")
MM=$(fmt "$MODIFICATIONS")
FM=$(fmt "$FIXES")
SD=$(echo "$TITLE" | cut -c1-40)
OR="| $VERSION | $TODAY | $FS | $FL | $SD |"

TD=0; DD=0
while IFS= read -r line; do
  echo "$line"
  if [ "$TD" = "0" ] && echo "$line" | grep -q "VERSION_TABLE_START"; then
    echo "$OR"; TD=1
  fi
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
done < "$CHANGELOG" > "${CHANGELOG}.tmp"

mv "${CHANGELOG}.tmp" "$CHANGELOG"
echo "Done: $VERSION - $TITLE"
