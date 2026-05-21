import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

const DEMO_TEXTS = [
  '人工智能正在改变',
  '今天天气真不错',
  '语言模型可以预测',
]

function predictNext(text: string): { char: string; prob: number }[] {
  if (!text) return []
  const last = text[text.length - 1]
  const map: Record<string, string[]> = {
    '变': ['得', '革', '化', '成', '为'],
    '预': ['测', '报', '料', '订', '防'],
    '错': ['误', '过', '失', '觉', '位'],
    '天': ['气', '空', '地', '堂', '才'],
  }
  const candidates = map[last] || ['的', '了', '是', '一', '不', '人', '在', '有', '我', '他']
  const total = candidates.length
  return candidates.map((c, i) => ({
    char: c,
    prob: (total - i) / (total * (total + 1) / 2),
  }))
}

export default function Stage1() {
  const [input, setInput] = useState('人工智能正在改变')
  const [predictions, setPredictions] = useState(predictNext('人工智能正在改变'))
  const [demoIdx, setDemoIdx] = useState(0)

  useEffect(() => {
    setPredictions(predictNext(input))
  }, [input])

  const cycleDemo = () => {
    const next = (demoIdx + 1) % DEMO_TEXTS.length
    setDemoIdx(next)
    setInput(DEMO_TEXTS[next])
  }

  return (
    <SectionWrapper id="stage-1">
      <div style={{ marginBottom: 32 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-primary)',
          letterSpacing: 3, textTransform: 'uppercase', padding: '4px 14px',
          border: '1px solid var(--border-active)', borderRadius: 20,
        }}>阶段 1</span>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 4vw, 34px)',
          fontWeight: 700, marginTop: 20, marginBottom: 12,
        }}>
          LM 语言模型
        </h2>
        <p style={{ fontSize: 18, color: 'var(--accent-gold)', fontWeight: 500, marginBottom: 16 }}>
          本质：根据已有上文，推理预测下一个 token
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 600 }}>
          语言模型的核心任务看似简单——给定一段文字，猜出接下来最可能出现的字符或词。
          但正是这个「预测下一个」的能力，成为了后来一切智能涌现的基石。
        </p>
      </div>

      {/* Interactive demo */}
      <motion.div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 16,
          border: '1px solid var(--border-subtle)',
          padding: 32,
          position: 'relative',
          overflow: 'hidden',
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Input area */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginBottom: 8, fontFamily: 'var(--font-mono)' }}>
            输入一段文字：
          </label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                minWidth: 200,
                padding: '10px 16px',
                fontSize: 16,
                fontFamily: 'var(--font-mono)',
                background: 'var(--bg-deep)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 8,
                color: 'var(--text-primary)',
                outline: 'none',
              }}
              placeholder="输入文字试试..."
            />
            <button
              onClick={cycleDemo}
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontFamily: 'var(--font-sans)',
                background: 'transparent',
                border: '1px solid var(--border-active)',
                borderRadius: 8,
                color: 'var(--accent-primary)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              换一个例子
            </button>
          </div>
        </div>

        {/* Prediction distribution bar chart */}
        <div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12, fontFamily: 'var(--font-mono)' }}>
            下一个字符的概率预测分布：
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {predictions.map((p, i) => (
              <motion.div
                key={p.char}
                style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600,
                  color: i === 0 ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  width: 32, textAlign: 'center',
                }}>
                  {p.char}
                </span>
                <div style={{ flex: 1, height: 24, background: 'var(--bg-deep)', borderRadius: 6, overflow: 'hidden' }}>
                  <motion.div
                    style={{
                      height: '100%',
                      borderRadius: 6,
                      background: i === 0
                        ? 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))'
                        : 'linear-gradient(90deg, var(--text-muted), var(--text-muted))',
                      opacity: i === 0 ? 1 : Math.max(0.2, p.prob),
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${p.prob * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: 'easeOut' }}
                  />
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)',
                  width: 42, textAlign: 'right',
                }}>
                  {(p.prob * 100).toFixed(0)}%
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Highlighted result */}
        <motion.div
          style={{
            marginTop: 20,
            padding: '14px 20px',
            background: 'rgba(100, 255, 218, 0.06)',
            borderRadius: 8,
            border: '1px solid var(--border-active)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-mono)',
            fontSize: 16,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <span style={{ color: 'var(--text-secondary)' }}>{input}</span>
          <motion.span
            style={{
              color: 'var(--accent-primary)',
              fontWeight: 700,
              fontSize: 20,
              padding: '2px 10px',
              background: 'rgba(100, 255, 218, 0.1)',
              borderRadius: 6,
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {predictions[0]?.char || '?'}
          </motion.span>
          <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
            ← 概率最高的预测结果
          </span>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
