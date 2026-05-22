# 交互设计模式

## 模式 1：渐进式披露

**用途**：分步展示复杂流程，每步揭露一个新节点。

**核心实现**：
```jsx
const [step, setStep] = useState(-1);
const steps = [
  { label: '步骤 1', desc: '描述' },
  { label: '步骤 2', desc: '描述' },
];

// 渲染：条件显示当前步骤及之前的所有步骤
{steps.map((s, i) => (
  <AnimatePresence key={i}>
    {step >= i && (
      <motion.div initial={{opacity:0,y:-15}} animate={{opacity:1,y:0}}>
        <WfStep .../>
      </motion.div>
    )}
  </AnimatePresence>
))}

// 控制按钮
<button onClick={() => setStep(s => Math.min(s+1, steps.length-1))}>
  {step < 0 ? '开始演示' : step >= steps.length-1 ? '完成' : '下一步'}
</button>
```

**关键细节**：
- 初始 `step = -1`（未开始）
- 每步用 `AnimatePresence` 包裹，确保进出场动效
- 连接线用 `Connector6` 在步骤间串联

---

## 模式 2：SVG 架构图示

**四种范式**：

### 水平管道
场景：顺序流程（预训练 → RLHF → 输出）

```
[方块A] ──◆──→ [方块B] ──◆──→ [方块C]
      ● flowing particles →
```

实现：`motion.circle` 沿 x 轴 animate `cx`，`transition repeat:Infinity`。

### 旋转循环
场景：迭代优化（思考→检查→修正）

```
   ┌── [中心方块] ──┐
   │    ↻ 旋转光圈   │
   └────────────────┘
```

实现：SVG `<circle>` + `<animateTransform rotate>` 原生动画。

### Y 型汇入
场景：多路输入融合（图像 + 文字 → 理解）

```
[输入A] → [编码A] ┐
                  ├→ [LLM 融合] → [输出]
[输入B] → [编码B] ┘
```

实现：`motion.path` 画汇入线 + `<animate>` 波纹扩散。

### 扇出路由
场景：动态分配（Token → 路由 → 各专家）

```
         ┌→ [专家1] ─┐
[Token]→[路由]→ [专家2] →[聚合]→[输出]
         └→ [专家3] ─┘
```

实现：连线用 `<animate>` 轮流高亮（`values="0.6;1;0.6"` + `begin` 错峰）。

**统一规范**：
- viewBox `0 0 280 130`
- 分隔线 `y=100`，下方放说明文字
- 主题色 15% 透明度边框

---

## 模式 3：交互 Demo

**用途**：让用户输入内容，实时看到模型输出。

**核心模式**：
```jsx
const [input, setInput] = useState('默认值');
const [result, setResult] = useState(compute(input));

<input value={input} onChange={e => { setInput(e.target.value); setResult(compute(e.target.value)); }} />

<div>{result}</div>  // 实时响应
```

**常见变体**：
- Tokenizer Demo：输入文字 → 显示 Token 切分结果
- 字符预测 Demo：输入文字 → 显示下一个字符概率分布柱状图
- 格式切换 Demo：同一数据 → Tab 切换多种展示形态

---

## 模式 4：对比切换

**用途**：同一份数据，切换不同展示模式。

**核心实现**：
```jsx
const [mode, setMode] = useState('table');
const modes = { table: <TableView/>, card: <CardView/>, chart: <ChartView/> };

// Tab 按钮组
{Object.keys(modes).map(key => (
  <button onClick={() => setMode(key)} className={mode === key ? 'active' : ''}>
    {key}
  </button>
))}

// 切换区域
<AnimatePresence mode="wait">
  <motion.div key={mode} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    {modes[mode]}
  </motion.div>
</AnimatePresence>
```

**关键**：`AnimatePresence mode="wait"` 确保上一个内容完全退出后再进入新内容。

---

## 模式 5：滚动叙事

**用途**：利用滚动驱动内容逐渐揭示，营造叙事节奏。

**核心配置**：
```jsx
<motion.div
  initial={{opacity:0,y:40}}
  whileInView={{opacity:1,y:0}}
  viewport={{once:true,margin:'-80px'}}
  transition={{duration:0.7}}
>
```

**子元素 stagger**：
```jsx
{items.map((item, i) => (
  <motion.div
    initial={{opacity:0,y:30}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    transition={{duration:0.5,delay:i*0.15}}  // 错峰进场
  />
))}
```
