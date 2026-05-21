import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

const threads = [
  {
    title: '提升理解能力',
    stages: '阶段 1 — 4',
    desc: '从预测字符到记住上下文，让模型学会「听懂」和「记住」',
    color: 'var(--accent-primary)',
  },
  {
    title: '拓展行动边界',
    stages: '阶段 5 — 6',
    desc: '从纯文本对话到调用外部工具，让模型学会「做事」',
    color: 'var(--accent-secondary)',
  },
  {
    title: '构建自主编排',
    stages: '阶段 7 — 8',
    desc: '从单步工具到多步工作流与技能匹配，让模型学会「规划」',
    color: 'var(--accent-gold)',
  },
]

export default function StageConclusion() {
  return (
    <SectionWrapper id="stage-conclusion">
      <motion.div
        style={{ textAlign: 'center' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-primary)',
          letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16,
          padding: '4px 14px', border: '1px solid var(--border-active)', borderRadius: 20,
        }}>
          结语
        </span>

        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(22px, 4vw, 30px)',
          fontWeight: 700, marginBottom: 20, lineHeight: 1.4,
        }}>
          演进背后的三条主线
        </h2>

        <p style={{
          fontSize: 16, color: 'var(--text-secondary)',
          maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.9,
        }}>
          回顾这 8 个阶段，AI 模型的演进本质上是在做三件事。
          而这一切的起点，仅仅是「预测下一个字符」。
        </p>

        {/* Three threads */}
        <div style={{
          display: 'flex', gap: 24, justifyContent: 'center',
          flexWrap: 'wrap', maxWidth: 780, margin: '0 auto',
        }}>
          {threads.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              style={{
                flex: '1 1 220px', maxWidth: 260,
                padding: '24px 20px',
                background: 'var(--bg-card)',
                borderRadius: 14,
                border: `1px solid ${t.color}33`,
                textAlign: 'center',
              }}
              whileHover={{
                borderColor: t.color,
                boxShadow: `0 0 24px ${t.color}22`,
              }}
            >
              <div style={{
                fontSize: 28, marginBottom: 12, color: t.color,
                fontFamily: 'var(--font-mono)',
              }}>
                {i + 1}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 700,
                color: t.color, marginBottom: 6,
              }}>
                {t.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                color: 'var(--text-muted)', marginBottom: 8,
              }}>
                {t.stages}
              </p>
              <p style={{
                fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7,
              }}>
                {t.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Final line */}
        <motion.p
          style={{
            marginTop: 40,
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            color: 'var(--accent-primary)',
            opacity: 0.6,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          ↓ 从预测下一个字符开始，到自主调度技能系统
        </motion.p>
      </motion.div>
    </SectionWrapper>
  )
}
