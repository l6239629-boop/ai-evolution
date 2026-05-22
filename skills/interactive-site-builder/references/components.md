# 组件 API 速查

## SectionWrapper

滚动驱动的进出场动画容器。

**用途**：包裹每个阶段内容，自动在滚动进入视口时播放淡入动画。

**Props**：`id`（锚点 ID，用于导航跳转），`children`

**使用**：
```jsx
<SectionWrapper id="stage-1">
  <StageBadge num={1}/>
  <h2>标题</h2>
  <p>内容</p>
</SectionWrapper>
```

---

## StageConnector

阶段间过渡连接线。

**用途**：在两个阶段之间插入带箭头的垂直连接线 + 过渡说明标签。

**Props**：`label`（主标签），`secondary`（副标签，可选）

**使用**：
```jsx
<StageConnector label="模型体积增大 → 涌现智能" secondary="从统计预测到大规模神经网络"/>
```

**视觉效果**：金色竖线 + 流动光点 + 向下箭头 + 圆角标签卡。

---

## NavIndicator

右侧固定导航条。

**用途**：显示所有阶段圆点，当前阶段高亮，带滚动进度条。

**Props**：`activeId`，`stageIds`，`onNavigate`，`progress`

**依赖**：`useActiveStage()` Hook（自动检测当前视口阶段），`useScrollProgress()` Hook

---

## StageBadge

阶段编号胶囊。

**用途**：每个阶段标题上方的编号标签。

**Props**：`num`（数字，0 显示「阶段 0」）

---

## ChatBubble

对话气泡。

**用途**：模拟用户与 LLM 的对话展示。

**Props**：`role`（`'user'` 或 `'ai'`），`text`（对话内容），`delay`（进场延迟秒数）

**视觉效果**：用户右对齐蓝色，LLM 左对齐青色，自适应宽度。

---

## TokenPanel

Token → ID 映射横向展示。

**用途**：展示一段文本被分词后的 Token 和对应数字 ID。

**Props**：`tokens`（Token 数组），`ids`（ID 数组），`label`（面板标题），`active`（是否激活），`color`（主题色）

---

## FlowBox + Connector6 + WfStep

渐进式流程演示三件套。

**用途**：构建从上到下的分步流程演示，支持逐步披露。

**FlowBox**：流程容器
**Connector6**：步骤间向下连接线（含标签）
**WfStep**：单个步骤节点（标题 + 描述 + 激活状态）

**使用模式**：
```jsx
<FlowBox>
  <WfStep id="A" label="获取数据" color="var(--accent-primary)" active={true}/>
  <Connector6 active={true} label="MCP 协议"/>
  <WfStep id="B" label="结构化处理" color="var(--accent-secondary)" active={true}/>
</FlowBox>
```

---

## GlossaryPanel

术语词典侧边面板。

**依赖**：`GlossaryButton`（左侧固定触发按钮）

**数据格式**：
```javascript
const TERMS = [
  { term: 'LLM', en: 'Large Language Model', def: '大语言模型', stage: 'stage-2', sub: '' },
];
```

**交互**：点击术语→面板关闭→滚动到对应阶段→金色高亮呼吸 1.5 秒。

---

## ModelCard

SVG 架构图示卡片。

**用途**：展示概念模型的架构对比，含 SVG 图示 + 模型列表标签 + 一句话总结。

**SVG 范式**：
- 水平管道：流程从左到右，粒子流动画
- 旋转循环：中心方块周围光圈旋转
- Y 型汇入：两路输入汇入中心节点，波纹扩散
- 扇出路由：路由器分发到多条专家线，轮流高亮

每张卡片顶部 3px 主题色条 + icon 标题。

---

## PromptTemplate

可复制代码模板卡片。

**用途**：展示可复用的文本/Prompt 模板，带一键复制按钮。

**数据格式**：
```javascript
{ tag: '规划', template: '请你先规划...', scene: '需要先对齐方向', color: 'var(--accent-primary)' }
```

**交互**：点击「复制」→ `navigator.clipboard.writeText()` → 按钮显示「✓ 已复制」1.5 秒。
