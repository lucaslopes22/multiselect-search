const wrapper = document.querySelector(".wrapper"),
selectBtn = document.querySelector(".select-btn"),
searchInput = document.querySelector("input"),
listItems = document.querySelector(".list-items"),
btn = document.querySelector(".btn");

selectBtn.addEventListener("click", () => {
  wrapper.classList.toggle("active");
  searchInput.value = "";
  search();
});

searchInput.addEventListener("keyup", () => {
  search();
});

document.addEventListener("click", (event) => {
  if(!wrapper.contains(event.target) && !selectBtn.contains(event.target)) {
    wrapper.classList.remove("active");
  }
});

function states() {
  $.ajax({
    url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
    method: "GET",
    dataType: "json",
    async: false,
    success: function(data) {
      states = Array.from(data).map(item => item.nome);
    },
    error: function(error) {
      console.error(error);
    }
  });
  return states;
}

function addStates(){
  listItems.innerHTML = "";
  states().forEach(state => {
    let li = `<li class="item"><span class="checkbox"><i class="bx bx-check check-icon"></i></span><span class="item-text">${state}</span></li>`;
    listItems.insertAdjacentHTML("beforeend", li);
  });

  const items = document.querySelectorAll(".item");
  items.forEach(item => {
    item.addEventListener("click", () => {
        item.classList.toggle("checked");
  
        let checked = document.querySelectorAll(".checked"),
        btnText = document.querySelector(".select-btn span");
  
        if(checked && checked.length > 0 && checked.length < 4){
            let statesSelected = '';
            checked.forEach(check => {
              statesSelected += (statesSelected.length > 0 ? ', ' : '') + check.innerText;
            });
            btnText.innerText = statesSelected;
        }

        else if(checked && checked.length > 3){
          btnText.innerText = `${checked.length} Selecionados`;
        }

        else{
            btnText.innerText = "Selecione o Estado";
        }
    });
  });
}

function search() {
  let searchedVal = searchInput.value.toLowerCase();
  const items = document.querySelectorAll(".item");

  items.forEach(item => {
    let state = item.innerText;
    if(state.toLowerCase().includes(searchedVal)){
      item.style.display = "flex";
    }
    else{
      item.style.display = "none";
    }
  });
}

addStates();

btn.addEventListener("click", () => {
  const items = document.querySelectorAll(".item.checked");
  console.log(Array.from(items).map(item => item.innerText));
});