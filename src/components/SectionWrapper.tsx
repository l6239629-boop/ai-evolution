import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
  id: string
  children: ReactNode
  style?: React.CSSProperties
}

export default function SectionWrapper({ id, children, style }: Props) {
  return (
    <motion.section
      id={id}
      style={{
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 40px',
        maxWidth: 960,
        margin: '0 auto',
        position: 'relative',
        ...style,
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  )
}
