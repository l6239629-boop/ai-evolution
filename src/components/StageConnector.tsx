import { motion } from 'framer-motion'

interface Props {
  label: string
  secondary?: string
}

export default function StageConnector({ label, secondary }: Props) {
  return (
    <motion.div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 0',
        position: 'relative',
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      {/* Arrow line */}
      <div style={{ position: 'relative', width: 2, height: 48, marginBottom: 12 }}>
        <motion.div
          style={{
            width: 2,
            height: '100%',
            background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-gold))',
            transformOrigin: 'top',
          }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        {/* Arrow head */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: -6,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '7px solid transparent',
            borderRight: '7px solid transparent',
            borderTop: '8px solid var(--accent-gold)',
          }}
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 }}
        />
        {/* Flowing dot */}
        <motion.div
          style={{
            position: 'absolute',
            left: -3,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--accent-gold)',
            boxShadow: '0 0 12px rgba(255, 183, 77, 0.6)',
          }}
          animate={{ top: ['0%', '90%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Label */}
      <motion.div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 14,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          maxWidth: 420,
          lineHeight: 1.6,
          padding: '10px 20px',
          background: 'var(--bg-card)',
          borderRadius: 8,
          border: '1px solid var(--border-subtle)',
        }}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{
          borderColor: 'var(--border-active)',
          boxShadow: 'var(--glow-gold)',
        }}
      >
        <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>↓ </span>
        {label}
        {secondary && (
          <span style={{ display: 'block', marginTop: 4, fontSize: 12, color: 'var(--text-muted)' }}>
            {secondary}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
