export const treePatterns = [
  {
    title: 'DFS Traversals',
    tc: 'O(n)', sc: 'O(h)',
    concept: `<p><strong>DFS</strong> explores as deep as possible before backtracking. Three orderings:</p>
<ul><li><strong>Preorder:</strong> Root → Left → Right (serialize, copy tree)</li>
<li><strong>Inorder:</strong> Left → Root → Right (BST gives sorted order)</li>
<li><strong>Postorder:</strong> Left → Right → Root (delete tree, evaluate)</li></ul>`,
    recognition: `<ul><li><strong>"tree traversal"</strong></li><li><strong>"path sum"</strong> → DFS with running sum</li>
<li><strong>"validate BST"</strong> → Inorder should be sorted</li></ul>`,
    code: {
      cpp: `// Recursive
void preorder(TreeNode* root) {
    if (!root) return;
    visit(root->val);
    preorder(root->left);
    preorder(root->right);
}

// Iterative Inorder
vector<int> inorder(TreeNode* root) {
    vector<int> res;
    stack<TreeNode*> st;
    TreeNode* curr = root;
    while (curr || !st.empty()) {
        while (curr) { st.push(curr); curr = curr->left; }
        curr = st.top(); st.pop();
        res.push_back(curr->val);
        curr = curr->right;
    }
    return res;
}`,
      python: `# Recursive
def preorder(root):
    if not root: return
    visit(root.val)
    preorder(root.left)
    preorder(root.right)

# Iterative Inorder
def inorder(root):
    res, stack, curr = [], [], root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        res.append(curr.val)
        curr = curr.right
    return res`,
      java: `List<Integer> inorder(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    Deque<TreeNode> st = new ArrayDeque<>();
    TreeNode curr = root;
    while (curr != null || !st.isEmpty()) {
        while (curr != null) { st.push(curr); curr = curr.left; }
        curr = st.pop();
        res.add(curr.val);
        curr = curr.right;
    }
    return res;
}`
    },
    problems: [
      { name: 'Binary Tree Inorder Traversal', diff: 'Easy', url: 'https://leetcode.com/problems/binary-tree-inorder-traversal/' },
      { name: 'Path Sum', diff: 'Easy', url: 'https://leetcode.com/problems/path-sum/' },
      { name: 'Validate BST', diff: 'Medium', url: 'https://leetcode.com/problems/validate-binary-search-tree/' },
      { name: 'Path Sum III', diff: 'Medium', url: 'https://leetcode.com/problems/path-sum-iii/' },
    ]
  },
  {
    title: 'Level Order BFS',
    tc: 'O(n)', sc: 'O(n)',
    concept: `<p>Use a <strong>queue</strong> to process nodes level by level. Track level size to separate levels.</p>`,
    code: {
      cpp: `vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> res;
    if (!root) return res;
    queue<TreeNode*> q;
    q.push(root);
    while (!q.empty()) {
        int sz = q.size();
        vector<int> level;
        for (int i = 0; i < sz; i++) {
            auto node = q.front(); q.pop();
            level.push_back(node->val);
            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }
        res.push_back(level);
    }
    return res;
}`,
      python: `from collections import deque
def levelOrder(root):
    if not root: return []
    res, q = [], deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
      java: `List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
        int sz = q.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < sz; i++) {
            TreeNode node = q.poll();
            level.add(node.val);
            if (node.left != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        res.add(level);
    }
    return res;
}`
    },
    problems: [
      { name: 'Binary Tree Level Order', diff: 'Medium', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      { name: 'Binary Tree Zigzag Level Order', diff: 'Medium', url: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/' },
      { name: 'Binary Tree Right Side View', diff: 'Medium', url: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
    ]
  },
  {
    title: 'Diameter & LCA',
    tc: 'O(n)', sc: 'O(h)',
    concept: `<p><strong>Diameter:</strong> Longest path between any two nodes = max(leftHeight + rightHeight) at each node.</p>
<p><strong>LCA:</strong> Lowest Common Ancestor — the deepest node that is ancestor of both p and q.</p>`,
    code: {
      cpp: `// Diameter
int diameter = 0;
int height(TreeNode* root) {
    if (!root) return 0;
    int l = height(root->left), r = height(root->right);
    diameter = max(diameter, l + r);
    return 1 + max(l, r);
}

// LCA
TreeNode* lca(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    auto left = lca(root->left, p, q);
    auto right = lca(root->right, p, q);
    if (left && right) return root;
    return left ? left : right;
}`,
      python: `# Diameter
def diameterOfBinaryTree(root):
    diameter = 0
    def height(node):
        nonlocal diameter
        if not node: return 0
        l, r = height(node.left), height(node.right)
        diameter = max(diameter, l + r)
        return 1 + max(l, r)
    height(root)
    return diameter

# LCA
def lca(root, p, q):
    if not root or root == p or root == q: return root
    left = lca(root.left, p, q)
    right = lca(root.right, p, q)
    if left and right: return root
    return left or right`,
      java: `int diameter = 0;
int height(TreeNode root) {
    if (root == null) return 0;
    int l = height(root.left), r = height(root.right);
    diameter = Math.max(diameter, l + r);
    return 1 + Math.max(l, r);
}

TreeNode lca(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lca(root.left, p, q);
    TreeNode right = lca(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}`
    },
    problems: [
      { name: 'Diameter of Binary Tree', diff: 'Easy', url: 'https://leetcode.com/problems/diameter-of-binary-tree/' },
      { name: 'Maximum Depth', diff: 'Easy', url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/' },
      { name: 'LCA of Binary Tree', diff: 'Medium', url: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/' },
      { name: 'Binary Tree Max Path Sum', diff: 'Hard', url: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/' },
    ]
  },
];
