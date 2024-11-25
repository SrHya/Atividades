// - Evento drag

// O evento `drag` ocorre quando um elemento, é `arrastado` pelo usuário. Ele é `disparado` no elemento que está sendo arrastado. Para habilitar o `arrastar` de um elemento, é necessário definir o atributo `draggable`, como `true` para esse elemento. Além disso, é necessário adicionar um `ouvinte de evento`, para o evento `dragstart` no elemento arrastado, que define os dados a serem `transferidos` durante o arrastar, utilizando o método `setData` do objeto `dataTransfer`

// <br>

// - Evento drop

// O evento `drop` ocorre quando um elemento arrastado, é `solto` em um alvo `válido`. Ele é `disparado` no elemento de destino, onde o `elemento arrastado` está sendo `solto`. Para `permitir` que um elemento seja `solto` em um `alvo`, é necessário adicionar um `ouvinte de evento`, para o evento `dragover` no elemento de destino e, dentro desse ouvinte, chamar o método `preventDefault()` para permitir que o elemento seja solto. Além disso, é necessário adicionar um ouvinte de evento para o evento `drop` no elemento de destino, onde a `lógica` para manipular os `dados transferidos` é implementada.

// Inicializa eventos no carregamento da página
function init() {
  const novoDiv = document.getElementById("novo");
  const containers = document.querySelectorAll(".container");

  // Adicionar funcionalidade ao drag-and-drop para elementos existentes
  novoDiv.querySelectorAll(".caixinha").forEach((caixinha) => {
    caixinha.setAttribute("draggable", "true");
    caixinha.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", caixinha.className);
    });
  });

  // Habilitar drag-and-drop nos containers
  containers.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    container.addEventListener("drop", (e) => {
      e.preventDefault();
      const className = e.dataTransfer.getData("text/plain");
      const newElement = document.createElement("div");
      newElement.className = className;
      newElement.setAttribute("draggable", "true");
      container.appendChild(newElement);

      newElement.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", newElement.className);
      });
    });
  });

  // Botão para criar novas caixinhas
  const criarBotao = document.createElement("button");
  criarBotao.id = "criar";
  criarBotao.innerText = "Criar Nova Caixinha";

  novoDiv.appendChild(criarBotao);

  document.addEventListener("click", (e) => {
    if (e.target.id === "criar") {
      const cores = ["corVerde", "corRoxa", "corLaranja", "corVermelha"];
      const novaCaixinha = document.createElement("div");
      novaCaixinha.className = `caixinha ${
        cores[Math.floor(Math.random() * cores.length)]
      }`;
      novaCaixinha.setAttribute("draggable", "true");
      novoDiv.appendChild(novaCaixinha);

      novaCaixinha.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", novaCaixinha.className);
      });
    }
  });

  // Criar lista de estados dinamicamente
  const listaDiv = document.createElement("div");
  const listaTitulo = document.createElement("h3");
  listaTitulo.innerText = "Lista de Estados";

  const lista = document.createElement("ul");
  lista.id = "lista";

  const estados = ["Acre", "Bahia", "Ceará"];
  estados.forEach((estado) => {
    const li = document.createElement("li");
    li.innerText = estado;
    lista.appendChild(li);
  });

  listaDiv.appendChild(listaTitulo);
  listaDiv.appendChild(lista);
  document.body.appendChild(listaDiv);

  // Modificar item da lista "Acre" ao clicar
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "LI" && e.target.textContent === "Acre") {
      e.target.innerText = "Amapá";
      e.target.style.backgroundColor = "blue";
    }
  });

  // Input para alterar conteúdo do span
  const inputDiv = document.createElement("div");
  const inputTitulo = document.createElement("h3");
  inputTitulo.innerText = "Input e Alteração de Conteúdo";

  const inputTexto = document.createElement("input");
  inputTexto.id = "texto";
  inputTexto.type = "text";
  inputTexto.placeholder = "Digite algo e pressione Enter";

  const resultado = document.createElement("p");
  resultado.innerHTML = `Resultado: <span id="nome"></span>`;

  inputDiv.appendChild(inputTitulo);
  inputDiv.appendChild(inputTexto);
  inputDiv.appendChild(resultado);
  document.body.appendChild(inputDiv);

  document.addEventListener("keydown", (e) => {
    if (e.target.id === "texto" && e.key === "Enter") {
      const input = e.target;
      const span = document.getElementById("nome");
      span.innerText = input.value;
      input.value = "";
    }
  });
}

// Inicializa o script no carregamento da página
document.addEventListener("DOMContentLoaded", init);
