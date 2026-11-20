// Execute na raiz do repositório:
// node exemplos.js

console.log("=== Declaração de função e hoisting ===");

// Uma declaração de função está disponível antes desta linha de declaração.
saudacaoDeclarada();

function saudacaoDeclarada() {
  console.log("Função declarada chamada antes da declaração.");
}

console.log("=== Expressão de função anônima ===");

// saudacaoAnonima(); // ReferenceError: const ainda não foi inicializada.
const saudacaoAnonima = function () {
  console.log("Seja bem-vindo, Ricardo. (função anônima)");
};

saudacaoAnonima();

console.log("=== Arrow function ===");

// saudacaoArrow(); // ReferenceError: const ainda não foi inicializada.
const saudacaoArrow = () => {
  console.log("Seja bem-vindo, Ricardo. (arrow function)");
};

saudacaoArrow();

console.log("=== Retorno implícito e retorno com bloco ===");

const somaArrow = (num1, num2) => num1 + num2;

const somaComBloco = (num1, num2) => {
  return num1 + num2;
};

// Com um único parâmetro simples, os parênteses podem ser omitidos.
const dobro = numero => numero * 2;

console.log(somaArrow(4, 2)); // 6
console.log(somaComBloco(4, 2)); // 6
console.log(dobro(4)); // 8

console.log("=== Uma expressão de função também pode ter nome ===");

// saudacaoComNome(); // ReferenceError antes da inicialização da const.
const saudacaoComNome = function saudacaoInterna() {
  console.log("Ter um nome não transforma esta expressão em declaração de função.");
};

saudacaoComNome();

console.log("=== Callbacks com setTimeout ===");

// Passamos a função como argumento. O callback será executado depois.
setTimeout(function () {
  console.log("Função anônima dentro do setTimeout.");
}, 1000);

setTimeout(() => {
  console.log("Arrow function dentro do setTimeout.");
}, 1000);

// setTimeout agenda os callbacks; as instruções seguintes continuam.
console.log("Os callbacks foram agendados. Esta mensagem aparece antes deles.");
// 1000 ms não garantem o instante exato de execução; o callback pode atrasar.
