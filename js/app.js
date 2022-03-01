// error msg 
const errorMsg = displayStyle => {
    document.getElementById('error1').style.display = displayStyle;
}
// error2 msg 
const errorMsg2 = displayStyle => {
    document.getElementById('error2').style.display = displayStyle;
}
// spninner
const spninerToggole = displayStyle => {
    document.getElementById('spniner').style.display = displayStyle;
}
// search btn handle
const searchPhone = () => {
    document.getElementById('details').textContent = '';
    spninerToggole('block');
    const searchFeild = document.getElementById('search-feild');
    const searchFeildValue = searchFeild.value;
    if (searchFeildValue === '') {
        errorMsg2('block');
        spninerToggole('none')
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
        document.getElementById('show-more').style.display = 'none';
        spninerToggole('none');
    }
    else {
        errorMsg('none');
        errorMsg2('none');
        phonesDiv.innerHTML = '';
        phones.slice(0, 20).forEach(phone => {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
            <img src="${phone.image}" class="img-fluid card-img-top "  alt="">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">${phone.brand}</p> 
            </div>
            <button onclick="loadDetails('${phone.slug}')" type="button" class="btn btn-success mx-auto px-3 mb-2">Details</button>
        </div>
        `
            phonesDiv.appendChild(div);
            spninerToggole('none')
        });
        if (phones.length < 21) {
            document.getElementById('show-more').style.display = 'none';
        } else {
            document.getElementById('show-more').style.display = 'block';
            const showMoreDiv = document.getElementById('show-more')
            showMoreDiv.classList.add('text-center')
            showMoreDiv.classList.add('my-3')
            showMoreDiv.innerHTML = `
           <button onclick="showMore()" class="btn btn-outline-secondary " type="button" id="show-more-btn">Show More</button>
        `
            console.log(phones.slice(0, 20));
        }
    }
}
// show-more 
const showMore = () => {
    const searchFeild = document.getElementById('search-feild');
    const searchFeildValue = searchFeild.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFeildValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showMoreDetails(data.data));
}
const showMoreDetails = (phones) => {
    const phonesDiv = document.getElementById('phones');
    phones.slice(21, 250).forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
    <div class="card h-100 shadow-sm border-0">
        <img src="${phone.image}" class="img-fluid card-img-top "  alt="">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">${phone.brand}</p> 
        </div>
        <button onclick="loadDetails('${phone.slug}')" type="button" class="btn btn-success mx-auto px-3 mb-2">Details</button>
    </div>
    `
        phonesDiv.appendChild(div);
    });
    document.getElementById('show-more').style.display = 'none';
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
    const detailsDiv = document.getElementById('details');
    detailsDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('mb-3');
    div.classList.add('m-auto');
    div.classList.add('shadow');
    div.classList.add('border-0');
    div.style = "max-width: 1140px;"
    div.innerHTML = `
    <div class="row g-0 ">
      <div class="col-md-2 ">
       <img id="image" src="${phone.image}" class="img-fluid rounded-start" alt="">
      </div>
      <div class="col-md-10">
       <div class="card-body">
        <h5 class="card-title phone-name">${phone.name}</h5>
        <p class="text card-text"><span class="color">Storage:</span> ${phone.mainFeatures.storage}</p>
        <p class="text card-text"><span class="color">DisplaySize:</span> ${phone.mainFeatures.displaySize}</p>
        <p class="text card-text"><span class="color">ChipSet:</span> ${phone.mainFeatures.chipSet}</p>
        <p class="text card-text"><span class="color">Memory:</span> ${phone.mainFeatures.memory}</p>
        <p id="rel" class="card-text"><small class="text-muted">${phone.releaseDate == '' ? 'Release date is not found.' : phone.releaseDate}</small></p>
        <p class="card-text"><span class="color">Sensors:</span> ${phone.mainFeatures.sensors}</p>
        <p class="card-text"><span class="color">Others Features :</span> ${displayOthers(phone.others) == '' ? 'no' : displayOthers(phone.others)}</p>
       </div>
      </div>
    </div>
        `
    detailsDiv.appendChild(div);
}
// Others Features
const displayOthers = (others) => {
    let result = ``;
    for (const item in others) {
        result = result + `${item} : ${others[item]}. `;
    }
    return result;
}