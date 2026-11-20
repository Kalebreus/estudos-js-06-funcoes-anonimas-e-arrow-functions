# 06 — Funções anônimas e arrow functions

Funções permitem organizar e reutilizar ações. Nesta aula, comparamos declarações de função, expressões de função e arrow functions, além de usar funções como callbacks.

## Declaração de função e hoisting

Uma declaração de função usa a palavra-chave `function`, seguida do nome, dos parâmetros entre parênteses e do bloco de código:

```js
saudacaoDeclarada(); // Olá! Esta é uma declaração de função.

function saudacaoDeclarada() {
  console.log("Olá! Esta é uma declaração de função.");
}
```

Nesse exemplo, a chamada pode aparecer antes da declaração porque a função já está disponível durante a execução daquele escopo. Esse comportamento é associado ao **hoisting**.

O código **não é movido fisicamente para o topo**. O ambiente prepara as declarações antes de executar as instruções do escopo.

## Expressão de função anônima

Uma função também pode ser criada como parte de uma expressão e atribuída a uma variável:

```js
// saudacaoAnonima(); // ReferenceError: acesso antes da inicialização.

const saudacaoAnonima = function () {
  console.log("Olá! Esta é uma expressão de função.");
};

saudacaoAnonima();
```

Nesse formato, não escrevemos um nome depois de `function`: é uma **expressão de função anônima**. A variável `saudacaoAnonima` permite acessar e chamar a função.

A atribuição acontece quando aquela instrução é executada. Como usamos `const`, tentar acessar a variável antes da inicialização causa `ReferenceError`. Esse período é chamado de **zona morta temporal**; o mesmo cuidado vale para `let`.

### A diferença não é apenas ter ou não ter nome

Para entender o comportamento acima, a distinção é entre **declaração de função** e **expressão de função**. Uma expressão também pode ter um nome:

```js
// saudacaoComNome(); // ReferenceError: variável ainda não inicializada.

const saudacaoComNome = function saudacaoInterna() {
  console.log("Olá! Esta é uma expressão de função com nome.");
};

saudacaoComNome();
```

Apesar do nome `saudacaoInterna`, isso continua sendo uma expressão atribuída a uma constante. Para chamar a função pelo código externo, usamos `saudacaoComNome`; o nome `saudacaoInterna` fica disponível dentro da própria função.

## Funções como callbacks

Uma **callback** é uma função passada como argumento para outro código, que poderá chamá-la. No exemplo abaixo, `setTimeout` recebe uma função anônima para executar depois:

```js
setTimeout(function () {
  console.log("Callback com função anônima.");
}, 1000);

console.log("O programa continua após agendar o callback.");
```

O valor `1000` representa um atraso solicitado de **1.000 milissegundos**, aproximadamente um segundo. Ele não garante que a função execute exatamente nesse instante: a execução pode ocorrer mais tarde, dependendo do ambiente e do restante do programa.

`setTimeout` agenda a execução e **não bloqueia o fluxo durante esse intervalo**. No exemplo, a mensagem após o agendamento aparece antes da mensagem do callback.

### Passar uma função é diferente de chamá-la

Para usar uma função já definida como callback, passe sua referência:

```js
function mostrarAviso() {
  console.log("Aviso agendado.");
}

setTimeout(mostrarAviso, 1000);

// setTimeout(mostrarAviso(), 1000);
```

Na linha comentada, os parênteses chamariam `mostrarAviso` imediatamente. O retorno dessa chamada, que é `undefined`, seria passado no lugar da função, podendo causar erro. Na linha correta, quem chama `mostrarAviso` depois é o mecanismo do temporizador.

## Arrow functions

Arrow functions usam a sintaxe `=>` e oferecem uma forma mais curta de escrever expressões de função:

```js
const saudacaoArrow = () => {
  console.log("Olá! Esta é uma arrow function.");
};

saudacaoArrow();
```

Os parênteses recebem os parâmetros; quando não há parâmetros, usamos `()`. Como a função foi atribuída a uma constante, ela deve ser chamada depois da inicialização dessa variável.

### Retorno implícito

Quando o corpo é uma expressão sem chaves, seu resultado é retornado automaticamente:

```js
const somaArrow = (num1, num2) => num1 + num2;

console.log(somaArrow(4, 2)); // 6
```

Com um único parâmetro simples, podemos omitir os parênteses:

```js
const dobro = numero => numero * 2;

console.log(dobro(4)); // 8
```

### Corpo com bloco e return

Quando usamos chaves para delimitar um bloco, escrevemos `return` para devolver o resultado:

```js
const somaComBloco = (num1, num2) => {
  return num1 + num2;
};

console.log(somaComBloco(4, 2)); // 6
```

Se esse bloco apenas calculasse `num1 + num2`, sem `return`, a função terminaria retornando `undefined`. Da mesma forma, `console.log()` exibe uma informação, mas não substitui o retorno da função.

### Arrow function como callback

O exemplo com temporizador também pode usar uma arrow function:

```js
setTimeout(() => {
  console.log("Callback com arrow function.");
}, 1000);

console.log("Esta mensagem aparece antes do callback.");
```

As duas formas servem para os exemplos de callbacks desta aula. Arrow functions, porém, possuem diferenças em outros usos: elas usam o `this` do contexto em que foram criadas, chamado de **`this` lexical**, em vez de definir um `this` próprio a cada chamada.

## Organização dos exemplos

Os trechos desta página podem ser consultados separadamente. No arquivo executável, usamos nomes diferentes, como `saudacaoDeclarada`, `saudacaoAnonima` e `saudacaoArrow`, para poder reunir os exemplos.

Não declare duas constantes com o mesmo nome no mesmo escopo: repetir `const saudacao` nesse contexto causa `SyntaxError` e impede a execução do arquivo. As chamadas que demonstrariam acesso antes da inicialização estão comentadas.

## Clonar o repositório

```bash
git clone https://github.com/Kalebreus/estudos-js-06-funcoes-anonimas-e-arrow-functions.git
cd estudos-js-06-funcoes-anonimas-e-arrow-functions
```

## Executar os exemplos

Com uma versão LTS do [Node.js](https://nodejs.org/) instalada, execute na raiz do repositório:

```bash
node exemplos.js
```

Não é necessário instalar dependências. O arquivo [exemplos.js](exemplos.js) reúne as declarações, expressões de função, arrow functions e dois temporizadores.

As mensagens síncronas aparecem primeiro. Depois, aparecem as mensagens dos callbacks agendados com `setTimeout`. Aguarde a execução desses callbacks para acompanhar a saída completa.

## Para praticar

1. Altere a mensagem de cada função de saudação e chame uma delas duas vezes.
2. Troque os argumentos de `somaArrow` e compare o resultado com `somaComBloco`.
3. Crie uma arrow function com retorno implícito para calcular o triplo de um número.
4. Altere o atraso de um temporizador para `2000` e observe as mensagens síncronas antes do callback.

[Catálogo de estudos](https://github.com/Kalebreus/reposit-rio)
