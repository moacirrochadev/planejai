import { useCallback, useEffect, useRef, useState } from 'react'
import { useSimulationStorage } from './useSimulationStorage'
import { getInsight, type InsightData } from '../services/aiService'
import { buildAIPrompt } from '../data/aiPrompt'

export const useInsight = (id: string) => {
  const [insight, setInsight] = useState<InsightData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestedIdRef = useRef<string | null>(null)

  const { getFormData } = useSimulationStorage()

  // Necessário o uso do useCallback pois temos que colocar essa função
  // Como array de dependências do useEffect
  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const prompt = buildAIPrompt(simulation)
        const data = await getInsight(prompt)
        setInsight(data)
        return data
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    },
    [getFormData],
  )

  useEffect(() => {
    if (!id || requestedIdRef.current === id) {
      return
    }

    requestedIdRef.current = id
    void fetchInsight(id)
  }, [id, fetchInsight])

  return { insight, isLoading, error, fetchInsight }
}
