import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

const ROUND_A = { user: '你是谁？', ai: '我是一个 AI 模型' }
const ROUND_B_USER = '你能做什么？'
const ROUND_B_AI = '我可以回答问题、写代码、翻译语言…'

export default function Stage4() {
  const [showRoundB, setShowRoundB] = useState(false)

  return (
    <SectionWrapper id="stage-4">
      <div style={{ marginBottom: 32 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-primary)',
          letterSpacing: 3, textTransform: 'uppercase', padding: '4px 14px',
          border: '1px solid var(--border-active)', borderRadius: 20,
        }}>阶段 4</span>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 4vw, 34px)',
          fontWeight: 700, marginTop: 20, marginBottom: 12,
        }}>
          多次对话
        </h2>
        <p style={{ fontSize: 18, color: 'var(--accent-gold)', fontWeight: 500, marginBottom: 8 }}>
          难度 ⭐⭐
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 640 }}>
          真正的对话不会只进行一次。在多轮对话中，LLM 需要「记住」之前的对话历史。
          这个记忆的容量上限被称为 <strong style={{ color: 'var(--accent-primary)' }}>Context Window（上下文窗口）</strong>，
          超出窗口的旧内容会被遗忘。每次新对话都要把历史 + 新问题一起提交给模型。
        </p>
      </div>

      {/* Multi-round demo */}
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
        {/* Round A */}
        <div style={{ marginBottom: 24 }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)',
            marginBottom: 12, letterSpacing: 1,
          }}>
            A 轮对话
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <ChatBubble role="user" text={ROUND_A.user} delay={0} />
            <ChatBubble role="ai" text={ROUND_A.ai} delay={0.3} />
          </div>
        </div>

        {/* Context Window visualization */}
        <motion.div
          style={{
            border: '1px dashed var(--border-active)',
            borderRadius: 10,
            padding: 20,
            marginBottom: 24,
            position: 'relative',
            background: 'rgba(100, 255, 218, 0.03)',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <div style={{
            position: 'absolute', top: -10, left: 16,
            background: 'var(--bg-card)', padding: '2px 10px',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--accent-primary)',
          }}>
            Context Window（上下文窗口）
          </div>

          {/* Context content visualization */}
          <div style={{ marginTop: 8 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              {/* History part */}
              <div style={{
                flex: '0 0 auto',
                padding: '8px 12px',
                background: 'rgba(100, 255, 218, 0.06)',
                borderRadius: 6,
                border: '1px solid rgba(100, 255, 218, 0.15)',
              }}>
                <p style={{ fontSize: 10, color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  A 轮完整对话历史
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  用户: "{ROUND_A.user}"
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  LLM: "{ROUND_A.ai}"
                </p>
              </div>

              <div style={{
                display: 'flex', alignItems: 'center',
                fontFamily: 'var(--font-mono)', fontSize: 18,
                color: 'var(--accent-gold)',
              }}>
                +
              </div>

              {/* New prompt */}
              <div style={{
                flex: '0 0 auto',
                padding: '8px 12px',
                background: 'rgba(255, 183, 77, 0.06)',
                borderRadius: 6,
                border: '1px solid rgba(255, 183, 77, 0.2)',
              }}>
                <p style={{ fontSize: 10, color: 'var(--accent-gold)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  B 轮新 Prompt
                </p>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
                  用户: "{ROUND_B_USER}"
                </p>
              </div>
            </div>

            {/* Capacity bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                窗口用量
              </span>
              <div style={{
                flex: 1, height: 8, background: 'var(--bg-deep)',
                borderRadius: 4, overflow: 'hidden',
              }}>
                <motion.div
                  style={{
                    height: '100%', borderRadius: 4,
                    background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-gold))',
                  }}
                  initial={{ width: '0%' }}
                  whileInView={{ width: showRoundB ? '45%' : '30%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
                {showRoundB ? '45%' : '30%'}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                / 最大 128K tokens
              </span>
            </div>
          </div>
        </motion.div>

        {/* Round B toggle */}
        {!showRoundB ? (
          <motion.button
            onClick={() => setShowRoundB(true)}
            style={{
              display: 'block', margin: '0 auto', padding: '10px 24px',
              fontSize: 14, fontFamily: 'var(--font-sans)', fontWeight: 600,
              background: 'var(--accent-primary)', border: 'none', borderRadius: 8,
              color: 'var(--bg-deep)', cursor: 'pointer',
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            继续 B 轮对话 →  "{ROUND_B_USER}"
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)',
              marginBottom: 12, letterSpacing: 1,
            }}>
              B 轮对话
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <ChatBubble role="user" text={ROUND_B_USER} delay={0} />
              <ChatBubble role="ai" text={ROUND_B_AI} delay={0.3} />
            </div>
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  )
}

function ChatBubble({ role, text, delay }: { role: 'user' | 'ai'; text: string; delay: number }) {
  const isUser = role === 'user'
  return (
    <motion.div
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
      }}
      initial={{ opacity: 0, x: isUser ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
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
    </motion.div>
  )
}
