---
name: interactive-site-builder
description: 概念驱动型交互站点构建器。将抽象概念、产品逻辑、技术流程转化为自包含 HTML 长卷轴交互网页。适用场景：技术原理科普、产品功能讲解、流程可视化、迭代产品展示。提供 10 个通用组件、5 类交互设计模式、自包含骨架模板。当用户需要构建交互式网页、概念科普站、产品演示页时使用。
---

# 交互站点构建器

将概念转化为可交互的长卷轴叙事网页。一个 HTML 文件，浏览器直接打开，零构建。

## 架构决策

### 第一步：选承载方式

| 场景 | 方案 |
|------|------|
| 纯内容展示、无需后端 | **自包含 HTML**（CDN 加载 React/Framer Motion/Babel） |
| 需要路由、状态管理 | Vite + React 工程 |

**默认选自包含 HTML**——已验证可承载 1800+ 行、15 个模块的复杂站点。

### 第二步：定页面结构

```
单页长卷轴（推荐）
├── 封面（标题 + 引导滚动）
├── 阶段 1..N（每个阶段一个 SectionWrapper）
│   ├── 内容
│   └── 交互 Demo（可选）
├── 结语
└── 附录（资源链接、Tips）
```

每个阶段之间用 `StageConnector` 串联，右侧 `NavIndicator` 导航。

### 第三步：搭骨架

复制 `assets/boilerplate.html`，含：
- CDN：React 18 + Framer Motion 11 + Babel Standalone
- CSS 变量：深色科技风主题（可替换色值）
- 基础组件：SectionWrapper / StageConnector / NavIndicator / StageBadge
- 空 App 框架

### 第四步：填内容

每个阶段一个函数组件，返回 `SectionWrapper`。阶段间插入 `StageConnector`。

### 第五步：加交互

根据内容类型选交互模式（见 `references/patterns.md`）。

## 组件选用指南

详见 `references/components.md`。快速速查：

| 需求 | 组件 |
|------|------|
| 区块容器 | `SectionWrapper` |
| 阶段过渡 | `StageConnector` |
| 侧边导航 | `NavIndicator` |
| 阶段编号 | `StageBadge` |
| 对话气泡 | `ChatBubble` |
| 数据映射 | `TokenPanel` |
| 流程演示 | `FlowBox` + `Connector6` + `WfStep` |
| 术语词典 | `GlossaryPanel` |
| 概念对比 | `ModelCard`（含 SVG 图示） |
| 代码模板 | `PromptTemplate`（含复制按钮） |

## 设计模式速查

详见 `references/patterns.md`。

| 模式 | 核心实现 |
|------|---------|
| 渐进式披露 | `useState(step)` + `AnimatePresence` |
| SVG 架构图 | 管道 / 循环 / 汇入 / 路由四种范式 |
| 交互 Demo | 输入→实时输出模式 |
| 对比切换 | Tab 切换 + `AnimatePresence mode="wait"` |
| 滚动叙事 | `whileInView` + stagger 延迟 |

## 迭代协作

开发和迭代过程遵循 `iteration-workflow` skill 的四种模式：
- 新模块：规划确认模式
- 外链调研：分步推进模式
- 优化修复：对比定位模式
- 关键节点：回退锚点模式

版本管理使用三件套：备份文件 + Git tag + CHANGELOG 自动更新。

## 配色体系

```css
--bg-deep: #0a0e1a;        /* 最深背景 */
--bg-card: #151d35;         /* 卡片背景 */
--text-primary: #e8ecf4;    /* 主文字 */
--text-secondary: #8892b0;  /* 次要文字 */
--accent-primary: #64ffda;  /* 主强调色（青） */
--accent-secondary: #4fc3f7; /* 次强调色（蓝） */
--accent-gold: #ffb74d;     /* 暖强调色（金） */
--border-subtle: rgba(100,255,218,0.08);
--font-mono: 'JetBrains Mono';
--font-sans: 'Noto Sans SC';
```

可替换色值，保持对比度体系即可。

## 注意事项

- 保持组件内容无关，内容通过 props 传入
- SVG 图示统一 viewBox 坐标系，避免绝对像素依赖
- 移动端 640px 断点，关键布局加 `@media` 回落
- 每次确认通过后执行备份
