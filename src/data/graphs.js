export const graphPatterns = [
  {
    title: 'Graph BFS & DFS',
    tc: 'O(V+E)', sc: 'O(V)',
    concept: `<p><strong>BFS</strong> for shortest path (unweighted), level-by-level. <strong>DFS</strong> for connectivity, cycle detection, topological sort.</p>`,
    recognition: `<ul><li><strong>"number of islands"</strong> → BFS/DFS flood fill</li>
<li><strong>"shortest path unweighted"</strong> → BFS</li>
<li><strong>"connected components"</strong> → DFS/BFS/Union-Find</li></ul>`,
    code: {
      cpp: `// DFS - connected components
void dfs(int node, vector<vector<int>>& adj, vector<bool>& vis) {
    vis[node] = true;
    for (int next : adj[node])
        if (!vis[next]) dfs(next, adj, vis);
}

// Number of islands (grid BFS)
int numIslands(vector<vector<char>>& grid) {
    int m = grid.size(), n = grid[0].size(), count = 0;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) {
        if (grid[i][j] == '1') {
            count++;
            queue<pair<int,int>> q;
            q.push({i,j}); grid[i][j] = '0';
            while (!q.empty()) {
                auto [x,y] = q.front(); q.pop();
                for (int d = 0; d < 4; d++) {
                    int nx = x+dx[d], ny = y+dy[d];
                    if (nx>=0 && nx<m && ny>=0 && ny<n && grid[nx][ny]=='1') {
                        grid[nx][ny] = '0';
                        q.push({nx,ny});
                    }
                }
            }
        }
    }
    return count;
}`,
      python: `from collections import deque
def numIslands(grid):
    m, n, count = len(grid), len(grid[0]), 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                q = deque([(i, j)])
                grid[i][j] = '0'
                while q:
                    x, y = q.popleft()
                    for dx, dy in [(0,1),(0,-1),(1,0),(-1,0)]:
                        nx, ny = x+dx, y+dy
                        if 0<=nx<m and 0<=ny<n and grid[nx][ny]=='1':
                            grid[nx][ny] = '0'
                            q.append((nx, ny))
    return count`,
      java: `int numIslands(char[][] grid) {
    int m = grid.length, n = grid[0].length, count = 0;
    int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) {
        if (grid[i][j] == '1') {
            count++;
            Queue<int[]> q = new LinkedList<>();
            q.offer(new int[]{i,j}); grid[i][j] = '0';
            while (!q.isEmpty()) {
                int[] cell = q.poll();
                for (int[] d : dirs) {
                    int nx = cell[0]+d[0], ny = cell[1]+d[1];
                    if (nx>=0 && nx<m && ny>=0 && ny<n && grid[nx][ny]=='1') {
                        grid[nx][ny] = '0';
                        q.offer(new int[]{nx,ny});
                    }
                }
            }
        }
    }
    return count;
}`
    },
    problems: [
      { name: 'Number of Islands', diff: 'Medium', url: 'https://leetcode.com/problems/number-of-islands/' },
      { name: 'Clone Graph', diff: 'Medium', url: 'https://leetcode.com/problems/clone-graph/' },
      { name: 'Rotting Oranges', diff: 'Medium', url: 'https://leetcode.com/problems/rotting-oranges/' },
      { name: 'Word Ladder', diff: 'Hard', url: 'https://leetcode.com/problems/word-ladder/' },
    ]
  },
  {
    title: 'Topological Sort',
    tc: 'O(V+E)', sc: 'O(V)',
    concept: `<p><strong>Topological Sort</strong> orders nodes so every edge u→v has u before v. Only for <strong>DAGs</strong>. Kahn's algorithm (BFS) is most common.</p>`,
    recognition: `<ul><li><strong>"course schedule"</strong> → Topological Sort</li>
<li><strong>"task ordering with prerequisites"</strong></li>
<li><strong>"detect cycle in directed graph"</strong></li></ul>`,
    code: {
      cpp: `// Kahn's Algorithm (BFS)
vector<int> topoSort(int n, vector<vector<int>>& adj) {
    vector<int> indeg(n, 0);
    for (int u = 0; u < n; u++)
        for (int v : adj[u]) indeg[v]++;
    queue<int> q;
    for (int i = 0; i < n; i++)
        if (indeg[i] == 0) q.push(i);
    vector<int> order;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        order.push_back(u);
        for (int v : adj[u])
            if (--indeg[v] == 0) q.push(v);
    }
    return order.size() == n ? order : vector<int>(); // empty = cycle
}`,
      python: `from collections import deque
def topoSort(n, adj):
    indeg = [0] * n
    for u in range(n):
        for v in adj[u]: indeg[v] += 1
    q = deque(i for i in range(n) if indeg[i] == 0)
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0: q.append(v)
    return order if len(order) == n else []`,
      java: `List<Integer> topoSort(int n, List<List<Integer>> adj) {
    int[] indeg = new int[n];
    for (int u = 0; u < n; u++)
        for (int v : adj.get(u)) indeg[v]++;
    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < n; i++)
        if (indeg[i] == 0) q.offer(i);
    List<Integer> order = new ArrayList<>();
    while (!q.isEmpty()) {
        int u = q.poll();
        order.add(u);
        for (int v : adj.get(u))
            if (--indeg[v] == 0) q.offer(v);
    }
    return order.size() == n ? order : new ArrayList<>();
}`
    },
    problems: [
      { name: 'Course Schedule', diff: 'Medium', url: 'https://leetcode.com/problems/course-schedule/' },
      { name: 'Course Schedule II', diff: 'Medium', url: 'https://leetcode.com/problems/course-schedule-ii/' },
      { name: 'Alien Dictionary', diff: 'Hard', url: 'https://leetcode.com/problems/alien-dictionary/' },
    ]
  },
  {
    title: 'Union Find (DSU)',
    tc: 'O(α(n)) per op', sc: 'O(n)',
    concept: `<p><strong>Disjoint Set Union</strong> tracks connected components with near-O(1) union and find using <em>path compression</em> + <em>union by rank</em>.</p>`,
    recognition: `<ul><li><strong>"connected components"</strong></li><li><strong>"detect cycle in undirected graph"</strong></li>
<li><strong>"accounts merge"</strong></li><li><strong>"redundant connection"</strong></li></ul>`,
    code: {
      cpp: `class DSU {
    vector<int> parent, rank;
public:
    DSU(int n) : parent(n), rank(n, 0) {
        iota(parent.begin(), parent.end(), 0);
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    bool unite(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (rank[a] < rank[b]) swap(a, b);
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
        return true;
    }
};`,
      python: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    def union(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b: return False
        if self.rank[a] < self.rank[b]: a, b = b, a
        self.parent[b] = a
        if self.rank[a] == self.rank[b]: self.rank[a] += 1
        return True`,
      java: `class DSU {
    int[] parent, rank;
    DSU(int n) {
        parent = new int[n]; rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }
    boolean union(int a, int b) {
        a = find(a); b = find(b);
        if (a == b) return false;
        if (rank[a] < rank[b]) { int t=a; a=b; b=t; }
        parent[b] = a;
        if (rank[a] == rank[b]) rank[a]++;
        return true;
    }
}`
    },
    problems: [
      { name: 'Number of Provinces', diff: 'Medium', url: 'https://leetcode.com/problems/number-of-provinces/' },
      { name: 'Redundant Connection', diff: 'Medium', url: 'https://leetcode.com/problems/redundant-connection/' },
      { name: 'Accounts Merge', diff: 'Medium', url: 'https://leetcode.com/problems/accounts-merge/' },
    ]
  },
  {
    title: 'Dijkstra\'s Algorithm',
    tc: 'O((V+E) log V)', sc: 'O(V)',
    concept: `<p><strong>Dijkstra</strong> finds shortest paths from a source in a weighted graph with <strong>non-negative</strong> edges. Uses a min-heap.</p>`,
    recognition: `<ul><li><strong>"shortest path with weights"</strong></li><li><strong>"network delay time"</strong></li><li><strong>"cheapest flights"</strong></li></ul>`,
    code: {
      cpp: `vector<int> dijkstra(int src, int n, vector<vector<pair<int,int>>>& adj) {
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    dist[src] = 0; pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      python: `import heapq
def dijkstra(src, n, adj):
    dist = [float('inf')] * n
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
      java: `int[] dijkstra(int src, int n, List<List<int[]>> adj) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a,b) -> a[0]-b[0]);
    pq.offer(new int[]{0, src});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int d = top[0], u = top[1];
        if (d > dist[u]) continue;
        for (int[] e : adj.get(u)) {
            int v = e[0], w = e[1];
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}`
    },
    problems: [
      { name: 'Network Delay Time', diff: 'Medium', url: 'https://leetcode.com/problems/network-delay-time/' },
      { name: 'Path With Minimum Effort', diff: 'Medium', url: 'https://leetcode.com/problems/path-with-minimum-effort/' },
      { name: 'Cheapest Flights Within K Stops', diff: 'Medium', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
    ]
  },
];
