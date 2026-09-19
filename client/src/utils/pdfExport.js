/**
 * Generate printable ATS report and learning roadmap PDF
 */
export const generatePrintablePDF = (analysis) => {
  if (!analysis) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export the PDF report.');
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>ATS Report — ${analysis.jobTitle || 'Analysis'}</title>
      <style>
        body { font-family: monospace; background: #fff; color: #000; padding: 40px; line-height: 1.5; }
        h1 { border-bottom: 2px solid #000; padding-bottom: 10px; font-size: 20px; text-transform: uppercase; }
        .score { font-size: 36px; font-weight: bold; margin: 20px 0; }
        .section { margin-top: 30px; border-top: 1px solid #ccc; padding-top: 15px; }
        .skill-tag { display: inline-block; padding: 4px 8px; border: 1px solid #000; margin: 3px; font-size: 12px; }
        .missing { background: #eee; }
        ul { padding-left: 20px; }
      </style>
    </head>
    <body>
      <h1>CAREER INSTRUMENT — ATS SYNTHESIS REPORT</h1>
      <p><strong>Target Position:</strong> ${analysis.jobTitle || 'Target Position'}</p>
      <p><strong>Generated At:</strong> ${new Date(analysis.createdAt || Date.now()).toLocaleString()}</p>
      
      <div class="score">
        COMPATIBILITY SCORE: ${analysis.compatibilityScore}%
      </div>

      <div class="section">
        <h3>DETERMINISTIC FORMULA BREAKDOWN</h3>
        <ul>
          <li>Skills Match Ratio: ${analysis.scoringBreakdown?.skillsMatchRatio || 0}%</li>
          <li>Experience Match: ${analysis.scoringBreakdown?.experienceMatch || 0}%</li>
          <li>Keyword Frequency: ${analysis.scoringBreakdown?.keywordFrequency || 0}%</li>
          <li>Education Match: ${analysis.scoringBreakdown?.educationMatch || 0}%</li>
        </ul>
      </div>

      <div class="section">
        <h3>MATCHED COMPETENCIES (${analysis.matchedSkills?.length || 0})</h3>
        <div>
          ${(analysis.matchedSkills || []).map(s => `<span class="skill-tag">[ ✓ ${s} ]</span>`).join(' ')}
        </div>
      </div>

      <div class="section">
        <h3>MISSING SKILLS (${analysis.missingSkills?.length || 0})</h3>
        <div>
          ${(analysis.missingSkills || []).map(s => `<span class="skill-tag missing">[ ✗ ${s} ]</span>`).join(' ')}
        </div>
      </div>

      <div class="section">
        <h3>ACTIONABLE LEARNING ROADMAP</h3>
        ${(analysis.aiAnalysis?.roadmap || []).map((r, i) => `
          <h4>${r.phase || `PHASE 0${i+1}`} — ${r.topic}</h4>
          <ul>
            ${(r.actions || []).map(a => `<li>${a}</li>`).join('')}
          </ul>
        `).join('')}
      </div>

      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
};
