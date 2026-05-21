import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

export default function Stage7() {
  const [activeStep, setActiveStep] = useState(-1)

  const workflowSteps = [
    { id: 'A', label: '获取天气数据', tool: 'Weather Tool (MCP)', color: 'var(--accent-primary)' },
    { id: 'B', label: '结构化处理', tool: 'LLM / Parser', color: 'var(--accent-secondary)' },
    { id: 'C', label: '表格生成', tool: 'Formatter Tool 或 LLM', color: 'var(--accent-gold)' },
  ]

  const runAll = () => {
    setActiveStep(-1)
    workflowSteps.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), (i + 1) * 600)
    })
  }

  return (
    <SectionWrapper id="stage-7">
      <div style={{ marginBottom: 32 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-primary)',
          letterSpacing: 3, textTransform: 'uppercase', padding: '4px 14px',
          border: '1px solid var(--border-active)', borderRadius: 20,
        }}>阶段 7</span>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 4vw, 34px)',
          fontWeight: 700, marginTop: 20, marginBottom: 12,
        }}>
          Agent + Workflow 编排
        </h2>
        <p style={{ fontSize: 18, color: 'var(--accent-gold)', fontWeight: 500, marginBottom: 8 }}>
          难度 ⭐⭐⭐⭐⭐
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 660 }}>
          单次工具调用不够稳定，复杂任务需要多个步骤协同。我们在基础 Agent 中嵌入子 Agent，
          并预设好工作顺序（Workflow），让每一步都有明确的输入和输出，
          解决每次随机调用工具的问题。
        </p>
      </div>

      {/* Workflow demo */}
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
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)',
          marginBottom: 16, textAlign: 'center',
        }}>
          任务：查未来 3 天天气，并以表格形式呈现
        </p>

        {/* Top level: User → Agent → LLM */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 16, marginBottom: 24, flexWrap: 'wrap',
        }}>
          <MiniNode label="用户" color="var(--accent-gold)" />
          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>→</span>
          <MiniNode label="Agent 系统层" color="var(--accent-primary)" />
          <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>→</span>
          <MiniNode label="LLM 推理" color="var(--accent-secondary)" />
        </div>

        {/* Sub Agent box */}
        <motion.div
          style={{
            border: '2px solid rgba(100, 255, 218, 0.2)',
            borderRadius: 14,
            padding: '20px 24px 24px',
            background: 'rgba(100, 255, 218, 0.03)',
            position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', top: -10, left: 20,
            background: 'var(--bg-card)', padding: '2px 14px',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--accent-primary)',
            borderRadius: 4,
          }}>
            子 Agent：Weather Agent（固定 Workflow）
          </div>

          {/* Workflow steps */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
            gap: 20, marginTop: 12, flexWrap: 'wrap',
          }}>
            {workflowSteps.map((ws, i) => (
              <div key={ws.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                  style={{
                    width: 160, padding: '16px 14px',
                    background: activeStep >= i ? 'var(--bg-elevated)' : 'var(--bg-deep)',
                    border: `2px solid ${activeStep === i ? ws.color : activeStep > i ? 'var(--border-active)' : 'var(--border-subtle)'}`,
                    borderRadius: 10,
                    textAlign: 'center',
                    opacity: activeStep >= i || activeStep === -1 ? 1 : 0.4,
                    transition: 'all 0.4s ease',
                    boxShadow: activeStep === i ? `0 0 16px ${ws.color}33` : 'none',
                  }}
                  animate={activeStep === i ? { scale: [1, 1.04, 1] } : {}}
                  transition={{ duration: 0.8, repeat: activeStep === i ? 2 : 0 }}
                >
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, color: ws.color,
                    marginBottom: 4, letterSpacing: 1,
                  }}>
                    Step {ws.id}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
                    color: 'var(--text-primary)', marginBottom: 4,
                  }}>
                    {ws.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
                  }}>
                    {ws.tool}
                  </div>
                </motion.div>

                {/* Connection to result row */}
                {i < workflowSteps.length - 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '8px 0' }}>
                    <div style={{
                      width: 2, height: 20,
                      background: activeStep > i ? 'var(--accent-primary)' : 'var(--text-muted)',
                      opacity: activeStep > i ? 1 : 0.2,
                    }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Result row */}
        <AnimatePresence>
          {activeStep >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                marginTop: 24, textAlign: 'center',
                padding: '16px 24px',
                background: 'rgba(100, 255, 218, 0.06)',
                borderRadius: 10,
                border: '1px solid var(--border-active)',
              }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-primary)', marginBottom: 8 }}>
                标准化结果输出
              </p>
              <div style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)', fontSize: 13,
                color: 'var(--text-primary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 8,
                overflow: 'hidden',
              }}>
                <div style={{ display: 'flex' }}>
                  {['日期', '天气', '温度'].map(h => (
                    <div key={h} style={{
                      padding: '6px 14px', background: 'rgba(100, 255, 218, 0.08)',
                      fontSize: 12, fontWeight: 600, color: 'var(--accent-primary)',
                      borderRight: '1px solid var(--border-subtle)',
                    }}>{h}</div>
                  ))}
                </div>
                {[
                  ['5/21', '☀️ 晴', '24°C'],
                  ['5/22', '⛅ 阴', '20°C'],
                  ['5/23', '🌧️ 小雨', '18°C'],
                ].map((row, i) => (
                  <div key={i} style={{ display: 'flex', borderTop: '1px solid var(--border-subtle)' }}>
                    {row.map((cell, j) => (
                      <div key={j} style={{
                        padding: '6px 14px', fontSize: 12,
                        color: 'var(--text-secondary)',
                        borderRight: j < 2 ? '1px solid var(--border-subtle)' : 'none',
                      }}>{cell}</div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <button
            onClick={runAll}
            style={{
              padding: '10px 28px', fontSize: 14, fontFamily: 'var(--font-sans)', fontWeight: 600,
              background: 'var(--accent-primary)', border: 'none', borderRadius: 8,
              color: 'var(--bg-deep)', cursor: 'pointer',
            }}
          >
            演示工作流编排
          </button>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}

function MiniNode({ label, color }: { label: string; color: string }) {
  return (
    <div style={{
      padding: '8px 16px',
      background: 'var(--bg-elevated)',
      border: `1px solid ${color}44`,
      borderRadius: 8,
      fontFamily: 'var(--font-mono)', fontSize: 11,
      color,
    }}>
      {label}
    </div>
  )
}
