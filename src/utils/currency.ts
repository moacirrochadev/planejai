export function formatCurrencyBRLInput(value: string) {
  const digitsOnly = value.replace(/\D/g, '')

  if (!digitsOnly) {
    return ''
  }

  const amount = Number(digitsOnly) / 100

  return amount.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function parseCurrency(value?: string | null): number {
  if (!value) {
    return 0
  }

  return (
    parseFloat(value.replace(/\./g, '').replace(',', '.').replace('R$', '')) ||
    0
  )
}
