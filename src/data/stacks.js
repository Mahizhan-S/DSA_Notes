export const stackPatterns = [
  {
    title: 'Monotonic Stack',
    tc: 'O(n)', sc: 'O(n)',
    concept: `<p>A <strong>Monotonic Stack</strong> maintains elements in sorted order (increasing or decreasing). Used to find next/previous greater/smaller element in O(n).</p>
<ul><li><strong>Increasing stack:</strong> finds next greater element</li>
<li><strong>Decreasing stack:</strong> finds next smaller element</li></ul>`,
    recognition: `<ul><li><strong>"next greater element"</strong> → Monotonic decreasing stack</li>
<li><strong>"previous smaller element"</strong> → Monotonic increasing stack</li>
<li><strong>"largest rectangle in histogram"</strong></li>
<li><strong>"stock span problem"</strong></li>
<li><strong>"daily temperatures"</strong></li></ul>`,
    code: {
      cpp: `// Next Greater Element
vector<int> nge(n, -1);
stack<int> st; // stores indices
for (int i = 0; i < n; i++) {
    while (!st.empty() && arr[st.top()] < arr[i]) {
        nge[st.top()] = arr[i];
        st.pop();
    }
    st.push(i);
}

// Largest Rectangle in Histogram
int maxArea = 0;
stack<int> st;
for (int i = 0; i <= n; i++) {
    int h = (i == n) ? 0 : heights[i];
    while (!st.empty() && heights[st.top()] > h) {
        int height = heights[st.top()]; st.pop();
        int width = st.empty() ? i : i - st.top() - 1;
        maxArea = max(maxArea, height * width);
    }
    st.push(i);
}`,
      python: `# Next Greater Element
nge = [-1] * n
stack = []
for i in range(n):
    while stack and arr[stack[-1]] < arr[i]:
        nge[stack.pop()] = arr[i]
    stack.append(i)

# Largest Rectangle in Histogram
max_area = 0
stack = []
for i in range(len(heights) + 1):
    h = heights[i] if i < len(heights) else 0
    while stack and heights[stack[-1]] > h:
        height = heights[stack.pop()]
        width = i if not stack else i - stack[-1] - 1
        max_area = max(max_area, height * width)
    stack.append(i)`,
      java: `int[] nge = new int[n];
Arrays.fill(nge, -1);
Deque<Integer> st = new ArrayDeque<>();
for (int i = 0; i < n; i++) {
    while (!st.isEmpty() && arr[st.peek()] < arr[i])
        nge[st.pop()] = arr[i];
    st.push(i);
}`
    },
    tips: `<ul><li>🧠 Think: "who does this element eliminate?" — that's the stack's job</li>
<li>Adding a sentinel (0 at end) simplifies histogram problems</li></ul>`,
    problems: [
      { name: 'Daily Temperatures', diff: 'Medium', url: 'https://leetcode.com/problems/daily-temperatures/' },
      { name: 'Next Greater Element I', diff: 'Easy', url: 'https://leetcode.com/problems/next-greater-element-i/' },
      { name: 'Online Stock Span', diff: 'Medium', url: 'https://leetcode.com/problems/online-stock-span/' },
      { name: 'Largest Rectangle in Histogram', diff: 'Hard', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
      { name: 'Maximal Rectangle', diff: 'Hard', url: 'https://leetcode.com/problems/maximal-rectangle/' },
    ]
  },
  {
    title: 'Parentheses / Expression',
    tc: 'O(n)', sc: 'O(n)',
    concept: `<p>Stack naturally handles <strong>matching brackets</strong> and <strong>expression evaluation</strong>. Push opening brackets/operands, pop on closing/operators.</p>`,
    recognition: `<ul><li><strong>"valid parentheses"</strong></li><li><strong>"evaluate expression"</strong></li><li><strong>"decode string"</strong></li></ul>`,
    code: {
      cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c==')' && top!='(') || (c=='}' && top!='{') || (c==']' && top!='['))
                return false;
        }
    }
    return st.empty();
}`,
      python: `def isValid(s):
    stack = []
    pairs = {')':'(', '}':'{', ']':'['}
    for c in s:
        if c in '({[': stack.append(c)
        elif not stack or stack.pop() != pairs[c]: return False
    return not stack`,
      java: `boolean isValid(String s) {
    Deque<Character> st = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(') st.push(')');
        else if (c == '{') st.push('}');
        else if (c == '[') st.push(']');
        else if (st.isEmpty() || st.pop() != c) return false;
    }
    return st.isEmpty();
}`
    },
    problems: [
      { name: 'Valid Parentheses', diff: 'Easy', url: 'https://leetcode.com/problems/valid-parentheses/' },
      { name: 'Decode String', diff: 'Medium', url: 'https://leetcode.com/problems/decode-string/' },
      { name: 'Basic Calculator', diff: 'Hard', url: 'https://leetcode.com/problems/basic-calculator/' },
    ]
  },
];
