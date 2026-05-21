import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

export default function Stage5() {
  return (
    <SectionWrapper id="stage-5">
      <div style={{ marginBottom: 32 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-primary)',
          letterSpacing: 3, textTransform: 'uppercase', padding: '4px 14px',
          border: '1px solid var(--border-active)', borderRadius: 20,
        }}>阶段 5</span>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 4vw, 34px)',
          fontWeight: 700, marginTop: 20, marginBottom: 12,
        }}>
          从对话转向任务
        </h2>
        <p style={{ fontSize: 18, color: 'var(--accent-gold)', fontWeight: 500, marginBottom: 8 }}>
          难度 ⭐⭐⭐
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 640 }}>
          用户开始不满足于纯对话，提出了真实世界的任务请求。
          但 LLM 的知识截止于训练数据，无法获取实时信息——这是一个根本性的局限。
        </p>
      </div>

      {/* Limitation demo */}
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
        {/* Question */}
        <div style={{
          display: 'flex', justifyContent: 'flex-end', marginBottom: 20,
        }}>
          <ChatBubble role="user" text="5 月 20 日天气怎么样？" />
        </div>

        {/* LLM response - wrong */}
        <motion.div
          style={{
            display: 'flex', justifyContent: 'flex-start', marginBottom: 24,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <ChatBubble role="ai" text="晴天" />
        </motion.div>

        {/* Warning box */}
        <motion.div
          style={{
            padding: '16px 20px',
            background: 'rgba(255, 112, 67, 0.06)',
            border: '1px solid rgba(255, 112, 67, 0.25)',
            borderRadius: 10,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
          }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <span style={{ fontSize: 20, flexShrink: 0 }}>✕</span>
          <div>
            <p style={{
              fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 14,
              color: '#ff7043', marginBottom: 4,
            }}>
              问题：LLM 自身无法主动获取实时天气
            </p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              没有外部工具时，模型只能基于训练数据中见过的模式猜测。
              它可能会编造一个看起来「合理」的答案，而不一定是真实数据。
              这就是所谓的「幻觉」（Hallucination）。
            </p>
          </div>
        </motion.div>

        {/* Transition hint */}
        <motion.div
          style={{
            marginTop: 28,
            textAlign: 'center',
            padding: '16px 24px',
            background: 'rgba(255, 183, 77, 0.05)',
            borderRadius: 8,
            border: '1px solid rgba(255, 183, 77, 0.2)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <p style={{ fontSize: 14, color: 'var(--accent-gold)', fontFamily: 'var(--font-sans)' }}>
            为了让 LLM 突破自身知识边界的限制，我们需要给它接入外部工具能力 →
          </p>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}

function ChatBubble({ role, text }: { role: 'user' | 'ai'; text: string }) {
  const isUser = role === 'user'
  return (
    <div style={{
      maxWidth: '70%',
      padding: '10px 16px',
      borderRadius: isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
      background: isUser ? 'rgba(79, 195, 247, 0.12)' : 'rgba(100, 255, 218, 0.08)',
      border: `1px solid ${isUser ? 'rgba(79, 195, 247, 0.25)' : 'rgba(100, 255, 218, 0.2)'}`,
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)',
    }}>
      <span style={{
        fontSize: 10, display: 'block', marginBottom: 2,
        color: isUser ? 'var(--accent-secondary)' : 'var(--accent-primary)',
        fontFamily: 'var(--font-mono)',
      }}>
        {isUser ? '用户' : 'LLM'}
      </span>
      {text}
    </div>
  )
}
