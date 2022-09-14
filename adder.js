const box = document.querySelector(".container");

const getCats = function() {
    fetch("http://sb-cats.herokuapp.com/api/2/pasha2004/show")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.data.forEach(el => {
                let card = `
            <div class="card">
                <div class="img__cat" style="${el.img_link && `background-image: url(${el.img_link})`}></div>
                <h2 class="name">${el.name}</h2>
                <span class="age">Возраст: ${el.age}</span>
                <span class="rate">Рейтинг: ${el.rate}</span>
                <span class="id">id: ${el.id}</span>
                <p class="describe">Lorem, ipsum dolor.</p>
            </div>`;
            box.innerHTML += card;
        })
    })
}
getCats();

const form = document.forms.addCat;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const body = {}
    for (let i = 0; i < form.elements.length; i++) {
        const el = form.elements[i];
        if (el.name && el.value) {
            body[el.name] =el.value
        }
        console.log(body)
    }
    fetch("https://sb-cats.herokuapp.com/api/2/pasha2004/add",{
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)

}
    ).then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.message === "ok"){
            box.innerHTML = ""
        }
    })
})
