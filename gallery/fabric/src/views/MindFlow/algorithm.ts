let row = 0
let rootX = 0
let rootY = 0
let vGap = 10
let hGap = 10

export function buildTree(rootNode: Record<string, any>, opts?: {
  vGap?: number,
  hGap?: number
}) {
  rootX = rootNode.x
  rootY = rootNode.y
  vGap = opts?.vGap
  hGap = opts?.hGap
  return new TreeNode(rootNode)
}

// 矩阵形式计算简单布局
// 思路:
// 参照表格, 将每个节点对应到一个单元格中即可
// 缺点:
// 均以首行/首列进行对齐填充, 并非居中
export class TreeNode {
  x: number = 0
  y: number = 0
  width: number = 20
  height: number = 20
  count: number = 0

  id?: unknown
  data?: Record<string, unknown>
  children: TreeNode[] = []

  parent: TreeNode | null = null

  col: number = 0
  row: number = 0

  constructor(data: Record<string, unknown>, options: Record<string, any> = {}) {
    const {
      x, y, id, children = [],
      col, width, height, parent
    } = {
      ...data, ...options
    } as this
    this.height = height ?? this.height
    this.width = width ?? this.width
    this.x = x ?? this.x
    this.y = y ?? this.y
    this.data = data
    this.col = col ?? this.col
    this.parent = parent

    // DFS
    this.children = children.map((x, i) => new TreeNode(x as any, {
      col: this.col + 1,
      // 将X, Y调换即可实现TD布局, 默认为 LR
      x: this.x + this.width + hGap,
      // 父子高度相同的情况, 如果不同, 则需要根据每行高度来定
      y: row * (this.height + vGap) + rootY,
      parent: this
    }))

    if (!this.children || !this.children.length) {
      row++
    }

    this.id = id
    this.count = this.children.length
  }

  isRoot() {
    return this.col === 0
  }

}
