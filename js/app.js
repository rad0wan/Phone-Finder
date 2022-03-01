// error msg 
const errorMsg = displayName => {
    document.getElementById('error1').style.display = displayName;
}
// search btn handle
const searchPhone = () => {
    const searchFeild = document.getElementById('search-feild');
    const searchFeildValue = searchFeild.value;
    if (searchFeildValue === '') {
        errorMsg('block');
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchFeildValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => loadPhone(data.data));
    }
}
// load phone data
const loadPhone = (phones) => {
    const phonesDiv = document.getElementById('phones');
    if (phones.length === 0) {
        errorMsg('block');
        phonesDiv.innerHTML = '';
    }
    else {
        errorMsg('none');
        phonesDiv.innerHTML = '';
        phones.forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100">
            <img src="${phone.image}" class="img-fluid card-img-top " alt="">
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
}
// load phone details
const loadDetails = (phoneId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}
// display phone details
const displayDetails = (phone) => {
    console.log(phone);
    const detailsDiv = document.getElementById('details');
    detailsDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('mb-3');
    div.classList.add('m-auto');
    div.style = "max-width: 1140px;"
    div.innerHTML = `
    <div class="row g-0">
      <div class="col-md-2">
       <img src="${phone.image}" class="img-fluid rounded-start" alt="">
      </div>
      <div class="col-md-10">
       <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text">Storage: ${phone.mainFeatures.storage}</p>
        <p class="card-text">DisplaySize: ${phone.mainFeatures.displaySize}</p>
        <p class="card-text">ChipSet: ${phone.mainFeatures.chipSet}</p>
        <p class="card-text">Memory: ${phone.mainFeatures.memory}</p>
        <p class="card-text"><small class="text-muted">${cheackRelease(phone.releaseDate)}</small></p>
        <p class="card-text">Sensors: ${phone.mainFeatures.sensors}</p>
        <p class="card-text">Others Features : ${displayOthers(phone.others)}</p>
       </div>
      </div>
    </div>
        `
    detailsDiv.appendChild(div);
}
// Others Features
const displayOthers = (others) => {
    console.log(others);
    let result = ``;
    for (const item in others) {
        result = result + `${item} : ${others[item]} `;
        console.log((item + ':' + others[item]));
    }
    return result;
}
// releaseDate area
const cheackRelease = releaseDate => {
    console.log(releaseDate);
}
