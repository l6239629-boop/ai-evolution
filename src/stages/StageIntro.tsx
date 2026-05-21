import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

export default function StageIntro() {
  return (
    <SectionWrapper id="stage-intro">
      <motion.div
        style={{ textAlign: 'center' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--accent-primary)',
            letterSpacing: 3,
            textTransform: 'uppercase',
            marginBottom: 16,
            padding: '4px 14px',
            border: '1px solid var(--border-active)',
            borderRadius: 20,
          }}
        >
          阶段 0
        </motion.span>
        <h2 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 700,
          marginBottom: 24,
          lineHeight: 1.4,
        }}>
          为什么需要了解<br />AI 模型的演进？
        </h2>
        <p style={{
          fontSize: 16,
          color: 'var(--text-secondary)',
          maxWidth: 640,
          margin: '0 auto',
          lineHeight: 2,
        }}>
          我们日常使用的 ChatGPT、DeepSeek 等 AI 产品背后，并非一蹴而就。
          它们经历了多个阶段的技术演进，每一次跃迁都解决了一个关键问题。
          下面我们从最基础的语言模型开始，一步步看到今天的 Agent 和 Skill 系统是如何构建出来的。
        </p>
      </motion.div>
    </SectionWrapper>
  )
}
