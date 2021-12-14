import { ASTNode } from '../simple-parse/type.d';
import { AST_NODE_TYPE } from '../simple-parse/constant';

const variables = new Map<string, number | string>();

const getVariable = (key: string) => {
  if (variables.has(key)) {
    const value = variables.get(key);
    if (value !== null) {
      return value;
    } else {
      throw new Error(`variable ${key} has not been set any value`);
    }
  } else {
    throw new Error(`unknown variable: ${key}`);
  }
};

const setVariable = (key: string, value: any) => {
  if (variables.has(key)) {
    throw new Error(`variable ${key} already exist`);
  } else {
    variables.set(key, value);
  }
};

export const evaluateNode = (node: ASTNode) => {
  let result: any = null;
  switch (node.valType) {
    case AST_NODE_TYPE.ID:
      result = getVariable(node.val);
      break;
    case AST_NODE_TYPE.NUMERIC_LITERAL:
      result = Number(node.val);
      break;
    case AST_NODE_TYPE.CONST:
      setVariable(node.val, evaluateNode(node.children[0]))
      result = getVariable(node.val);
      break;
    case AST_NODE_TYPE.ADDITIVE:
      result = 0;
      node.children.forEach(child => {
        if (child.valType === AST_NODE_TYPE.NUMERIC_LITERAL) {
          result += Number(child.val);
        } else {
          result += Number(evaluateNode(child));
        }
      });
      break;
    case AST_NODE_TYPE.MULTIPLICATIVE:
      result = 1;
      node.children.forEach(child => {
        if (child.valType === AST_NODE_TYPE.NUMERIC_LITERAL) {
          result *= Number(child.val);
        } else {
          result *= Number(evaluateNode(child));
        }
      });
      break;
    default:
      break;
  }
  return result;
}
