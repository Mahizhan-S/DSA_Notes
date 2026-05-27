export const segTreePatterns = [
  {
    title: 'Segment Tree',
    tc: 'O(log n) query/update', sc: 'O(n)',
    concept: `<p><strong>Segment Tree</strong> supports range queries and point/range updates in O(log n). Each node stores aggregate info for a range.</p>
<p>Build: O(n), Query: O(log n), Update: O(log n).</p>`,
    recognition: `<ul><li><strong>"range sum/min/max with updates"</strong></li>
<li><strong>"count of elements in range"</strong></li></ul>`,
    code: {
      cpp: `class SegTree {
    vector<int> tree;
    int n;
    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, 2*node, start, mid);
        build(arr, 2*node+1, mid+1, end);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
    void update(int node, int start, int end, int idx, int val) {
        if (start == end) { tree[node] = val; return; }
        int mid = (start + end) / 2;
        if (idx <= mid) update(2*node, start, mid, idx, val);
        else update(2*node+1, mid+1, end, idx, val);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2*node, start, mid, l, r) + query(2*node+1, mid+1, end, l, r);
    }
public:
    SegTree(vector<int>& arr) : n(arr.size()), tree(4*arr.size()) {
        build(arr, 1, 0, n-1);
    }
    void update(int idx, int val) { update(1, 0, n-1, idx, val); }
    int query(int l, int r) { return query(1, 0, n-1, l, r); }
};`,
      python: `class SegTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self._build(arr, 1, 0, self.n - 1)

    def _build(self, arr, node, s, e):
        if s == e:
            self.tree[node] = arr[s]; return
        mid = (s + e) // 2
        self._build(arr, 2*node, s, mid)
        self._build(arr, 2*node+1, mid+1, e)
        self.tree[node] = self.tree[2*node] + self.tree[2*node+1]

    def update(self, idx, val, node=1, s=0, e=None):
        if e is None: e = self.n - 1
        if s == e: self.tree[node] = val; return
        mid = (s + e) // 2
        if idx <= mid: self.update(idx, val, 2*node, s, mid)
        else: self.update(idx, val, 2*node+1, mid+1, e)
        self.tree[node] = self.tree[2*node] + self.tree[2*node+1]

    def query(self, l, r, node=1, s=0, e=None):
        if e is None: e = self.n - 1
        if r < s or e < l: return 0
        if l <= s and e <= r: return self.tree[node]
        mid = (s + e) // 2
        return self.query(l, r, 2*node, s, mid) + self.query(l, r, 2*node+1, mid+1, e)`,
      java: `class SegTree {
    int[] tree; int n;
    SegTree(int[] arr) {
        n = arr.length; tree = new int[4*n];
        build(arr, 1, 0, n-1);
    }
    void build(int[] a, int node, int s, int e) {
        if (s==e) { tree[node]=a[s]; return; }
        int mid=(s+e)/2;
        build(a,2*node,s,mid); build(a,2*node+1,mid+1,e);
        tree[node]=tree[2*node]+tree[2*node+1];
    }
    void update(int idx, int val) { update(1,0,n-1,idx,val); }
    void update(int nd, int s, int e, int idx, int val) {
        if(s==e){tree[nd]=val;return;}
        int mid=(s+e)/2;
        if(idx<=mid) update(2*nd,s,mid,idx,val);
        else update(2*nd+1,mid+1,e,idx,val);
        tree[nd]=tree[2*nd]+tree[2*nd+1];
    }
    int query(int l, int r) { return query(1,0,n-1,l,r); }
    int query(int nd, int s, int e, int l, int r) {
        if(r<s||e<l) return 0;
        if(l<=s&&e<=r) return tree[nd];
        int mid=(s+e)/2;
        return query(2*nd,s,mid,l,r)+query(2*nd+1,mid+1,e,l,r);
    }
}`
    },
    problems: [
      { name: 'Range Sum Query - Mutable', diff: 'Medium', url: 'https://leetcode.com/problems/range-sum-query-mutable/' },
      { name: 'Count of Smaller Numbers After Self', diff: 'Hard', url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' },
    ]
  },
  {
    title: 'Fenwick Tree (BIT)',
    tc: 'O(log n)', sc: 'O(n)',
    concept: `<p><strong>Binary Indexed Tree</strong> — compact alternative to segment tree for prefix sum queries and point updates. Simpler to implement.</p>`,
    code: {
      cpp: `class BIT {
    vector<int> tree;
    int n;
public:
    BIT(int n) : n(n), tree(n+1, 0) {}
    void update(int i, int delta) {
        for (++i; i <= n; i += i & (-i))
            tree[i] += delta;
    }
    int query(int i) {
        int sum = 0;
        for (++i; i > 0; i -= i & (-i))
            sum += tree[i];
        return sum;
    }
    int query(int l, int r) { return query(r) - (l > 0 ? query(l-1) : 0); }
};`,
      python: `class BIT:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)
    def update(self, i, delta):
        i += 1
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)
    def query(self, i):
        s = 0; i += 1
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s
    def range_query(self, l, r):
        return self.query(r) - (self.query(l-1) if l > 0 else 0)`,
      java: `class BIT {
    int[] tree; int n;
    BIT(int n) { this.n=n; tree=new int[n+1]; }
    void update(int i, int d) { for(++i;i<=n;i+=i&(-i)) tree[i]+=d; }
    int query(int i) { int s=0; for(++i;i>0;i-=i&(-i)) s+=tree[i]; return s; }
    int query(int l, int r) { return query(r)-(l>0?query(l-1):0); }
}`
    },
    problems: [
      { name: 'Range Sum Query - Mutable', diff: 'Medium', url: 'https://leetcode.com/problems/range-sum-query-mutable/' },
      { name: 'Count of Smaller Numbers After Self', diff: 'Hard', url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' },
    ]
  },
];
