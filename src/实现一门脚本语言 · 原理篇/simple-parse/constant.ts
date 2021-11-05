export enum AST_NODE_TYPE {
  ADDITIVE = 'additive',
  ASSIGNMENT = 'assignment',
  // 数字字面量
  NUMERIC_LITERAL = 'numeric_literal',
  // 标识符状态
  ID = 'id',
  MULTIPLICATIVE = 'multiplicative',
  CONST = 'const',
}
