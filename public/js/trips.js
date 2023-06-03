// let sss=sessionStorage.getItem('options');
// let select=document.getElementById('gov');
// let optt=JSON.parse(sss);
//   for(let i = 0 ; i < optt.length ; i++){
//     select.options[select.options.length] = new Option(optt[i], optt[i]);
//   }



const countryDropdown = document.querySelector('#gov');

const countries =  JSON.stringify(countries);


fetch('/admin/trips')
.then(response => response.json())
.then(data => {
  data.forEach(country => {
    const option = document.createElement('option');
    option.value = country.country_name;
    option.text = country.country_name;
    countryDropdown.appendChild(option);
  });
});
  