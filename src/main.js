import './style.css';
import { categories } from './data/index.js';
import { renderPattern } from './renderer.js';

const state = {
  activeCategory: null,
  activePattern: null,
  lang: 'cpp',
  searchQuery: '',
};

function buildApp() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="sidebar-overlay" id="overlay"></div>
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <span class="material-icons-round">auto_awesome</span>
          DSA Mastery
        </div>
      </div>
      <div class="sidebar-search">
        <div class="search-box">
          <span class="material-icons-round">search</span>
          <input type="text" id="search-input" placeholder="Search patterns... (Ctrl+K)" />
        </div>
      </div>
      <nav class="sidebar-nav" id="sidebar-nav"></nav>
    </aside>
    <main class="main-content">
      <div class="topbar">
        <button class="topbar-toggle" id="menu-toggle">
          <span class="material-icons-round">menu</span>
        </button>
        <div class="topbar-breadcrumb" id="breadcrumb">
          <span class="material-icons-round" style="font-size:18px">home</span>
          <span>›</span> <strong>Home</strong>
        </div>
        <div class="topbar-actions">
          <button class="lang-btn active" data-lang="cpp">C++</button>
          <button class="lang-btn" data-lang="python">Python</button>
          <button class="lang-btn" data-lang="java">Java</button>
        </div>
      </div>
      <div class="content-area" id="content-area"></div>
    </main>
  `;
  buildNav();
  showWelcome();
  bindEvents();
}

function buildNav() {
  const nav = document.getElementById('sidebar-nav');
  nav.innerHTML = categories.map((cat, ci) => `
    <div class="nav-category" data-cat="${ci}">
      <button class="nav-category-btn" data-cat="${ci}">
        <span class="material-icons-round">${cat.icon}</span>
        ${cat.name}
        <span class="material-icons-round chevron">chevron_right</span>
      </button>
      <div class="nav-items" id="nav-items-${ci}">
        ${cat.patterns.map((p, pi) => `
          <button class="nav-item" data-cat="${ci}" data-pat="${pi}">${p.title}</button>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function showWelcome() {
  const totalPatterns = categories.reduce((s, c) => s + c.patterns.length, 0);
  const totalProblems = categories.reduce((s, c) => s + c.patterns.reduce((ps, p) => ps + (p.problems ? p.problems.length : 0), 0), 0);
  document.getElementById('content-area').innerHTML = `
    <div class="welcome">
      <span class="material-icons-round welcome-icon">school</span>
      <h1>DSA Mastery Notes</h1>
      <p>Your complete technical interview preparation guide covering every pattern used in FAANG interviews, competitive programming, and online assessments.</p>
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-number">${categories.length}</div><div class="stat-label">Categories</div></div>
        <div class="stat-card"><div class="stat-number">${totalPatterns}</div><div class="stat-label">Patterns</div></div>
        <div class="stat-card"><div class="stat-number">${totalProblems}+</div><div class="stat-label">Problems</div></div>
      </div>
      <p class="shortcut-hint">Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to search &nbsp;|&nbsp; Select a pattern from the sidebar to begin</p>
    </div>
  `;
}

function showPattern(ci, pi) {
  state.activeCategory = ci;
  state.activePattern = pi;
  const cat = categories[ci];
  const pattern = cat.patterns[pi];

  document.getElementById('breadcrumb').innerHTML = `
    <span class="material-icons-round" style="font-size:18px">${cat.icon}</span>
    <span>›</span> ${cat.name} <span>›</span> <strong>${pattern.title}</strong>
  `;

  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  document.querySelector(`.nav-item[data-cat="${ci}"][data-pat="${pi}"]`)?.classList.add('active');

  const contentArea = document.getElementById('content-area');
  contentArea.scrollTop = 0;
  contentArea.innerHTML = renderPattern(pattern, state.lang);

  // Highlight code
  contentArea.querySelectorAll('pre code').forEach(block => hljs.highlightElement(block));

  // Section toggles
  contentArea.querySelectorAll('.section-header').forEach(header => {
    header.addEventListener('click', () => {
      header.parentElement.classList.toggle('open');
    });
  });

  // Code tabs
  contentArea.querySelectorAll('.code-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const wrapper = tab.closest('.code-block-wrapper');
      wrapper.querySelectorAll('.code-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const lang = tab.dataset.lang;
      wrapper.querySelectorAll('.code-panel').forEach(p => p.style.display = 'none');
      const panel = wrapper.querySelector(`.code-panel[data-lang="${lang}"]`);
      if (panel) {
        panel.style.display = 'block';
        panel.querySelectorAll('pre code').forEach(block => {
          if (!block.dataset.highlighted) {
            hljs.highlightElement(block);
            block.dataset.highlighted = '1';
          }
        });
      }
    });
  });

  // Copy buttons
  contentArea.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrapper = btn.closest('.code-block-wrapper');
      const activePanel = wrapper.querySelector('.code-panel[style*="block"]') || wrapper.querySelector('.code-panel');
      const code = activePanel?.querySelector('code')?.textContent || '';
      navigator.clipboard.writeText(code);
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy', 1500);
    });
  });
}

function bindEvents() {
  // Category toggles
  document.querySelectorAll('.nav-category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const ci = btn.dataset.cat;
      btn.classList.toggle('expanded');
      document.getElementById(`nav-items-${ci}`).classList.toggle('open');
    });
  });

  // Pattern clicks
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      showPattern(parseInt(btn.dataset.cat), parseInt(btn.dataset.pat));
      // Close sidebar on mobile
      document.getElementById('sidebar').classList.remove('open');
      document.getElementById('overlay').classList.remove('visible');
    });
  });

  // Lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.lang = btn.dataset.lang;
      if (state.activeCategory !== null) {
        showPattern(state.activeCategory, state.activePattern);
      }
    });
  });

  // Mobile toggle
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('overlay').classList.toggle('visible');
  });
  document.getElementById('overlay')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('visible');
  });

  // Search
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.nav-category').forEach(cat => {
      const items = cat.querySelectorAll('.nav-item');
      let hasMatch = false;
      items.forEach(item => {
        const match = item.textContent.toLowerCase().includes(q);
        item.style.display = match ? '' : 'none';
        if (match) hasMatch = true;
      });
      cat.style.display = hasMatch || q === '' ? '' : 'none';
      if (q && hasMatch) {
        cat.querySelector('.nav-category-btn')?.classList.add('expanded');
        cat.querySelector('.nav-items')?.classList.add('open');
      }
    });
  });

  // Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });
}

buildApp();
