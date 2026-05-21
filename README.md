# AI 模型演进原理 · 交互式网站

从「预测下一个字符」到「自主调度技能系统」——一场关于 AI 如何变聪明的技术旅程。

## 项目简介

将 AI 模型的 8 个迭代发展阶段转化为一个叙事驱动的交互式网页。用户通过滚动或点击，沿着 AI 模型的演进路径逐一探索每个阶段的核心原理，直观理解从 LM 语言模型到 Skill 技能系统的完整技术跃迁脉络。

## 内容结构

| 阶段 | 主题 | 核心概念 | 交互演示 |
|------|------|----------|----------|
| 0 | 开场引言 | 为什么要了解 AI 演进 | - |
| 1 | LM 语言模型 | 根据上文预测下一个 token | 字符概率分布实时演示 |
| 2 | LLM 大语言模型 | GPT-4、DeepSeek-R1、Tokenizer | Token 切分可视化 |
| 3 | 单次对话 | Prompt → Tokenizer → LLM → 输出 | 逐步推演流程图 |
| 4 | 多次对话 | Context Window 上下文窗口 | 对话历史叠加 + 窗口用量 |
| 5 | 对话转向任务 | LLM 局限：无法获取实时数据 | 幻觉问题演示 |
| 6 | Function Calling + MCP | LLM → Agent → Tool 三段架构 | 6 步架构动图推演 |
| 7 | Agent + Workflow | 子 Agent + 固定工作流编排 | 多步骤 Pipeline 演示 |
| 8 | Skill 技能系统 | 自主匹配 Skill，多样化输出 | 表格/卡片/图表切换对比 |
| - | 结语 | 三条主线：理解 → 行动 → 规划 | - |

## 快速开始

### 方式一：直接打开（零依赖）

双击 `index.html` 在浏览器中打开即可。React 和 Framer Motion 通过 CDN 加载，无需安装任何依赖。

### 方式二：开发模式

```bash
npm install
npm run dev
```

## 技术栈

- **React 18** + **TypeScript** — UI 框架
- **Vite** — 构建工具
- **Framer Motion** — 动画引擎
- 深色科技风视觉设计（深蓝/靛蓝 + 金色/暖黄高亮）

## 浏览器支持

Chrome、Firefox、Safari、Edge 最新版本均支持。

## 许可

MIT
