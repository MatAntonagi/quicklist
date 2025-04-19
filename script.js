// Selecionando elementos necessários
const form = document.getElementById('item-form');
const input = document.getElementById('newItem');
const itemListContainer = document.getElementById('item-list-container');
const alertBox = document.getElementById('alert');
const closeAlertButton = document.getElementById('close-alert'); // Selecionando o botão de fechar

newItem.addEventListener("input", () => {
    const hasNumberRegex = /\d+/g
    newItem.value = newItem.value.replace(hasNumberRegex, "")
})

// Função para criar um item na lista (com campo de quantidade)
function createItem(itemName) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item-list');

    // Criando o checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = itemName;
    checkbox.id = itemName;

    // Criando o campo de quantidade
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.placeholder = "1"
    quantityInput.value = 1; // Valor inicial da quantidade
    quantityInput.min = 1; // Impede valores negativos
    quantityInput.classList.add('quantity-input');
    quantityInput.addEventListener('change', (e) => {
        // Se necessário, você pode manipular o valor da quantidade aqui.
        console.log(`Quantidade do item "${itemName}": ${e.target.value}`);
    });

    // Criando o label
    const label = document.createElement('label');
    label.setAttribute('for', itemName);
    label.textContent = itemName;

    // Criando a parte de excluir
    const deleteDiv = document.createElement('div');
    const deleteIcon = document.createElement('img');
    deleteIcon.src = './assets/icons/recycle-bin.svg';
    deleteIcon.alt = 'Excluir';
    deleteIcon.addEventListener('click', () => removeItem(itemDiv));

    deleteDiv.appendChild(deleteIcon);

    // Adicionando os elementos no item
    itemDiv.appendChild(checkbox);
    itemDiv.appendChild(quantityInput); // Adicionando o input de quantidade
    itemDiv.appendChild(label);
    itemDiv.appendChild(deleteDiv);

    // Adicionando o item à lista
    itemListContainer.appendChild(itemDiv);
}

// Função para remover o item da lista
function removeItem(itemElement) {
    itemListContainer.removeChild(itemElement);
    showAlert();
}

// Função para mostrar o alerta
function showAlert() {
    alertBox.style.display = 'block';
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 3000);
}

// Função para esconder o alerta quando o "X" for clicado
if (closeAlertButton) {
    closeAlertButton.addEventListener('click', () => {
        alertBox.style.display = 'none';
    });
}

// Função para lidar com o envio do formulário
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const newItemName = input.value.trim();
    if (newItemName) {
        createItem(newItemName);
        input.value = ''; // Limpar o campo de input
    }
});