import assert from 'node:assert';
import test from 'node:test';
import { calculateDeterministicScore } from '../src/services/scoringService.js';

test('Deterministic Scoring Algorithm — Accuracy & Repeatability', () => {
  const sampleResume = {
    rawText: 'Experienced Software Engineer skilled in React.js, Node.js, Express, MongoDB, JavaScript, HTML, CSS. Bachelor of Computer Applications.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'HTML', 'CSS'],
    education: ['Bachelor of Computer Applications'],
    yearsOfExperience: 3,
  };

  const sampleJD = 'Looking for a Full-Stack MERN Developer proficient in React.js, Node.js, Express, MongoDB, Docker, and AWS.';

  const score1 = calculateDeterministicScore(sampleResume, sampleJD, 3);
  const score2 = calculateDeterministicScore(sampleResume, sampleJD, 3);

  // Assert 100% Score Repeatability
  assert.strictEqual(score1.compatibilityScore, score2.compatibilityScore);
  assert.deepStrictEqual(score1.scoringBreakdown, score2.scoringBreakdown);

  // Assert Score bounds
  assert.ok(score1.compatibilityScore >= 0 && score1.compatibilityScore <= 100);
  assert.ok(score1.matchedSkills.includes('React'));
  assert.ok(score1.missingSkills.includes('Docker') || score1.missingSkills.includes('AWS'));

  console.log(`[TEST PASSED] Deterministic Score: ${score1.compatibilityScore}%`);
});
