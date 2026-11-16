let list = [];
const addButton = document.querySelector('#addButton');
const listLi = document.querySelector('.list ol');
const bodyEl = document.body;

listLi.innerHTML = '';
addButton.addEventListener('click', () => addItem());

bodyEl.addEventListener('keydown', (e) => {
    if(e.key == 'Enter') addButton.click();

});

function addItem() {
   let inputTexto = document.querySelector('input[type="text"]');
   if(inputTexto.value != '') {
    list.push({name:inputTexto.value, done:false})
    inputTexto.value = '';
    MontarLista(list);
    // Montar minha lista no HTML
   } else {
    alert('Não é possivel adicionar tarefa')
   }
}

function MontarLista() {
    listLi.innerHTML = '';
    list.forEach((item, index) => {
      listLi.appendChild(MontarHTML(item, index));
    });
    
    SelecionarAcoes()
    SelecionarTick()
}

function MontarHTML(item, index){
 let LiLi = document.createElement('li');
   LiLi.dataset.index = index;

let divItem = document.createElement('div');
   divItem.classList.add('item');

let divItemList = document.createElement('div');
   divItemList.classList.add('itemList');

let inputCheckboxEl = document.createElement('input');
   inputCheckboxEl.type = 'checkbox';
   item.done?inputCheckboxEl.setAttribute('checked', true):inputCheckboxEl.removeAttribute('checked');

let span = document.createElement('span');
    span.innerHTML = item.name;
    item.done?span.classList.add('tracado'):span.classList.remove('tracado');

let divAcao = document.createElement('div');
    divAcao.classList.add('acao');

let span2 = document.createElement('span');
    span2.innerHTML = '🗑️';
    
divAcao.appendChild(span2);
divItemList.appendChild(inputCheckboxEl);
divItemList.appendChild(span);


divItem.appendChild(divItemList);
divItem.appendChild(divAcao);

LiLi.appendChild(divItem);

return LiLi;
}

function SelecionarAcoes(){
    let apagar = document.querySelectorAll('.acao span');
    apagar.forEach((item) => {
        item.addEventListener('click', (e) => {
            let liItem = e.target.parentElement.parentElement.parentElement;
            
            let i = liItem.dataset.index;
            list.splice(i, 1);
            MontarLista(list);
        })
        
    });
}

function SelecionarTick() {
    let tick = document.querySelectorAll('input[type="checkbox"]');
    tick.forEach(item => {
          item.addEventListener('change', (e) => {
            let liEle = e.target.parentElement.parentElement.parentElement;
           let i = liEle.dataset.index;
           list[i].done = !list[i].done;
           MontarLista(list);
          })

    })

}