let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let total = document.getElementById("total");

let mood = "create";

let temp;
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
    total.style.color = "white";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// creat submit
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value,
    price: price.value,
    ads: ads.value,
    taxes: taxes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };

  // ############count
  if (title.value != "" && price != "" && taxes.value != "") {
    if (mood === "create") {
      if (newpro.count > 1) {
        for (let i = 0; i < newpro.count; i++) datapro.push(newpro);
      } else {
        datapro.push(newpro);
      }
    } else {
      datapro[temp] = newpro;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
  }

  // save local storage
  localStorage.setItem("product", JSON.stringify(datapro));
  // console.log(newpro)
  clearData();
  showData();
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  category.value = "";
  taxes.value = "";
  discount.value = "";
  count.value = "";
}

// creat method read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += ` 
        <tr>
        <td>${i + 1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updatedata(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `;
  }

  document.getElementById("tbody").innerHTML = table;

  // ################## delete all  ########
  let btndelete = document.getElementById("deleteAll");

  if (datapro.length > 0) {
    btndelete.innerHTML = `
        <button onclick="deleteAll()"> deleteAll</button>
        `;
  } else {
    btndelete.innerHTML = "";
  }
}

//########## delete #################

function deleteData(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showData();
}
function deleteAll() {
  localStorage.clear();
  datapro.splice(0);

  showData();
}

// ##########################  update data  #######

function updatedata(i) {
  title.value = datapro[i].title;
  taxes.value = datapro[i].taxes;
  discount.value = datapro[i].discount;
  price.value = datapro[i].price;
  ads.value = datapro[i].ads;
  category.value = datapro[i].category;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "update";

  mood = "update";

  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// ################  search ##############
let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value)) {
        table += `
    <tr>
    <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value)) {
        table += `
    <tr>
    <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})" id="update">update</button></td>
    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// clean data
