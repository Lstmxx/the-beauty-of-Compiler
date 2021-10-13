// 有限状态机枚举
export enum MACHINE_STATE {
  // 初始状态
  INITIAL = 'initial',
  // 标识符状态
  ID = 'id',
  // 数字字面量
  NUMERIC_LITERAL = 'int_literal',
  // 大于操作符
  GT = 'gt',
  // 大于等于操作符
  GE = 'ge',
};