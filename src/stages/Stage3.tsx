import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

const PRESET_PROMPTS = [
  { q: '你是谁？', a: '我是一个 AI 模型，由深度神经网络训练而成。' },
  { q: '1 + 1 等于几？', a: '1 + 1 = 2' },
  { q: '用一句话介绍人工智能', a: '人工智能是让机器模拟人类智能行为的计算机科学分支。' },
]

export default function Stage3() {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(0)
  const prompt = PRESET_PROMPTS[selected]

  const advance = () => setStep((s) => Math.min(s + 1, 4))
  const reset = () => setStep(0)

  return (
    <SectionWrapper id="stage-3">
      <div style={{ marginBottom: 32 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-primary)',
          letterSpacing: 3, textTransform: 'uppercase', padding: '4px 14px',
          border: '1px solid var(--border-active)', borderRadius: 20,
        }}>阶段 3</span>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 4vw, 34px)',
          fontWeight: 700, marginTop: 20, marginBottom: 12,
        }}>
          单次对话
        </h2>
        <p style={{ fontSize: 18, color: 'var(--accent-gold)', fontWeight: 500, marginBottom: 8 }}>
          难度 ⭐
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 600 }}>
          LLM 被包装成对话接口。用户输入 Prompt（提示词），经过 Tokenizer 编码为 token，
          模型推理预测后，再由 Tokenizer 解码回自然语言返回给用户。
        </p>
      </div>

      {/* Interactive flow */}
      <motion.div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 16,
          border: '1px solid var(--border-subtle)',
          padding: 32,
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Prompt selector */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>
            选择一个问题，然后点击「逐步演示」：
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {PRESET_PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => { setSelected(i); reset() }}
                style={{
                  padding: '8px 16px',
                  fontSize: 13,
                  fontFamily: 'var(--font-sans)',
                  background: selected === i ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                  border: `1px solid ${selected === i ? 'var(--border-active)' : 'var(--border-subtle)'}`,
                  borderRadius: 8,
                  color: selected === i ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                "{p.q}"
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={advance}
              disabled={step >= 4}
              style={{
                padding: '8px 20px', fontSize: 13, fontFamily: 'var(--font-sans)',
                background: step >= 4 ? 'var(--bg-deep)' : 'var(--accent-primary)',
                border: 'none', borderRadius: 8,
                color: step >= 4 ? 'var(--text-muted)' : 'var(--bg-deep)',
                cursor: step >= 4 ? 'default' : 'pointer', fontWeight: 600,
              }}
            >
              逐步演示 →
            </button>
            <button
              onClick={reset}
              style={{
                padding: '8px 16px', fontSize: 13, fontFamily: 'var(--font-sans)',
                background: 'transparent', border: '1px solid var(--border-subtle)',
                borderRadius: 8, color: 'var(--text-secondary)', cursor: 'pointer',
              }}
            >
              重置
            </button>
          </div>
        </div>

        {/* Flow diagram */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: 16, position: 'relative',
        }}>
          {/* Step 1: User */}
          <FlowBox
            label="用户"
            content={`"${prompt.q}"`}
            subtitle="Prompt 输入"
            active={step >= 0}
            highlight={step === 0}
            color="var(--accent-gold)"
          />

          {/* Arrow 1 */}
          <FlowArrow active={step >= 1} />

          {/* Step 2: Tokenizer */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <FlowBox
              label="Tokenizer"
              content="编码"
              subtitle="Prompt → Token"
              active={step >= 1}
              highlight={step === 1}
              color="var(--accent-secondary)"
            />
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: 8 }}
              >
                <FlowArrow active={true} direction="up" />
              </motion.div>
            )}
            {step >= 3 && (
              <FlowBox
                label="Tokenizer"
                content="解码"
                subtitle="Token → 文本"
                active={step >= 3}
                highlight={step === 3}
                color="var(--accent-secondary)"
                style={{ marginTop: 0 }}
              />
            )}
          </div>

          {/* Arrow 2 */}
          <FlowArrow active={step >= 2} />

          {/* Step 3: LLM */}
          <FlowBox
            label="LLM 模型"
            content="推理预测"
            subtitle="核心计算"
            active={step >= 2}
            highlight={step === 2}
            color="var(--accent-primary)"
            large
          />

          {/* Arrow 3 */}
          <FlowArrow active={step >= 3} />

          {/* Step 4: Output */}
          <AnimatePresence>
            {step >= 4 && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FlowBox
                  label="输出结果"
                  content={`"${prompt.a}"`}
                  subtitle="最终回答"
                  active={true}
                  highlight={true}
                  color="var(--accent-gold)"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

function FlowBox({
  label, content, subtitle, active, highlight, color, large, style,
}: {
  label: string; content: string; subtitle: string;
  active: boolean; highlight: boolean; color: string;
  large?: boolean; style?: React.CSSProperties;
}) {
  return (
    <motion.div
      style={{
        padding: large ? '20px 24px' : '14px 18px',
        background: active ? 'var(--bg-elevated)' : 'var(--bg-deep)',
        border: `2px solid ${highlight ? color : active ? 'var(--border-active)' : 'var(--border-subtle)'}`,
        borderRadius: 12,
        textAlign: 'center',
        minWidth: large ? 140 : 110,
        boxShadow: highlight ? `0 0 20px ${color}33` : 'none',
        opacity: active ? 1 : 0.3,
        transition: 'all 0.4s ease',
        ...style,
      }}
      animate={highlight ? { scale: [1, 1.03, 1] } : {}}
      transition={{ duration: 1.5, repeat: highlight ? Infinity : 0 }}
    >
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 10, color,
        letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: large ? 15 : 13,
        color: 'var(--text-primary)', fontWeight: 600, marginBottom: 2,
      }}>
        {content}
      </div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{subtitle}</div>
    </motion.div>
  )
}

function FlowArrow({ active, direction }: { active: boolean; direction?: 'up' }) {
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'center',
        opacity: active ? 1 : 0.2,
        transition: 'opacity 0.4s',
        transform: direction === 'up' ? 'rotate(-90deg)' : 'none',
      }}
    >
      <div style={{
        width: 40, height: 2,
        background: active ? 'linear-gradient(90deg, var(--accent-primary), var(--accent-gold))' : 'var(--text-muted)',
      }} />
      <motion.div
        style={{
          width: 0, height: 0,
          borderTop: '6px solid transparent',
          borderBottom: '6px solid transparent',
          borderLeft: `8px solid ${active ? 'var(--accent-gold)' : 'var(--text-muted)'}`,
        }}
      />
    </motion.div>
  )
}
