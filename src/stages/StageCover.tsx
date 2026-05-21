import { motion } from 'framer-motion'

export default function StageCover() {
  return (
    <section
      id="stage-cover"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px 40px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* Background glow */}
      <motion.div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100, 255, 218, 0.06) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtitle */}
      <motion.p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          color: 'var(--accent-primary)',
          letterSpacing: 6,
          textTransform: 'uppercase',
          marginBottom: 24,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        The Evolution of AI
      </motion.p>

      {/* Title */}
      <motion.h1
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 900,
          lineHeight: 1.2,
          marginBottom: 24,
          background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 50%, var(--accent-gold) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        AI 模型演进原理
      </motion.h1>

      {/* Tagline */}
      <motion.p
        style={{
          fontSize: 18,
          color: 'var(--text-secondary)',
          maxWidth: 500,
          lineHeight: 1.8,
          marginBottom: 48,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        从「预测下一个字符」到「自主调度技能系统」<br />
        一场关于 AI 如何变聪明的技术旅程
      </motion.p>

      {/* Scroll hint */}
      <motion.div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', letterSpacing: 2 }}>
          向下滚动探索
        </span>
        <motion.div
          style={{
            width: 24,
            height: 40,
            borderRadius: 12,
            border: '2px solid var(--border-active)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 8,
          }}
        >
          <motion.div
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              background: 'var(--accent-primary)',
            }}
            animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
