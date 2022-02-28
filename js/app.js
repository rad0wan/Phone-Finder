const searchPhone = () => {
    const searchFeild = document.getElementById('search-feild');
    const searchFeildValue = searchFeild.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFeildValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => loadPhone(data.data));
}
const loadPhone = (phones) => {
    phones.forEach(phone => console.log(phone))
}