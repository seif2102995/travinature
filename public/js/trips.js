let sss=sessionStorage.getItem('options');
let select=document.getElementById('gov');
let optt=JSON.parse(sss);
  for(let i = 0 ; i < optt.length ; i++){
    select.options[select.options.length] = new Option(optt[i], optt[i]);
  }
