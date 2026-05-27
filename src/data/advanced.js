export const advancedPatterns = [
  {
    title: 'Meet in the Middle',
    tc: 'O(2^(n/2))', sc: 'O(2^(n/2))',
    concept: `<p>Split input in half, enumerate all subsets of each half, then combine. Reduces O(2^n) to O(2^(n/2)).</p>`,
    recognition: `<ul><li><strong>"subset sum with n up to 40"</strong></li>
<li><strong>"closest subset sum to target"</strong></li></ul>`,
    code: {
      cpp: `// Count subsets with sum <= target (n up to 40)
// Split array in half, generate all sums for each half
// Sort one half, binary search for complement`,
      python: `# Split array into two halves
# Generate all 2^(n/2) subset sums for each half
# Sort one, binary search in the other for complement`,
      java: `// Same approach - split, enumerate, sort, binary search`
    },
    problems: [
      { name: 'Partition Equal Subset Sum', diff: 'Medium', url: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
    ]
  },
  {
    title: 'Sweep Line',
    tc: 'O(n log n)', sc: 'O(n)',
    concept: `<p>Process events sorted by coordinate. Track active intervals/segments. Common for interval overlap counting, rectangle area/perimeter.</p>`,
    recognition: `<ul><li><strong>"maximum overlap at any point"</strong></li>
<li><strong>"skyline problem"</strong></li>
<li><strong>"rectangle area union"</strong></li></ul>`,
    code: {
      cpp: `// Max overlapping intervals
int maxOverlap(vector<vector<int>>& intervals) {
    vector<pair<int,int>> events;
    for (auto& iv : intervals) {
        events.push_back({iv[0], 1});   // start
        events.push_back({iv[1], -1});  // end
    }
    sort(events.begin(), events.end());
    int curr = 0, maxOvl = 0;
    for (auto& [pos, type] : events) {
        curr += type;
        maxOvl = max(maxOvl, curr);
    }
    return maxOvl;
}`,
      python: `def maxOverlap(intervals):
    events = []
    for s, e in intervals:
        events.append((s, 1))
        events.append((e, -1))
    events.sort()
    curr = max_ovl = 0
    for pos, typ in events:
        curr += typ
        max_ovl = max(max_ovl, curr)
    return max_ovl`,
      java: `int maxOverlap(int[][] intervals) {
    List<int[]> events = new ArrayList<>();
    for (int[] iv : intervals) {
        events.add(new int[]{iv[0], 1});
        events.add(new int[]{iv[1], -1});
    }
    events.sort((a,b) -> a[0]!=b[0] ? a[0]-b[0] : a[1]-b[1]);
    int curr = 0, max = 0;
    for (int[] e : events) {
        curr += e[1];
        max = Math.max(max, curr);
    }
    return max;
}`
    },
    problems: [
      { name: 'Meeting Rooms II', diff: 'Medium', url: 'https://leetcode.com/problems/meeting-rooms-ii/' },
      { name: 'The Skyline Problem', diff: 'Hard', url: 'https://leetcode.com/problems/the-skyline-problem/' },
    ]
  },
  {
    title: 'Sparse Table',
    tc: 'O(n log n) build, O(1) query', sc: 'O(n log n)',
    concept: `<p><strong>Sparse Table</strong> answers idempotent range queries (min, max, GCD) in O(1) after O(n log n) preprocessing. No updates supported.</p>`,
    recognition: `<ul><li><strong>"static range min/max queries"</strong></li><li><strong>"RMQ without updates"</strong></li></ul>`,
    code: {
      cpp: `// Sparse Table for Range Min Query
int st[MAXN][LOG]; // st[i][j] = min of range [i, i + 2^j - 1]
void build(vector<int>& a) {
    int n = a.size();
    for (int i = 0; i < n; i++) st[i][0] = a[i];
    for (int j = 1; (1 << j) <= n; j++)
        for (int i = 0; i + (1 << j) <= n; i++)
            st[i][j] = min(st[i][j-1], st[i + (1 << (j-1))][j-1]);
}
int query(int l, int r) {
    int k = __lg(r - l + 1);
    return min(st[l][k], st[r - (1 << k) + 1][k]);
}`,
      python: `import math
def build_sparse(a):
    n = len(a)
    LOG = int(math.log2(n)) + 1
    st = [[0]*LOG for _ in range(n)]
    for i in range(n): st[i][0] = a[i]
    for j in range(1, LOG):
        for i in range(n - (1<<j) + 1):
            st[i][j] = min(st[i][j-1], st[i+(1<<(j-1))][j-1])
    return st

def query(st, l, r):
    k = int(math.log2(r - l + 1))
    return min(st[l][k], st[r-(1<<k)+1][k])`,
      java: `int[][] st;
void build(int[] a) {
    int n = a.length, LOG = 32 - Integer.numberOfLeadingZeros(n);
    st = new int[n][LOG];
    for (int i = 0; i < n; i++) st[i][0] = a[i];
    for (int j = 1; j < LOG; j++)
        for (int i = 0; i + (1<<j) <= n; i++)
            st[i][j] = Math.min(st[i][j-1], st[i+(1<<(j-1))][j-1]);
}`
    },
    problems: [
      { name: 'Range Min Query (CSES/SPOJ)', diff: 'Medium', url: '' },
    ]
  },
];
