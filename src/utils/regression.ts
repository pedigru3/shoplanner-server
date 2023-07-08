const SimpleLinearRegression = require('ml-regression').SimpleLinearRegression

export function generatePredict(
  historicalPrices: number[],
  historicalDates: Date[],
) {
  const x: number[] = historicalDates.map((date) => date.getTime())
  const y: number[] = historicalPrices

  const regression: any = new SimpleLinearRegression(x, y)

  const today = new Date()

  const nexPeriod: number = new Date(today).getTime()
  const nextPrice: string = regression.predict(nexPeriod).toFixed(2)

  if (Number.isNaN(Number(nextPrice))) {
    return 0
  }

  return Number(nextPrice)
}
