import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

const SAMPLE_TEXTS = [
  { text: '我是一个人工智能助手', label: '中文示例' },
  { text: 'Hello, how are you?', label: '英文示例' },
  { text: 'What is the capital of China?', label: '问答示例' },
]

// Simple tokenizer simulation
function simpleTokenize(text: string): string[] {
  if (/[\u4e00-\u9fff]/.test(text)) {
    // Chinese: split by common patterns
    const tokens: string[] = []
    let i = 0
    while (i < text.length) {
      const ch = text[i]
      if (/[\u4e00-\u9fff]/.test(ch)) {
        if (i + 1 < text.length && /[\u4e00-\u9fff]/.test(text[i + 1])) {
          tokens.push(text.slice(i, i + 2))
          i += 2
        } else {
          tokens.push(ch)
          i++
        }
      } else if (/[a-zA-Z]/.test(ch)) {
        let j = i
        while (j < text.length && /[a-zA-Z]/.test(text[j])) j++
        tokens.push(text.slice(i, j))
        i = j
      } else if (ch === ' ') {
        tokens.push('␣')
        i++
      } else {
        if (ch === '?' || ch === '!' || ch === '.' || ch === ',') {
          tokens.push(ch)
          i++
        } else {
          tokens.push(ch)
          i++
        }
      }
    }
    return tokens
  }
  // English: split by words and punctuation
  return text.split(/(\s+|(?=[.,!?])|(?<=[.,!?]))/g).filter(Boolean).map(t => t === ' ' ? '␣' : t)
}

const TOKEN_COLORS = [
  '#64ffda', '#4fc3f7', '#ffb74d', '#f06292', '#ba68c8',
  '#4db6ac', '#ff8a65', '#aed581', '#7986cb', '#e57373',
  '#81c784', '#ffd54f', '#4dd0e1', '#b39ddb', '#ffab91',
]

export default function Stage2() {
  const [input, setInput] = useState(SAMPLE_TEXTS[0].text)
  const [showTokens, setShowTokens] = useState(true)
  const tokens = simpleTokenize(input)

  return (
    <SectionWrapper id="stage-2">
      <div style={{ marginBottom: 32 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-primary)',
          letterSpacing: 3, textTransform: 'uppercase', padding: '4px 14px',
          border: '1px solid var(--border-active)', borderRadius: 20,
        }}>阶段 2</span>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 4vw, 34px)',
          fontWeight: 700, marginTop: 20, marginBottom: 12,
        }}>
          LLM 大语言模型
        </h2>
        <p style={{ fontSize: 18, color: 'var(--accent-gold)', fontWeight: 500, marginBottom: 8 }}>
          代表：GPT-4、DeepSeek-R1
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 600 }}>
          当模型体积和数据规模不断增大，涌现出了令人惊叹的智能。但模型本身只能理解一种东西——<strong style={{ color: 'var(--accent-primary)' }}>Token（标记）</strong>。
          所有输入的文字，都要先被切分成 token，模型才能「读懂」。
        </p>
      </div>

      {/* Tokenizer demo */}
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
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Sample buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {SAMPLE_TEXTS.map((s) => (
            <button
              key={s.text}
              onClick={() => setInput(s.text)}
              style={{
                padding: '6px 14px',
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                background: input === s.text ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                border: `1px solid ${input === s.text ? 'var(--border-active)' : 'var(--border-subtle)'}`,
                borderRadius: 6,
                color: input === s.text ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Input */}
        <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
          Tokenizer 演示 — 输入文字查看切分结果：
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: 16,
            fontFamily: 'var(--font-mono)',
            background: 'var(--bg-deep)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            color: 'var(--text-primary)',
            outline: 'none',
            marginBottom: 20,
          }}
        />

        {/* Token display */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--text-muted)' }}>
              Token 切分结果（{tokens.length} 个 token）：
            </span>
            <button
              onClick={() => setShowTokens(!showTokens)}
              style={{
                fontSize: 11, fontFamily: 'var(--font-sans)',
                background: 'transparent', border: 'none',
                color: 'var(--accent-secondary)', cursor: 'pointer',
              }}
            >
              {showTokens ? '隐藏颜色' : '显示颜色'}
            </button>
          </div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 4,
            padding: 16, background: 'var(--bg-deep)',
            borderRadius: 10, minHeight: 48,
            border: '1px solid var(--border-subtle)',
          }}>
            <AnimatePresence mode="popLayout">
              {tokens.map((token, i) => (
                <motion.span
                  key={`${token}-${i}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: 5,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 14,
                    background: showTokens ? `${TOKEN_COLORS[i % TOKEN_COLORS.length]}22` : 'transparent',
                    border: `1px solid ${showTokens ? TOKEN_COLORS[i % TOKEN_COLORS.length]}44 : 'transparent'`,
                    color: showTokens ? TOKEN_COLORS[i % TOKEN_COLORS.length] : 'var(--text-primary)',
                    position: 'relative',
                  }}
                  whileHover={{ scale: 1.08, zIndex: 2 }}
                >
                  {token === '␣' ? (
                    <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>空格</span>
                  ) : token}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Token count info */}
        <motion.div
          style={{
            padding: '14px 20px',
            background: 'rgba(79, 195, 247, 0.06)',
            borderRadius: 8,
            border: '1px solid rgba(79, 195, 247, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div>
            <span style={{ color: 'var(--text-muted)' }}>字符数：</span>
            <span style={{ color: 'var(--text-primary)' }}>{input.length}</span>
          </div>
          <div style={{ width: 1, height: 20, background: 'var(--border-subtle)' }} />
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Token 数：</span>
            <span style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>{tokens.length}</span>
          </div>
          <div style={{ width: 1, height: 20, background: 'var(--border-subtle)' }} />
          <div>
            <span style={{ color: 'var(--text-muted)' }}>压缩比：</span>
            <span style={{ color: 'var(--accent-gold)' }}>{(input.length / Math.max(1, tokens.length)).toFixed(1)} 字符/token</span>
          </div>
        </motion.div>

        {/* External link hint */}
        <p style={{ marginTop: 16, fontSize: 12, color: 'var(--text-muted)', textAlign: 'right' }}>
          在线体验真实 Tokenizer：
          <a href="https://platform.openai.com/tokenizer" target="_blank" rel="noopener"
            style={{ color: 'var(--accent-secondary)', marginLeft: 4 }}>
            platform.openai.com/tokenizer
          </a>
        </p>
      </motion.div>
    </SectionWrapper>
  )
}
