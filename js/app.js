const searchPhone = () => {
    const searchFeild = document.getElementById('search-feild');
    const searchFeildValue = searchFeild.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFeildValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadPhone(data.data));
}
const loadPhone = (phones) => {
    const phonesDiv = document.getElementById('phones');
    phones.forEach(phone => {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top " alt="">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p>
                <button onclick="loadDetails('${phone.slug}')" type="button" class="btn btn-success ms-5 px-3">Details</button> 
            </div>
        </div>
        `
        phonesDiv.appendChild(div);
    })
}
const loadDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}
const displayDetails = (Details) => {
  console.log(Details);
}