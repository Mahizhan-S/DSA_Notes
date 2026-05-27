export const hashingPatterns = [
  {
    title: 'Frequency Map',
    tc: 'O(n)', sc: 'O(n)',
    concept: `<p><strong>Frequency Map</strong> counts occurrences of elements using a hash map. Foundation for many O(n) solutions.</p>`,
    recognition: `<ul><li><strong>"count occurrences"</strong> → Frequency Map</li>
<li><strong>"most frequent element"</strong></li>
<li><strong>"anagram check"</strong> → Compare frequency maps</li>
<li><strong>"group anagrams"</strong> → Sorted string as key</li></ul>`,
    code: {
      cpp: `unordered_map<int,int> freq;
for (int x : arr) freq[x]++;
// Find most frequent
int maxFreq = 0, result = 0;
for (auto& [val, cnt] : freq) {
    if (cnt > maxFreq) { maxFreq = cnt; result = val; }
}`,
      python: `from collections import Counter
freq = Counter(arr)
most_common = freq.most_common(1)[0][0]

# Group anagrams
from collections import defaultdict
groups = defaultdict(list)
for s in strs:
    groups[tuple(sorted(s))].append(s)`,
      java: `Map<Integer,Integer> freq = new HashMap<>();
for (int x : arr) freq.merge(x, 1, Integer::sum);`
    },
    problems: [
      { name: 'Two Sum', diff: 'Easy', url: 'https://leetcode.com/problems/two-sum/' },
      { name: 'Valid Anagram', diff: 'Easy', url: 'https://leetcode.com/problems/valid-anagram/' },
      { name: 'Group Anagrams', diff: 'Medium', url: 'https://leetcode.com/problems/group-anagrams/' },
      { name: 'Top K Frequent Elements', diff: 'Medium', url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
    ]
  },
  {
    title: 'HashSet Optimization',
    tc: 'O(n)', sc: 'O(n)',
    concept: `<p>Use a <strong>HashSet</strong> for O(1) lookups to replace O(n) searches. Key pattern: convert one collection to a set, then iterate the other.</p>`,
    recognition: `<ul><li><strong>"contains duplicate"</strong></li>
<li><strong>"intersection of arrays"</strong></li>
<li><strong>"longest consecutive sequence"</strong> — only start counting from sequence starts</li></ul>`,
    code: {
      cpp: `// Longest Consecutive Sequence — O(n)
unordered_set<int> s(nums.begin(), nums.end());
int maxLen = 0;
for (int x : s) {
    if (!s.count(x - 1)) { // start of sequence
        int len = 1;
        while (s.count(x + len)) len++;
        maxLen = max(maxLen, len);
    }
}`,
      python: `s = set(nums)
max_len = 0
for x in s:
    if x - 1 not in s:  # start of sequence
        length = 1
        while x + length in s: length += 1
        max_len = max(max_len, length)`,
      java: `Set<Integer> s = new HashSet<>(Arrays.asList(/* boxed */));
int maxLen = 0;
for (int x : s) {
    if (!s.contains(x - 1)) {
        int len = 1;
        while (s.contains(x + len)) len++;
        maxLen = Math.max(maxLen, len);
    }
}`
    },
    problems: [
      { name: 'Contains Duplicate', diff: 'Easy', url: 'https://leetcode.com/problems/contains-duplicate/' },
      { name: 'Longest Consecutive Sequence', diff: 'Medium', url: 'https://leetcode.com/problems/longest-consecutive-sequence/' },
      { name: 'Intersection of Two Arrays', diff: 'Easy', url: 'https://leetcode.com/problems/intersection-of-two-arrays/' },
    ]
  },
];
