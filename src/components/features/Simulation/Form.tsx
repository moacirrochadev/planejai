import { FormStep } from './FormStep'
import { StepProgress } from './Progress'
import { simulationFormSteps } from '../../../data/simulation'

export function SimulationForm() {

  const currentStep = simulationFormSteps[1] // Example: Get the first step for demonstration

  return (
    <>
      <StepProgress currentStep={1} totalSteps={6} />
      <FormStep
        key={currentStep.id}
        {...currentStep}
      />
    </>
  )
}
