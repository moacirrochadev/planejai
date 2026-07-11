import { PiggyBank } from 'lucide-react'
import { FormStep } from './FormStep'
import { StepProgress } from './Progress'

export function SimulationForm() {
  return (
    <>
      <StepProgress currentStep={1} totalSteps={6} />
      <FormStep
        icon={PiggyBank}
        title="Renda Mensal Bruta"
        question="Quanto é depositado na sua conta todo mês (somando todas as fontes)?"
        inputProps={{
            type: 'text',
            placeholder: 'Ex: 5.000,00',
            prefix: 'R$',
        }}
      />
    </>
  )
}
