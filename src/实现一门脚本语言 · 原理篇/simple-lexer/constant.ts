// 有限状态机枚举
export enum MACHINE_STATE {
  // 初始状态
  INITIAL = 'initial',
  // 标识符状态
  ID = 'id',
  // 数字字面量
  NUMERIC_LITERAL = 'numeric_literal',
  // 大于操作符
  GT = 'gt',
  // 大于等于操作符
  GE = 'ge',
  // 赋值操作符
  ASSIGNMENT = 'assignment',
  // const 关键字
  CONST = 'const',
  // 加法
  PLUS = 'plus',
  // 减法
  MINUS = 'minus',
  // 乘法
  STAR = 'star',
  // 除法
  SLASH = 'slash',
  // 分号
  SEMI = 'semi',
  // 左括号
  LEFT_PAREN = 'left_paren',
  // 右括号
  RIGHT_PAREN = 'RIGHT_PAREN',
};

// token正则
export const tokenReg = {
  ID: /[a-zA-Z_]([a-zA-Z_] | [0-9])*/,
  NUMERIC_LITERAL: /[0-9]+/,
  GT: '>',
  ASSIGNMENT: '=',
  PLUS: '+',
  MINUS: '-',
  STAR: '*',
  SLASH: '/',
  SEMI: ';',
  LEFT_PAREN: '(',
  RIGHT_PAREN: ')',
};
