import {
  CalendarClock,
  CreditCard,
  Goal,
  Landmark,
  PiggyBank,
  Wallet,
} from 'lucide-react'

import type { FormStepProps } from '../components/features/Simulation/FormStep'
import type { InsightData } from '../services/aiService'

export const simulationFormSteps = [
  {
    id: 'income',
    icon: PiggyBank,
    title: 'Renda mensal bruta',
    question:
      'Quanto é depositado na sua conta todo mês (somando todas as fontes)?',
    inputProps: {
      placeholder: 'ex: 5.000,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'expenses',
    icon: CreditCard,
    title: 'Custos fixos de vida',
    question:
      'Quanto você gasta mensalmente com custos fixos (moradia, transporte, alimentação, etc.)?',
    inputProps: {
      placeholder: 'ex: 3.000,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'debits',
    icon: Landmark,
    title: 'Dívidas / Parcelas',
    question:
      'Você tem algum valor comprometido com parcelas ou empréstimos mensalmente?',
    inputProps: {
      placeholder: 'ex: 1.000,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'goalName',
    icon: Goal,
    title: 'Nome da meta',
    question: 'Qual é o objetivo que você deseja alcançar?',
    inputProps: {
      placeholder: 'ex: Viagem para a Europa',
      maxLength: 50,
    },
  },
  {
    id: 'goalAmount',
    icon: Wallet,
    title: 'Custo da meta',
    question: 'Quanto custa realizar esse sonho? (valor total da meta)',
    inputProps: {
      placeholder: 'ex: 20.000,00',
      prefix: 'R$',
      maxLength: 12,
    },
  },
  {
    id: 'goalDeadline',
    icon: CalendarClock,
    title: 'Prazo desejado',
    question: 'Em quanto tempo você deseja alcançar esse objetivo?',
    inputProps: {
      type: 'number',
      placeholder: 'ex: 12',
      suffix: 'meses',
      min: 1,
      max: 120,
    },
    submitButtonProps: {
      label: 'Gerar simulação',
      emojiIcom: '🎯',
    },
  },
] satisfies FormStepProps[]

export type SimulationFormData = Record<
  (typeof simulationFormSteps)[number]['id'],
  string
>

export type SimulationRecord = SimulationFormData & { 
  id: string
  insight?: InsightData
 }