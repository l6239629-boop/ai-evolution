import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from '../components/SectionWrapper'

type SkillMode = 'table' | 'card' | 'chart'

const weatherData = [
  { date: '5/21', weather: '晴', temp: 24, icon: '☀️' },
  { date: '5/22', weather: '阴', temp: 20, icon: '⛅' },
  { date: '5/23', weather: '小雨', temp: 18, icon: '🌧️' },
]

const skillInfo: Record<SkillMode, { name: string; desc: string; icon: string }> = {
  table: { name: '表格 Skill', desc: '结构化数据展示，适合精确对比', icon: '📊' },
  card: { name: '卡片 Skill', desc: '美观卡片布局，适合日常浏览', icon: '🃏' },
  chart: { name: '图表 Skill', desc: '可视化趋势展示，适合概览分析', icon: '📈' },
}

export default function Stage8() {
  const [mode, setMode] = useState<SkillMode>('table')

  return (
    <SectionWrapper id="stage-8">
      <div style={{ marginBottom: 32 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent-primary)',
          letterSpacing: 3, textTransform: 'uppercase', padding: '4px 14px',
          border: '1px solid var(--border-active)', borderRadius: 20,
        }}>阶段 8</span>
        <h2 style={{
          fontFamily: 'var(--font-sans)', fontSize: 'clamp(24px, 4vw, 34px)',
          fontWeight: 700, marginTop: 20, marginBottom: 12,
        }}>
          Skill 技能系统
        </h2>
        <p style={{ fontSize: 18, color: 'var(--accent-gold)', fontWeight: 500, marginBottom: 8 }}>
          难度 ⭐⭐⭐⭐⭐⭐
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 680 }}>
          用户想要的输出形式可能各不相同——表格、卡片、PPT、Word 文档……
          我们将不同的呈现能力封装为独立的 <strong style={{ color: 'var(--accent-primary)' }}>Skill（技能）</strong>，
          AI 在遇到呈现需求时可以自主匹配和运行最合适的 Skill。
          参考规范：
          <a href="https://agentskills.io/home" target="_blank" rel="noopener"
            style={{ color: 'var(--accent-secondary)', marginLeft: 4 }}>
            agentskills.io
          </a>
        </p>
      </div>

      {/* Skill demo */}
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
          任务：查未来 3 天天气，并以「美观的形式」呈现
        </p>

        {/* Skill selector */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 28,
          flexWrap: 'wrap',
        }}>
          {(Object.keys(skillInfo) as SkillMode[]).map((key) => (
            <motion.button
              key={key}
              onClick={() => setMode(key)}
              style={{
                padding: '10px 20px',
                fontSize: 14,
                fontFamily: 'var(--font-sans)',
                fontWeight: mode === key ? 600 : 400,
                background: mode === key ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
                border: `2px solid ${mode === key ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                borderRadius: 10,
                color: mode === key ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{skillInfo[key].icon}</span>
              <span>{skillInfo[key].name}</span>
            </motion.button>
          ))}
        </div>

        {/* Skill description */}
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center', marginBottom: 20,
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            {skillInfo[mode].desc}
          </p>
        </motion.div>

        {/* Output area */}
        <div style={{
          minHeight: 200,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <AnimatePresence mode="wait">
            {mode === 'table' && <TableView key="table" data={weatherData} />}
            {mode === 'card' && <CardView key="card" data={weatherData} />}
            {mode === 'chart' && <ChartView key="chart" data={weatherData} />}
          </AnimatePresence>
        </div>

        {/* Architecture note */}
        <motion.div
          style={{
            marginTop: 28, padding: '14px 20px',
            background: 'rgba(100, 255, 218, 0.04)',
            borderRadius: 8, border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--text-muted)', textAlign: 'center',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          LLM 生成 skill call → apply_skill("weather_{mode === 'table' ? 'table' : mode === 'card' ? 'card' : 'chart'}")
          &nbsp;|&nbsp;  或通过 MCP / tool schema 调用对应 Skill
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}

function TableView({ data }: { data: typeof weatherData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{
        border: '1px solid var(--border-active)',
        borderRadius: 10,
        overflow: 'hidden',
        boxShadow: '0 0 24px rgba(100, 255, 218, 0.08)',
      }}
    >
      <div style={{ display: 'flex', background: 'rgba(100, 255, 218, 0.1)' }}>
        {['日期', '天气', '温度'].map(h => (
          <div key={h} style={{
            padding: '10px 24px', fontSize: 13, fontWeight: 600,
            fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)',
            borderRight: '1px solid var(--border-subtle)',
            flex: 1, textAlign: 'center',
          }}>{h}</div>
        ))}
      </div>
      {data.map((row, i) => (
        <div key={i} style={{ display: 'flex', borderTop: '1px solid var(--border-subtle)' }}>
          {[row.date, `${row.icon} ${row.weather}`, `${row.temp}°C`].map((cell, j) => (
            <div key={j} style={{
              padding: '8px 24px', fontSize: 13,
              fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)',
              borderRight: j < 2 ? '1px solid var(--border-subtle)' : 'none',
              flex: 1, textAlign: 'center',
            }}>{cell}</div>
          ))}
        </div>
      ))}
    </motion.div>
  )
}

function CardView({ data }: { data: typeof weatherData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {data.map((row, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          style={{
            width: 160,
            padding: '20px 16px',
            background: 'linear-gradient(145deg, var(--bg-elevated), var(--bg-card))',
            border: '1px solid var(--border-subtle)',
            borderRadius: 14,
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
          whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(100, 255, 218, 0.12)' }}
        >
          <div style={{ fontSize: 36, marginBottom: 8 }}>{row.icon}</div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)', marginBottom: 4,
          }}>
            {row.date}
          </div>
          <div style={{
            fontFamily: 'var(--font-sans)', fontSize: 18, fontWeight: 700,
            color: 'var(--text-primary)', marginBottom: 4,
          }}>
            {row.weather}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 600,
            color: 'var(--accent-gold)',
          }}>
            {row.temp}°C
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

function ChartView({ data }: { data: typeof weatherData }) {
  const maxTemp = Math.max(...data.map(d => d.temp))
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{
        width: '100%', maxWidth: 420,
        padding: '24px 20px',
        background: 'var(--bg-elevated)',
        borderRadius: 14,
        border: '1px solid var(--border-subtle)',
      }}
    >
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)',
        marginBottom: 20, textAlign: 'center',
      }}>
        未来 3 天温度趋势
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 28, height: 140 }}>
        {data.map((row, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600,
              color: 'var(--accent-gold)',
            }}>
              {row.temp}°C
            </span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(row.temp / maxTemp) * 100}px` }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
              style={{
                width: 40,
                borderRadius: '6px 6px 0 0',
                background: `linear-gradient(to top, var(--accent-primary), var(--accent-secondary))`,
                opacity: 0.7 + (row.temp / maxTemp) * 0.3,
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 16 }}>{row.icon}</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)',
              }}>
                {row.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
