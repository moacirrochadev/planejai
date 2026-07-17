import { useCallback, useEffect, useRef, useState } from 'react'
import { useSimulationStorage } from './useSimulationStorage'
import { getInsight, type InsightData } from '../services/aiService'
import { buildAIPrompt } from '../data/aiPrompt'
import type { SimulationRecord } from '../data/simulation'

export const useInsight = (id: string) => {
  const isRequestPending = useRef(false)
  const { getFormData, updateSimulation } = useSimulationStorage()
  const [insight, setInsight] = useState<InsightData | null>(() => {
    const simulation = getFormData(id)

    if (simulation?.insight) {
      return simulation.insight
    }

    return null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestedIdRef = useRef<string | null>(null)

  // Necessário o uso do useCallback pois temos que colocar essa função
  // Como array de dependências do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      isRequestPending.current = true
      setIsLoading(true)
      setError(null)

      try {
        const prompt = buildAIPrompt(simulation)
        const data = await getInsight(prompt)
        setInsight(data)

        updateSimulation(simulationId, {
          ...simulation,
          insight: data,
        } as SimulationRecord)
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente.')
      } finally {
        isRequestPending.current = false
        setIsLoading(false)
      }
    },
    [getFormData, updateSimulation],
  )

  useEffect(() => {
    if (!id || requestedIdRef.current === id || isRequestPending.current) {
      return
    }

    requestedIdRef.current = id
    void fetchInsight(id)
  }, [id, fetchInsight])

  return { insight, isLoading, error, fetchInsight }
}
