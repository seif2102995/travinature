document.body.addEventListener('mouseover', function(e) {
  let target = e.target;
  let x = document.getElementById("trips");
  if (target.nodeName === 'path') {
    x.style.display='block';
    x.innerHTML=target.id+" lorem lore m lcdhufmkcncjkaf mlekadjeamlkdf";
    x.style.top=e.pageY+"px";
    x.style.left=e.pageX+"px";
  }else{
    x.style.display='none';
  }
});


