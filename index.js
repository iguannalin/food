window.addEventListener("load", () => {
  let food = {};
  let div = document.getElementById("poem");

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function showPhrase(phrase) { // hehe
    if (!phrase) return;
    phrase.split("").forEach((letter, index) => {
      let span = document.createElement("a");
      span.innerHTML = letter;
      if (index == (phrase.length - 1)) span.innerHTML += "  ";
      span.classList = "grayed";
      span.onclick = connectWord;
      div.appendChild(span);
    });
  }

  function connectWord(e) {
    e.target.onclick = null;
    e.target.classList.remove("grayed");
    let target = e.target.innerText;
    let key = target.substring(target.length-1,target.length);
    let found = (food[key]) ? food[key][getRandomInt(0, food[key].length)] : "";
    showPhrase(found);
  }
  
  // amazing chengyu data source -- http://thuocl.thunlp.org/
  fetch("THUOCL_food.json").then((f) => f.json()).then((r) => {
    food = r;
    let key = Object.keys(food)[getRandomInt(0, Object.keys(food).length)];
    showPhrase(food[key][getRandomInt(0, food[key].length)]);
  });
});