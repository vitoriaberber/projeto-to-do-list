const dataCompleta = document.querySelector('.data-hora__data');
const horario = document.querySelector('.data-hora__hora');
const botaoAdicionar = document.querySelector('.adicionar__botao');
const divItens = document.querySelector('.conteudo__lista');
let ultimaData = '';
let botaoTacharTodos;

const adicionarData = new Date();
let dataFormatada = adicionarData.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
dataCompleta.innerHTML = `${dataFormatada}`;


setInterval(() => {
    const agora = new Date();
    const horarioFormatado = agora.toLocaleTimeString('pt-BR');
    horario.innerHTML = `${horarioFormatado}`;
}, 1000);

botaoAdicionar.addEventListener('click', () => {
    const inputTexto = document.querySelector('#itemAdicionado');
    if(inputTexto.value === ''){
        alert('Adicione um item');
        return
    }
    
    const agora = new Date();
    dataFormatada = agora.toLocaleDateString('pt-BR', {
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric' 
    });

    if (dataFormatada !== ultimaData) {
        ultimaData = dataFormatada;
        const dataItem = document.createElement('p');
        dataItem.classList.add('lista__dia');
        dataItem.innerHTML = `${dataFormatada}`;
        divItens.appendChild(dataItem);
    }

    const listaContainer = document.createElement('div');
    listaContainer.classList.add('lista__container');

    const containerItem = document.createElement('div');
    containerItem.classList.add('container__item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox-${Date.now()}`;
    checkbox.classList.add('item-checkbox');

    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = inputTexto.value;

    const imgLixeira = document.createElement('img');
    imgLixeira.src = 'imagem/delete.svg';
    imgLixeira.alt = 'Ícone de lixeira para deletar os itens';
    imgLixeira.classList.add('apagarItem');

    const horarioFormatado = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const horaParagrafo = document.createElement('p');
    horaParagrafo.classList.add('container__hora');
    horaParagrafo.textContent = horarioFormatado;

    checkbox.addEventListener('change', () => {
        label.classList.toggle('tachado');
        atualizarTextoBotaoTachar();
    });

    imgLixeira.addEventListener('click', () => {
        listaContainer.remove();
    
        if (!divItens.querySelector('.lista__container')) {
            const dataItem = divItens.querySelector('.lista__dia');
            if (dataItem) dataItem.remove();
            ultimaData = '';
        }
        verificarBotaoTachar();
    });

    containerItem.appendChild(checkbox);
    containerItem.appendChild(label);
    containerItem.appendChild(imgLixeira);

    listaContainer.appendChild(containerItem);
    listaContainer.appendChild(horaParagrafo);

    divItens.appendChild(listaContainer);

    inputTexto.value = '';

    verificarBotaoTachar();
})

function criarBotaoTachar() {
    if (!botaoTacharTodos) {
        botaoTacharTodos = document.createElement('button');
        botaoTacharTodos.classList.add('conteudo__tachar-todos');
        botaoTacharTodos.textContent = 'Tachar Todos';

        botaoTacharTodos.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.item-checkbox');
            const todosTachados = [...checkboxes].every(checkbox => checkbox.checked);

            checkboxes.forEach(checkbox => {
                checkbox.checked = !todosTachados;
                const label = checkbox.nextElementSibling;
                label.classList.toggle('tachado', checkbox.checked);
            });

            atualizarTextoBotaoTachar();
        });

        divItens.parentElement.appendChild(botaoTacharTodos);
    }
}

function atualizarTextoBotaoTachar() {
    if (botaoTacharTodos) {
        const checkboxes = document.querySelectorAll('.item-checkbox');
        const todosTachados = [...checkboxes].every(checkbox => checkbox.checked);
        botaoTacharTodos.textContent = todosTachados ? 'Destachar Todos' : 'Tachar Todos';
    }
}

function verificarBotaoTachar() {
    const checkboxes = document.querySelectorAll('.item-checkbox');
    if (checkboxes.length > 0) {
        criarBotaoTachar();
    } else if (botaoTacharTodos) {
        botaoTacharTodos.remove();
        botaoTacharTodos = null;
    }
}