// Calculates the penalty for each 3-day inactivity
function getPerMissPenalty(joiningAmount) {
  return joiningAmount / 12
}

// Calculates the total penalty based on number of 3-day misses
function getInactivityPenalty(joiningAmount, missed3DayIntervals) {
  const perMiss = getPerMissPenalty(joiningAmount)
  return perMiss * missed3DayIntervals
}

// Determines the quit penalty percentage based on progress
function getQuitPenaltyPercentage(percentCompleted) {
  if (percentCompleted <= 10) return 10
  if (percentCompleted <= 50) return 30
  return 80
}

// Calculates the quit penalty amount
function getQuitPenalty(joiningAmount, percentCompleted) {
  const quitPenaltyPercentage = getQuitPenaltyPercentage(percentCompleted)
  return {
    quitPenaltyAmount: (quitPenaltyPercentage / 100) * joiningAmount,
    quitPenaltyPercentage
  }
}

// Master function to calculate all penalties
export function calculateHabitPenalties({
  joiningAmount,
  totalDays,
  daysCompleted,
  missed3DayIntervals
}) {
  const percentCompleted = (daysCompleted / totalDays) * 100

  const perMissPenalty = getPerMissPenalty(joiningAmount)
  const inactivityPenalty = getInactivityPenalty(
    joiningAmount,
    missed3DayIntervals
  )
  const { quitPenaltyAmount, quitPenaltyPercentage } = getQuitPenalty(
    joiningAmount,
    percentCompleted
  )

  return {
    perMissPenalty,
    inactivityPenalty,
    quitPenalty: quitPenaltyAmount,
    percentCompleted,
    quitPenaltyPercentage
  }
}
