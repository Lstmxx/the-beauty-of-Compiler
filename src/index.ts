import { lexer } from './实现一门脚本语言 · 原理篇/simple-lexer/index';
import { parse } from './实现一门脚本语言 · 原理篇/simple-parse/index';
import { evaluateNode } from './实现一门脚本语言 · 原理篇/simple-script/index';

// 测试
const sentences = ['const a = 2;', 'const age = 45 + a * 3;'];
sentences.forEach(sentence => {
  console.log('sentence', sentence);
  const tokens = lexer(sentence);
  console.log('tokens: ', tokens);
  const astNode = parse(tokens);
  console.log('astNode: ', astNode);
  const result = evaluateNode(astNode);
  console.log('result: ', result);
});
