export function renderPattern(pattern, lang) {
  return `
    <div class="pattern-header">
      <h1 class="pattern-title">${pattern.title}</h1>
      <div class="pattern-tags">
        <span class="tag tag-time">⏱ ${pattern.tc || 'Varies'}</span>
        <span class="tag tag-space">💾 ${pattern.sc || 'Varies'}</span>
      </div>
    </div>

    ${renderSection('lightbulb', 'concept', 'Concept Explanation', pattern.concept)}
    ${renderSection('visibility', 'recognition', 'When to Identify / Recognition Keywords', pattern.recognition)}
    ${renderSection('trending_up', 'approach', 'Approaches (Brute → Optimal)', pattern.approaches)}
    ${pattern.code ? renderCodeSection(pattern.code, lang) : ''}
    ${renderSection('bug_report', 'tips', 'Dry Run / Examples', pattern.dryRun)}
    ${renderSection('warning', 'tips', 'Common Mistakes & Edge Cases', pattern.mistakes)}
    ${renderSection('tips_and_updates', 'tips', 'Interview Tips & Memory Tricks', pattern.tips)}
    ${renderSection('swap_horiz', 'variations', 'Variations & Advanced Versions', pattern.variations)}
    ${pattern.problems ? renderProblems(pattern.problems) : ''}
  `;
}

function renderSection(icon, cls, title, content) {
  if (!content) return '';
  return `
    <div class="section open">
      <div class="section-header">
        <div class="section-icon ${cls}"><span class="material-icons-round">${icon}</span></div>
        <div class="section-title">${title}</div>
        <span class="material-icons-round section-chevron">expand_more</span>
      </div>
      <div class="section-body">
        <div class="section-content">${content}</div>
      </div>
    </div>
  `;
}

function renderCodeSection(code, activeLang) {
  const langs = [
    { key: 'cpp', label: 'C++', cls: 'cpp' },
    { key: 'python', label: 'Python', cls: 'python' },
    { key: 'java', label: 'Java', cls: 'java' },
  ];
  const tabs = langs.map(l => `<button class="code-tab ${l.key === activeLang ? 'active' : ''}" data-lang="${l.key}">${l.label}</button>`).join('');
  const panels = langs.map(l => `
    <div class="code-panel" data-lang="${l.key}" style="display:${l.key === activeLang ? 'block' : 'none'}">
      <pre><code class="${l.cls}">${escapeHtml(code[l.key] || '// Coming soon')}</code></pre>
    </div>
  `).join('');

  return `
    <div class="section open">
      <div class="section-header">
        <div class="section-icon code"><span class="material-icons-round">code</span></div>
        <div class="section-title">Template Code</div>
        <span class="material-icons-round section-chevron">expand_more</span>
      </div>
      <div class="section-body">
        <div class="section-content">
          <div class="code-block-wrapper">
            <div class="code-tabs">${tabs}</div>
            <button class="copy-btn">Copy</button>
            ${panels}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProblems(problems) {
  const groups = { Easy: [], Medium: [], Hard: [] };
  problems.forEach(p => {
    if (groups[p.diff]) groups[p.diff].push(p);
  });
  const list = (items, diff) => items.map(p => `
    <div class="problem-item">
      <span class="tag tag-diff-${diff.toLowerCase()}">${diff}</span>
      <span class="problem-name">${p.name}</span>
      ${p.url ? `<a class="problem-link" href="${p.url}" target="_blank" rel="noopener">LeetCode ↗</a>` : ''}
    </div>
  `).join('');

  const content = `
    <ul class="problem-list">
      ${list(groups.Easy, 'Easy')}
      ${list(groups.Medium, 'Medium')}
      ${list(groups.Hard, 'Hard')}
    </ul>
  `;

  return `
    <div class="section">
      <div class="section-header">
        <div class="section-icon problems"><span class="material-icons-round">assignment</span></div>
        <div class="section-title">Top LeetCode Problems</div>
        <span class="material-icons-round section-chevron">expand_more</span>
      </div>
      <div class="section-body">
        <div class="section-content">${content}</div>
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
