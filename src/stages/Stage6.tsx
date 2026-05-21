import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

export default function Stage6() {
  const [step, setStep] = useState(-1)

  const steps = [
    { label: '用户提问', desc: '用户发出请求："5月20日天气怎么样？"' },
    { label: 'LLM 识别意图', desc: 'LLM 判断：这需要查天气，但我没有实时数据 → 发出 Function Call' },
    { label: 'Agent 调度工具', desc: 'Agent 接收 function call 请求，通过 MCP 协议调度 Weather API' },
    { label: '工具返回数据', desc: 'Weather API 返回结构化天气数据' },
    { label: 'LLM 组织语言', desc: 'LLM 收到天气数据，将其转化为自然语言回答' },
    { label: '返回用户', desc: '用户收到准确答案："5月20日：晴天，22°C"' },
  ]

  const advance = () => setStep(s => Math.min(s + 1, steps.length - 1))

  return (
    <SectionWrapper id="stage-6">
      <div style={{ marginBottom: 32 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-primary)',
          letterSpacing: 3, textTransform: 'uppercase', padding: '4px 14px',
          border: '1px solid var(--border-active)', borderRadius: 20,
        }}>阶段 6</span>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 4vw, 34px)',
          fontWeight: 700, marginTop: 20, marginBottom: 12,
        }}>
          Function Calling + 工具协议
        </h2>
        <p style={{ fontSize: 18, color: 'var(--accent-gold)', fontWeight: 500, marginBottom: 8 }}>
          难度 ⭐⭐⭐⭐
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 660 }}>
          突破 LLM 知识边界的关键方案：让模型可以调用外部工具。
          <strong style={{ color: 'var(--accent-primary)' }}>Function Calling</strong> 是 LLM 与工具之间的标准接口协议，
          <strong style={{ color: 'var(--accent-secondary)' }}>MCP</strong>（Model Context Protocol）等工具通信协议让 Agent 能够标准化地调度各种外部 API。
          此外还有 <strong style={{ color: 'var(--accent-gold)' }}>RAG</strong>（检索增强生成）和网络搜索等手段补充实时知识。
        </p>
      </div>

      {/* Architecture flow */}
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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <button
            onClick={advance}
            disabled={step >= steps.length - 1}
            style={{
              padding: '10px 28px', fontSize: 14, fontFamily: 'var(--font-sans)', fontWeight: 600,
              background: step >= steps.length - 1 ? 'var(--bg-deep)' : 'var(--accent-primary)',
              border: 'none', borderRadius: 8,
              color: step >= steps.length - 1 ? 'var(--text-muted)' : 'var(--bg-deep)',
              cursor: step >= steps.length - 1 ? 'default' : 'pointer',
            }}
          >
            {step < 0 ? '点击开始演示 →' : step >= steps.length - 1 ? '演示完成' : '下一步 →'}
          </button>
          {step >= 0 && (
            <button
              onClick={() => setStep(-1)}
              style={{
                marginLeft: 10, padding: '10px 16px', fontSize: 13, fontFamily: 'var(--font-sans)',
                background: 'transparent', border: '1px solid var(--border-subtle)',
                borderRadius: 8, color: 'var(--text-secondary)', cursor: 'pointer',
              }}
            >
              重置
            </button>
          )}
        </div>

        {/* Architecture diagram */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
          position: 'relative',
        }}>
          {/* Row: User */}
          <NodeBox
            label="用户"
            content="「5月20日天气怎么样？」"
            color="var(--accent-gold)"
            active={step >= 0}
            highlight={step === 0}
          />

          <Connector active={step >= 1} label="Prompt" />

          {/* Row: LLM */}
          <NodeBox
            label="LLM 核心推理"
            content="识别意图 → 发出 Function Call"
            color="var(--accent-primary)"
            active={step >= 1}
            highlight={step === 1}
          />

          <Connector active={step >= 2} label="Function Calling（标准接口协议）" direction="down" />

          {/* Row: Agent + Tool side by side */}
          <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Connector active={step >= 2} label="" compact />
              <NodeBox
                label="基础 Agent"
                content="工具调度 / 中间代理层"
                color="var(--accent-secondary)"
                active={step >= 2}
                highlight={step === 2}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Connector active={step >= 3} label="MCP（工具通信协议）" direction="right" />
              <NodeBox
                label="Weather API"
                content="返回结构化天气数据"
                color="#ff7043"
                active={step >= 3}
                highlight={step === 3}
              />
            </div>
          </div>

          <Connector active={step >= 4} label="结构化结果返回" direction="up" />

          {/* Row: LLM again */}
          <NodeBox
            label="LLM 核心推理"
            content="将天气数据组织为自然语言"
            color="var(--accent-primary)"
            active={step >= 4}
            highlight={step === 4}
          />

          <Connector active={step >= 5} label="最终回答" />

          {/* Row: Result */}
          <AnimatePresence>
            {step >= 5 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NodeBox
                  label="输出结果"
                  content="「5月20日：晴天，22°C」"
                  color="var(--accent-gold)"
                  active={true}
                  highlight={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Current step description */}
        <AnimatePresence mode="wait">
          {step >= 0 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              style={{
                marginTop: 24, padding: '12px 20px',
                background: 'rgba(100, 255, 218, 0.05)',
                borderRadius: 8, border: '1px solid var(--border-subtle)',
                textAlign: 'center',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-primary)',
                marginRight: 8,
              }}>
                步骤 {step + 1}/{steps.length}
              </span>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                {steps[step]?.desc}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Supplement info */}
        <motion.div
          style={{
            marginTop: 24, padding: '16px 20px',
            background: 'rgba(255, 183, 77, 0.04)',
            borderRadius: 10, border: '1px solid rgba(255, 183, 77, 0.15)',
            display: 'flex', gap: 20, flexWrap: 'wrap',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <TagItem label="RAG" desc="检索增强生成：从知识库检索相关资料再回答" />
          <TagItem label="Web Search" desc="网络搜索：实时抓取互联网信息补充知识" />
          <TagItem label="MCP" desc="Model Context Protocol：标准化的工具通信协议" />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}

function NodeBox({
  label, content, color, active, highlight,
}: {
  label: string; content: string; color: string; active: boolean; highlight: boolean;
}) {
  return (
    <motion.div
      style={{
        padding: '14px 22px',
        background: active ? 'var(--bg-elevated)' : 'var(--bg-deep)',
        border: `2px solid ${highlight ? color : active ? 'var(--border-active)' : 'var(--border-subtle)'}`,
        borderRadius: 12,
        textAlign: 'center',
        minWidth: 200,
        opacity: active ? 1 : 0.25,
        transition: 'all 0.5s ease',
        boxShadow: highlight ? `0 0 24px ${color}33` : 'none',
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
        fontFamily: 'var(--font-sans)', fontSize: 13,
        color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.5,
      }}>
        {content}
      </div>
    </motion.div>
  )
}

function Connector({
  active, label, direction, compact,
}: {
  active: boolean; label: string; direction?: 'down' | 'up' | 'right'; compact?: boolean;
}) {
  const h = compact ? 16 : 32
  const isHorizontal = direction === 'right'

  return (
    <div style={{
      display: 'flex',
      flexDirection: isHorizontal ? 'row' : 'column',
      alignItems: 'center',
      height: isHorizontal ? 'auto' : h,
      width: isHorizontal ? 60 : 'auto',
      opacity: active ? 1 : 0.15,
      transition: 'opacity 0.5s',
    }}>
      <div style={{
        width: isHorizontal ? h : 2,
        height: isHorizontal ? 2 : h,
        background: active
          ? 'linear-gradient(to bottom, var(--accent-primary), var(--accent-gold))'
          : 'var(--text-muted)',
      }} />
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
          padding: '4px 8px', whiteSpace: 'nowrap',
        }}>
          {label}
        </span>
      )}
    </div>
  )
}

function TagItem({ label, desc }: { label: string; desc: string }) {
  return (
    <div>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-gold)',
        fontWeight: 600, marginRight: 6,
      }}>
        {label}
      </span>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</span>
    </div>
  )
}
