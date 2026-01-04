/**
 * Categorize a team based on its score
 * @param {number} score - Team score
 * @param {Object} thresholds - Optional thresholds
 * @returns {string} - "Selected" or "Non-Selected" or "Pending"
 */
export function categorizeTeam(score, thresholds = { selected: 70, nonSelected: 0 }) {
  if (score === null || score === undefined) return "Pending";
  if (score >= thresholds.selected) return "Selected";
  if (score >= thresholds.nonSelected) return "Non-Selected";
  return "Non-Selected";
}

/**
 * Calculate total score from an array of criteria
 * @param {Array<number>} scores - Array of individual scores
 * @returns {number} - Total score
 */
export function calculateTotalScore(scores = []) {
  return scores.reduce((total, curr) => total + (Number(curr) || 0), 0);
}

/**
 * Get team status based on score and optional thresholds
 * @param {number} score 
 * @param {Object} thresholds 
 * @returns {Object} { score, status }
 */
export function getTeamScoreStatus(score, thresholds) {
  const status = categorizeTeam(score, thresholds);
  return { score, status };
}
