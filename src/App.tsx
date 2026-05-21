import { lazy, Suspense } from 'react'
import { useActiveStage } from './hooks/useActiveStage'
import { useScrollProgress } from './hooks/useScrollProgress'
import NavIndicator from './components/NavIndicator'
import StageConnector from './components/StageConnector'
import StageCover from './stages/StageCover'
import StageIntro from './stages/StageIntro'

const Stage1 = lazy(() => import('./stages/Stage1'))
const Stage2 = lazy(() => import('./stages/Stage2'))
const Stage3 = lazy(() => import('./stages/Stage3'))
const Stage4 = lazy(() => import('./stages/Stage4'))
const Stage5 = lazy(() => import('./stages/Stage5'))
const Stage6 = lazy(() => import('./stages/Stage6'))
const Stage7 = lazy(() => import('./stages/Stage7'))
const Stage8 = lazy(() => import('./stages/Stage8'))
const StageConclusion = lazy(() => import('./stages/StageConclusion'))

function Loading() {
  return (
    <div style={{
      minHeight: '90vh', display: 'flex', justifyContent: 'center',
      alignItems: 'center', color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)', fontSize: 13,
    }}>
      加载中...
    </div>
  )
}

export default function App() {
  const { activeId, scrollToStage, STAGE_IDS } = useActiveStage()
  const progress = useScrollProgress()

  return (
    <>
      <NavIndicator
        activeId={activeId}
        stageIds={STAGE_IDS}
        onNavigate={scrollToStage}
        progress={progress}
      />

      <main>
        <StageCover />
        <StageIntro />

        <StageConnector
          label="模型体积增大 + 训练数据规模扩张 → 涌现智能"
          secondary="从简单的统计预测到大规模神经网络的跃迁"
        />

        <Suspense fallback={<Loading />}><Stage1 /></Suspense>

        <StageConnector
          label="将 LLM 包装为对话接口，面向用户服务"
          secondary="模型不再只是实验室里的研究产物"
        />

        <Suspense fallback={<Loading />}><Stage2 /></Suspense>

        <StageConnector
          label="对话不能只做一次，需要持续的上下文交互"
        />

        <Suspense fallback={<Loading />}><Stage3 /></Suspense>

        <StageConnector
          label="换个角度使用对话：不只是聊天，而是处理真实任务"
        />

        <Suspense fallback={<Loading />}><Stage4 /></Suspense>

        <StageConnector
          label="用户想让 LLM 处理需要实时数据的任务（天气、股价等）"
          secondary="但 LLM 的知识截止于训练数据"
        />

        <Suspense fallback={<Loading />}><Stage5 /></Suspense>

        <StageConnector
          label="突破 LLM 自身知识边界，接入外部工具能力"
          secondary="Function Calling + MCP 让模型与外部世界交互"
        />

        <Suspense fallback={<Loading />}><Stage6 /></Suspense>

        <StageConnector
          label="单次工具调用不稳定 → 需要编排多步骤工作流"
          secondary="引入子 Agent 和预设 Workflow 提升可靠性"
        />

        <Suspense fallback={<Loading />}><Stage7 /></Suspense>

        <StageConnector
          label="用户期望的输出形式多样化，需要灵活匹配"
          secondary="将不同的呈现能力封装为可复用的 Skill"
        />

        <Suspense fallback={<Loading />}><Stage8 /></Suspense>

        <StageConnector
          label="回顾全程：从预测到理解，从做事到规划"
        />

        <Suspense fallback={<Loading />}><StageConclusion /></Suspense>
      </main>

      {/* Bottom spacer */}
      <div style={{ height: '20vh' }} />
    </>
  )
}
