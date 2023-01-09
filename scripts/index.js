function newLocalStorage(array) {   
    const newArrayJson = JSON.stringify(array)
    localStorage.setItem("jobsData", newArrayJson);
}

function createCard(item) {
    let li = document.createElement("li");
    li.classList.add("card");

    let span = document.createElement("span");
    span.innerText = item.title;
    li.append(span)

    let infoCard = document.createElement("div")
    infoCard.classList.add("info-card");
    li.append(infoCard)

    let enterprise = document.createElement("span");
    enterprise.innerText = item.enterprise;
    infoCard.append(enterprise);

    let location = document.createElement("span")
    location.innerText = item.location;
    infoCard.append(location);

    let descrition = document.createElement("p");
    descrition.innerText = item.descrition;
    li.append(descrition)

    let btnsCard = document.createElement("div");
    btnsCard.classList.add("button-card");
    li.append(btnsCard)

    let divbtns = document.createElement("div");
    divbtns.classList.add("button-modalities");
    btnsCard.append(divbtns);

    let modalities = document.createElement("button");
    modalities.classList.add("grey-button");
    modalities.innerText = item.modalities[0];
    divbtns.append(modalities)

    let apply = document.createElement("button");
    apply.classList.add("purple-button");
    apply.setAttribute("id", item.id)
    apply.innerText = "Candidatar"
    btnsCard.append(apply);

    return li;
}

function createAside(item) {
    let li = document.createElement("li");
    li.classList.add("card-selected");

    let div = document.createElement("div");
    div.classList.add("title-card-selected")
    li.append(div);
    
    let title = document.createElement("p");
    title.innerText = item.title;
    div.append(title);

    let trashIcon = document.createElement("img");
    trashIcon.src = "/assets/img/trash.svg";
    trashIcon.setAttribute("id", item.id)
    trashIcon.classList.add("solid", "trash" ,"icon");
    div.append(trashIcon);

    let infoCard = document.createElement("div")
    infoCard.classList.add("info-card");
    li.append(infoCard);

    let enterprise = document.createElement("span");
    enterprise.innerText = item.enterprise;
    infoCard.append(enterprise);

    let location = document.createElement("span")
    location.innerText = item.location;
    infoCard.append(location);

    let btn = document.getElementById(item.id);
    btn.innerText = "Remover Candidatura"

    return li;
}

let vagas = [];

function addApplyAndRemoveApplyFromBtn() {
    const btnsApplies = document.querySelectorAll(".purple-button");
    btnsApplies.forEach(btn => {
        btn.addEventListener("click", (event)=> {

            if(btn.id === event.target.id) {
                if(btn.textContent == "Candidatar")  { 
                    let objElement = jobsData[btn.id];
                    if(!vagas.find(objElement => objElement.id == btn.id)) {
                        vagas.push(objElement);
                    }
                    newLocalStorage(vagas);
                    renderAside(vagas);
                } else { 
                    btn.innerText = "Candidatar"; 
                    vagas = vagas.filter(candidacy => {
                        return candidacy.id != btn.id;
                    });
                    newLocalStorage(vagas);
                    renderAside(vagas);
                }               
            }
        })
    })
}

function removeApply() {
    const btnsRemove = document.querySelectorAll(".trash");
    const btnPurple = document.querySelectorAll(".purple-button");
    btnsRemove.forEach(btnRemove => {
        btnRemove.addEventListener("click", (event)=> {
        if(btnRemove.id === event.target.id) {
            btnPurple.forEach(btn => {
                if(btn.id == event.target.id) {
                    btn.innerText = "Candidatar";
                }
            })
        
            let jobs = [...jobsData];
            let objElement = jobs[btnRemove.id];
            if(vagas.find(objElement => objElement.id == btnRemove.id)) {
                vagas.splice(vagas.indexOf(objElement), 1);
            }
            newLocalStorage(vagas)
            renderAside(vagas);
        }
        })
    })
}