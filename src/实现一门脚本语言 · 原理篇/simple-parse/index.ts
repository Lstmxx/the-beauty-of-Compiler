import { IToken } from '../simple-lexer/type';
import { ASTNode } from './type';
import { MACHINE_STATE } from '../simple-lexer/constant';
import { AST_NODE_TYPE } from './constant';

// 语法解析：基础表达式
const primary = (tokens: IToken[]) => {
  let node: ASTNode = null;
  let token = tokens[0];
  if (token !== null) {
    if (token.type === MACHINE_STATE.NUMERIC_LITERAL) {
      token = tokens.shift();
      node = {
        val: token.text,
        valType: AST_NODE_TYPE.NUMERIC_LITERAL,
        children: [],
      };
    } else if (token.type === MACHINE_STATE.ID) {
      token = tokens.shift();
      node = {
        val: token.text,
        valType: AST_NODE_TYPE.ID,
        children: [],
      };
    } else if (token.type === MACHINE_STATE.LEFT_PAREN) {
        token = tokens.shift();
        node = additive(tokens);
        if (node !== null) {
          token = tokens[0]
          if (token !== null && token.type === MACHINE_STATE.RIGHT_PAREN) {
            tokens.shift();
          } else {
            throw new Error('expecting right parenthesis');
          }
        } else {
          throw new Error('expecting an additive expression inside parenthesis');
        }
    }
  }
  return node;
};

// 检测是否符合乘法规则
const multiplicative = (tokens: IToken[]) => {
  const child1 = primary(tokens);
  let node: ASTNode = child1;
  
  while(true) {
    let token = tokens[0];
    if (token !== null && (token.type === MACHINE_STATE.STAR || token.type === MACHINE_STATE.SLASH)) {
      token = tokens.shift();
      const child2 = multiplicative(tokens);
      if (child2 !== null) {
        node = {
          valType: AST_NODE_TYPE.MULTIPLICATIVE,
          val: token.text,
          children: [],
        };
        node.children.push(child1);
        node.children.push(child2);
      } else {
        throw new Error('invalid multiplicative expression, expecting the right part.');
      }
    } else {
      break;
    }
  }
  return node;
};

// 检测是否是符合加法规则
const additive = (tokens: IToken[]) => {
  let child1 = multiplicative(tokens)
  let node: ASTNode = child1;
  if (child1 !== null) {
    while(true) {
      let token = tokens[0];
      if (token !== null && (token.type === MACHINE_STATE.PLUS || token.type === MACHINE_STATE.MINUS)) {
        token = tokens.shift();
        const child2 = multiplicative(tokens);
        node = {
          valType: AST_NODE_TYPE.ADDITIVE,
          val: token.text,
          children: [],
        };
        node.children.push(child1);
        node.children.push(child2);
        child1 = node;
      } else {
        break;
      }
    }
  }
  return node;
};

const assignmentStatement = (tokens: IToken[]) => {
  let node: ASTNode = null;
  let token = tokens[0];
  if (token !== null && token.type === MACHINE_STATE.ID) {
    token = tokens.shift();
    node = {
      valType: AST_NODE_TYPE.ASSIGNMENT,
      val: token.text,
      children: [],
    };
    token = tokens[0];
    if (token !== null && token.type === MACHINE_STATE.ASSIGNMENT) {
      token = tokens.shift();
      const child = additive(tokens);
      if (child === null) {
        throw new Error('invalided assignment statement, expecting an expression');
      } else {
        node.children.push(child);
        token = tokens[0];
        if (token !== null && token.type === MACHINE_STATE.SEMI) {
          tokens.shift();
        } else {
          throw new Error('invalid statement, expecting semicolon');
        }
      }
    } else {
      throw new Error('');
    }
  } else {
    node = null;
  }
  return node;
};

const constDeclare = (tokens: IToken[]) => {
  let node: ASTNode = null;
  let token = tokens[0];
  if (token !== null && token.type === MACHINE_STATE.CONST) {
    token = tokens.shift();
    if (tokens[0].type === MACHINE_STATE.ID) {
      token = tokens.shift();
      node = {
        val: token.text,
        valType: AST_NODE_TYPE.CONST,
        children: [],
      };
      token = tokens[0];
      if (token !== null && token.type === MACHINE_STATE.ASSIGNMENT) {
        tokens.shift();
        const child = additive(tokens);
        if (child === null) {
          throw new Error('invalid variable initialization, expecting an expression');
        } else {
          node.children.push(child);
        }
      }
    } else {
      throw new Error('variable name expected');
    }

    if (node !== null) {
      token = tokens[0];
      if (token !== null && token.type === MACHINE_STATE.SEMI) {
        tokens.shift();
      } else {
        throw new Error('invalid statement, expecting semicolon');
      }
    }
  }
  return node;
};

export const parse = (tokens: IToken[]) => {
  let node = constDeclare(tokens);
  if (node === null) {
    node = assignmentStatement(tokens);
  }
  return node;
};
