export const stringPatterns = [
  {
    title: 'KMP Algorithm',
    tc: 'O(n+m)', sc: 'O(m)',
    concept: `<p><strong>KMP</strong> finds pattern in text in O(n+m) by precomputing a failure/LPS array that avoids redundant comparisons.</p>
<p><em>lps[i]</em> = length of longest proper prefix of pattern[0..i] which is also a suffix.</p>`,
    recognition: `<ul><li><strong>"find substring/pattern in string"</strong></li>
<li><strong>"repeated substring pattern"</strong></li></ul>`,
    code: {
      cpp: `vector<int> buildLPS(string& pat) {
    int m = pat.size();
    vector<int> lps(m, 0);
    int len = 0, i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) { lps[i++] = ++len; }
        else if (len) { len = lps[len - 1]; }
        else { lps[i++] = 0; }
    }
    return lps;
}
int kmpSearch(string& text, string& pat) {
    auto lps = buildLPS(pat);
    int i = 0, j = 0;
    while (i < text.size()) {
        if (text[i] == pat[j]) { i++; j++; }
        if (j == pat.size()) return i - j; // found
        else if (i < text.size() && text[i] != pat[j]) {
            if (j) j = lps[j - 1]; else i++;
        }
    }
    return -1;
}`,
      python: `def build_lps(pat):
    m = len(pat)
    lps = [0] * m
    length, i = 0, 1
    while i < m:
        if pat[i] == pat[length]:
            length += 1; lps[i] = length; i += 1
        elif length:
            length = lps[length - 1]
        else:
            lps[i] = 0; i += 1
    return lps

def kmp_search(text, pat):
    lps = build_lps(pat)
    i = j = 0
    while i < len(text):
        if text[i] == pat[j]: i += 1; j += 1
        if j == len(pat): return i - j
        elif i < len(text) and text[i] != pat[j]:
            j = lps[j-1] if j else 0
            if not j and text[i] != pat[0]: i += 1
    return -1`,
      java: `int[] buildLPS(String pat) {
    int m = pat.length();
    int[] lps = new int[m];
    int len = 0, i = 1;
    while (i < m) {
        if (pat.charAt(i) == pat.charAt(len)) lps[i++] = ++len;
        else if (len > 0) len = lps[len-1];
        else lps[i++] = 0;
    }
    return lps;
}`
    },
    problems: [
      { name: 'Find Index of First Occurrence', diff: 'Easy', url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/' },
      { name: 'Repeated Substring Pattern', diff: 'Easy', url: 'https://leetcode.com/problems/repeated-substring-pattern/' },
      { name: 'Shortest Palindrome', diff: 'Hard', url: 'https://leetcode.com/problems/shortest-palindrome/' },
    ]
  },
  {
    title: 'Rabin-Karp / Rolling Hash',
    tc: 'O(n) avg', sc: 'O(1)',
    concept: `<p>Use a <strong>rolling hash</strong> to compute pattern hash in O(1) per shift. Compare hashes instead of characters. Handle collisions by verifying matches.</p>`,
    recognition: `<ul><li><strong>"find repeated DNA sequences"</strong></li>
<li><strong>"longest duplicate substring"</strong></li></ul>`,
    code: {
      cpp: `// Rolling hash
const long long MOD = 1e9 + 7, BASE = 31;
long long hash_str(string& s, int len) {
    long long h = 0, p = 1;
    for (int i = 0; i < len; i++) {
        h = (h + (s[i] - 'a' + 1) * p) % MOD;
        p = p * BASE % MOD;
    }
    return h;
}`,
      python: `MOD = 10**18 + 9
BASE = 31
def rolling_hash(s, length):
    h, p = 0, 1
    for i in range(length):
        h = (h + (ord(s[i]) - ord('a') + 1) * p) % MOD
        p = p * BASE % MOD
    return h`,
      java: `static final long MOD = (long)1e9 + 7, BASE = 31;
long hashStr(String s, int len) {
    long h = 0, p = 1;
    for (int i = 0; i < len; i++) {
        h = (h + (s.charAt(i) - 'a' + 1) * p) % MOD;
        p = p * BASE % MOD;
    }
    return h;
}`
    },
    problems: [
      { name: 'Repeated DNA Sequences', diff: 'Medium', url: 'https://leetcode.com/problems/repeated-dna-sequences/' },
      { name: 'Longest Duplicate Substring', diff: 'Hard', url: 'https://leetcode.com/problems/longest-duplicate-substring/' },
    ]
  },
];
