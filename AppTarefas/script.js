window.onload = function () {
    const botaoLogin = document.getElementById("botao-login");
    botaoLogin.onclick = function () {
      const usuario = document.getElementById("usuario").value.trim();
      const senha = document.getElementById("senha").value.trim();
  
      if (usuario === "admin" && senha === "123") {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("app-container").style.display = "block";
        document.body.style.height = "auto";
        document.body.style.justifyContent = "flex-start";
      } else {
        alert("Usuário ou senha incorretos.");
      }
    };
  };
  
  function adicionarColuna() {
    const titulo = document.getElementById("tituloColuna").value.trim();
    if (!titulo) {
      alert("Digite um título para a coluna.");
      return;
    }
  
    const quadro = document.getElementById("quadro");
  
    const colunaDiv = document.createElement("div");
    colunaDiv.className = "coluna";
  
    // Cabeçalho com título editável e botão excluir
    const cabecalhoContainer = document.createElement("div");
    cabecalhoContainer.style.display = "flex";
    cabecalhoContainer.style.justifyContent = "space-between";
    cabecalhoContainer.style.alignItems = "center";
  
    const cabecalho = document.createElement("h3");
    cabecalho.textContent = titulo;
    cabecalho.title = "Clique para editar o título da coluna";
    cabecalho.style.cursor = "pointer";
    cabecalho.onclick = () => editarTexto(cabecalho);
  
    const btnExcluirColuna = document.createElement("button");
    btnExcluirColuna.textContent = "Excluir";
    btnExcluirColuna.className = "excluir-coluna";
    btnExcluirColuna.onclick = () => {
      if (confirm("Excluir esta coluna e todas as tarefas?")) {
        colunaDiv.remove();
      }
    };
  
    cabecalhoContainer.appendChild(cabecalho);
    cabecalhoContainer.appendChild(btnExcluirColuna);
  
    colunaDiv.appendChild(cabecalhoContainer);
  
    // Container de tarefas
    const tarefasDiv = document.createElement("div");
    tarefasDiv.className = "tarefas";
    colunaDiv.appendChild(tarefasDiv);
  
    // Input e botão para nova tarefa
    const novaTarefaContainer = document.createElement("div");
    novaTarefaContainer.className = "nova-tarefa-container";
  
    const inputNovaTarefa = document.createElement("input");
    inputNovaTarefa.type = "text";
    inputNovaTarefa.placeholder = "Nova tarefa...";
    inputNovaTarefa.className = "input-nova-tarefa";
  
    const btnAddTarefa = document.createElement("button");
    btnAddTarefa.textContent = "Adicionar";
    btnAddTarefa.onclick = () => {
      const texto = inputNovaTarefa.value.trim();
      if (!texto) return alert("Digite o texto da tarefa.");
      const tarefa = criarTarefa(texto);
      tarefasDiv.appendChild(tarefa);
      inputNovaTarefa.value = "";
    };
  
    novaTarefaContainer.appendChild(inputNovaTarefa);
    novaTarefaContainer.appendChild(btnAddTarefa);
  
    colunaDiv.appendChild(novaTarefaContainer);
  
    quadro.appendChild(colunaDiv);
  
    document.getElementById("tituloColuna").value = "";
  }
  
  function criarTarefa(texto) {
    const divTarefa = document.createElement("div");
  
    // Texto da tarefa (span)
    const spanTexto = document.createElement("span");
    spanTexto.className = "tarefa-texto";
    spanTexto.textContent = texto;
    spanTexto.title = "Clique para editar a tarefa";
    spanTexto.onclick = () => editarTexto(spanTexto);
  
    // Container dos botões (div)
    const botoesDiv = document.createElement("div");
    botoesDiv.className = "tarefa-botoes";
  
    // Botões de status e excluir
    const btnAndamento = document.createElement("button");
    btnAndamento.textContent = "Andamento";
    btnAndamento.className = "status-andamento";
    btnAndamento.onclick = () => {
      divTarefa.classList.remove("finalizada");
      divTarefa.classList.add("andamento");
    };
  
    const btnFinalizada = document.createElement("button");
    btnFinalizada.textContent = "Finalizada";
    btnFinalizada.className = "status-finalizada";
    btnFinalizada.onclick = () => {
      divTarefa.classList.remove("andamento");
      divTarefa.classList.add("finalizada");
    };
  
    const btnLimpar = document.createElement("button");
    btnLimpar.textContent = "Limpar";
    btnLimpar.onclick = () => {
      divTarefa.classList.remove("andamento", "finalizada");
    };
  
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.className = "excluir-tarefa";
    btnExcluir.onclick = () => {
      if (confirm("Excluir esta tarefa?")) {
        divTarefa.remove();
      }
    };
  
    botoesDiv.append(btnAndamento, btnFinalizada, btnLimpar, btnExcluir);
  
    divTarefa.appendChild(spanTexto);
    divTarefa.appendChild(botoesDiv);
  
    return divTarefa;
  }
  
  function editarTexto(elemento) {
    const textoOriginal = elemento.textContent;
    const inputEdicao = document.createElement("input");
    inputEdicao.type = "text";
    inputEdicao.value = textoOriginal;
    inputEdicao.style.width = "100%";
  
    elemento.replaceWith(inputEdicao);
    inputEdicao.focus();
  
    inputEdicao.onblur = () => {
      if (inputEdicao.value.trim() === "") {
        alert("Texto não pode ficar vazio!");
        inputEdicao.focus();
        return;
      }
      elemento.textContent = inputEdicao.value.trim();
      inputEdicao.replaceWith(elemento);
    };
  
    inputEdicao.onkeydown = (e) => {
      if (e.key === "Enter") {
        inputEdicao.blur();
      } else if (e.key === "Escape") {
        inputEdicao.value = textoOriginal;
        inputEdicao.blur();
      }
    };
  }
  