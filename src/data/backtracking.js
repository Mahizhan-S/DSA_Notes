export const backtrackingPatterns = [
  {
    title: 'Subsets & Combinations',
    tc: 'O(2^n)', sc: 'O(n)',
    concept: `<p><strong>Backtracking</strong> explores all possibilities by making a choice, recursing, then <em>undoing</em> the choice. For subsets: include or exclude each element.</p>`,
    recognition: `<ul><li><strong>"generate all subsets"</strong></li><li><strong>"generate all combinations"</strong></li>
<li><strong>"combination sum"</strong></li><li><strong>"letter combinations of phone number"</strong></li></ul>`,
    code: {
      cpp: `// Subsets
vector<vector<int>> subsets(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> curr;
    function<void(int)> bt = [&](int i) {
        res.push_back(curr);
        for (int j = i; j < nums.size(); j++) {
            curr.push_back(nums[j]);
            bt(j + 1);
            curr.pop_back();
        }
    };
    bt(0);
    return res;
}

// Combination Sum (can reuse elements)
void combo(vector<int>& cands, int target, int start,
           vector<int>& curr, vector<vector<int>>& res) {
    if (target == 0) { res.push_back(curr); return; }
    for (int i = start; i < cands.size(); i++) {
        if (cands[i] > target) break;
        curr.push_back(cands[i]);
        combo(cands, target - cands[i], i, curr, res);
        curr.pop_back();
    }
}`,
      python: `# Subsets
def subsets(nums):
    res = []
    def bt(start, curr):
        res.append(curr[:])
        for i in range(start, len(nums)):
            curr.append(nums[i])
            bt(i + 1, curr)
            curr.pop()
    bt(0, [])
    return res

# Combination Sum
def combinationSum(candidates, target):
    res = []
    candidates.sort()
    def bt(start, curr, remain):
        if remain == 0:
            res.append(curr[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remain: break
            curr.append(candidates[i])
            bt(i, curr, remain - candidates[i])
            curr.pop()
    bt(0, [], target)
    return res`,
      java: `List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    List<Integer> curr = new ArrayList<>();
    bt(nums, 0, curr, res);
    return res;
}
void bt(int[] nums, int start, List<Integer> curr, List<List<Integer>> res) {
    res.add(new ArrayList<>(curr));
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        bt(nums, i + 1, curr, res);
        curr.remove(curr.size() - 1);
    }
}`
    },
    tips: `<ul><li>🧠 Backtracking template: <em>choose → explore → unchoose</em></li>
<li>Sort candidates to enable early termination and skip duplicates</li>
<li>To skip duplicates: <code>if (i > start && nums[i] == nums[i-1]) continue;</code></li></ul>`,
    problems: [
      { name: 'Subsets', diff: 'Medium', url: 'https://leetcode.com/problems/subsets/' },
      { name: 'Subsets II', diff: 'Medium', url: 'https://leetcode.com/problems/subsets-ii/' },
      { name: 'Combination Sum', diff: 'Medium', url: 'https://leetcode.com/problems/combination-sum/' },
      { name: 'Permutations', diff: 'Medium', url: 'https://leetcode.com/problems/permutations/' },
      { name: 'N-Queens', diff: 'Hard', url: 'https://leetcode.com/problems/n-queens/' },
      { name: 'Sudoku Solver', diff: 'Hard', url: 'https://leetcode.com/problems/sudoku-solver/' },
    ]
  },
];
