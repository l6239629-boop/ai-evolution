import { motion } from 'framer-motion'

const LABELS: Record<string, string> = {
  'stage-cover': '封面',
  'stage-intro': '引言',
  'stage-1': 'LM',
  'stage-2': 'LLM',
  'stage-3': '对话',
  'stage-4': '记忆',
  'stage-5': '任务',
  'stage-6': '工具',
  'stage-7': 'Agent',
  'stage-8': 'Skill',
  'stage-conclusion': '结语',
}

interface Props {
  activeId: string
  stageIds: string[]
  onNavigate: (id: string) => void
  progress: number
}

export default function NavIndicator({ activeId, stageIds, onNavigate, progress }: Props) {
  return (
    <nav style={{
      position: 'fixed',
      right: 28,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 4,
    }}>
      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        right: 5,
        top: 12,
        bottom: 12,
        width: 2,
        background: 'var(--border-subtle)',
        borderRadius: 1,
        overflow: 'hidden',
      }}>
        <motion.div
          style={{
            width: '100%',
            background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-gold))',
            borderRadius: 1,
            transformOrigin: 'top',
          }}
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />
      </div>

      {stageIds.map((id) => {
        const isActive = id === activeId
        return (
          <motion.button
            key={id}
            onClick={() => onNavigate(id)}
            title={LABELS[id] || id}
            aria-label={`跳转到${LABELS[id] || id}`}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              background: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
              boxShadow: isActive ? '0 0 12px rgba(100, 255, 218, 0.5)' : 'none',
              transition: 'background 0.3s, box-shadow 0.3s',
              position: 'relative',
              zIndex: 1,
              flexShrink: 0,
            }}
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
          >
            {isActive && (
              <motion.span
                layoutId="nav-label"
                style={{
                  position: 'absolute',
                  right: 22,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--accent-primary)',
                  whiteSpace: 'nowrap',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                {LABELS[id]}
              </motion.span>
            )}
          </motion.button>
        )
      })}
    </nav>
  )
}
