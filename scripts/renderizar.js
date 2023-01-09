
function renderCards(array) {
    const ul = document.querySelector(".cards");

    array.map(element => {
        ul.append(createCard(element));
    })
    addApplyAndRemoveApplyFromBtn();
    renderAside(vagas);
}

function renderAside(array) {
    const ul = document.querySelector(".cards-selected");
    const message = document.querySelector(".none-selected");
    ul.innerHTML = "";
    if(array.length > 0) {
        array.map(element => {
            ul.append(createAside(element));
        })
        message.style.display = "none";
        removeApply();
    } else { 
        message.style.display = "block";
    }
}

function getJobsData() {
    const jobsDataJSON = localStorage.getItem('jobsData')
  
    if(jobsDataJSON) {
        const dataInLocalStorage = JSON.parse(jobsDataJSON)   
        vagas = dataInLocalStorage;
    } 
    renderCards(jobsData);
}

getJobsData();