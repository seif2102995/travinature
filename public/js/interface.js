
let ids = [];
(function () {
  let elements = document.getElementsByTagName("path");
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    if (element.id) {
        ids.push(element.getAttribute("name"));
    }
  }
  ids.sort();
})();

sessionStorage.setItem('options',JSON.stringify(ids));
