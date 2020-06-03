
window.onload=main;
var x;
function main()
{  
    hey_user();
    afisareCuvantCuCuvant("AICI", "Mă numesc Ana Beca și sunt autoarea acestui blog culinar, prin intermediul căruia îmi doresc să împărtășesc și celorlalți ideea unei alimentații sanătoase prin rețete special adaptate, care atrag prin gust, aspect și calități nutritive.Dacă ți se par gustoase rețetele propuse, te provoc să incerci și tu una. Vă mulțumesc pentru vizită și vă aștept cu drag sugestiile, părerile și comentariile în secțiunea special alocată.", 330);
    getComments();
}

function hey_user()
{
    let name = prompt("Cum te numești?");
    let a = document.getElementById('notita');

    var user = document.createElement("P");
    user.innerText = "Salut, " + name.toString();

    a.appendChild(user);

    alert("Salut, " + name.toString());
}

function numar_cuvinte()
{
    var nr_cuvinte = 0;
    var elem_body = document.body.querySelectorAll(" body *");
    var i;
    
    for(i = 0 ; i < elem_body.length; i ++)
    {
        var txt = elem_body[i].nodeName;
        
        if(txt.localeCompare('P') == 0 || txt.localeCompare('STRONG') == 0 ||
         txt.localeCompare('LI') == 0 )
        {
            str = elem_body[i].textContent;
            
            //exclude  start and end white-space
            str = str.replace(/(^\s*)|(\s*$)|/gi,"");
            //convert 2 or more spaces to 1  
            str = str.replace(/[ ]{2,}/gi," ");
            // exclude newline with a start spacing  
            str = str.replace(/\n /,"\n");

            var lungime = str.split(' ').length;
            
            nr_cuvinte = nr_cuvinte + lungime;
        }
    }
    document.getElementById("nrcuvinte").value = nr_cuvinte;
}

function afisareCuvantCuCuvant(destinatie, mesaj, viteza)
{
    var mes = mesaj.split(" ");
    var i = 0;
    var interval = setInterval(function()
    {
        document.getElementById(destinatie).innerHTML += mes[i] + " ";
        i++;

        if (i >= mes.length)
        {
            clearInterval(interval);
        }
    }, viteza);
}

function submitData()
  {
      let nume = document.getElementById("name").value;
      let comment = document.getElementById("comment").value;
    
      if(nume != "" && comment != "")
      {
        fetch("http://localhost:3000/blog", {
            method: 'POST',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            // din JavaScript in JSON
            body: JSON.stringify({nume: nume, comment:comment})
        }).then((data) => {
            return data.json()
        }).then((json)=>{
            if(json.Status === "OK"){
            console.log(json);

            let div = document.getElementById("comentarii");
            div.innerHTML = "Sent";
            div.style.padding = "15px";
            div.style.marginTop = "0px";
            div.style.fontFamily = "'Playfair Display', serif";
            }
            else
            {
                console.log("nu merge");
            }
        })
      }
      else
      {
            alert("Completati toate casetele pentru a putea comenta!");
      }
  }

function getComments(){
    fetch("http://localhost:3000/blog")
    .then((data) => { return data.json() })
    .then((json) => displayComments(json))
}

var key_plus = [];
var key_minus = [];

function displayComments(data){

    let responseArea = document.getElementById('comentarii');

    if(responseArea)
    {
        for (let i = 0; i< data.length; i++)
    {
        key_plus[i] = "plus" + i;
        key_minus[i] = "minus" + i;

        var negative_comm = Number(localStorage.getItem(key_minus[i]));

        let nume = document.createElement('P');
        nume.innerText = data[i]["nume"];

        let comentariu = document.createElement('P');
        comentariu.innerText = data[i]["comment"];

        let continut = document.createElement('DIV');
        continut.classList.add("container1");

        let img = document.createElement('IMG');
        img.setAttribute("src","images/user.png");

        let result_plus = document.createElement('P');
        result_plus.innerHTML = Number(localStorage.getItem(key_plus[i]));
        
        let result_minus = document.createElement('P');
        result_minus.innerHTML = negative_comm;

        let img_plus = document.createElement('IMG');
        img_plus.setAttribute("src","images/plus.png");
        img_plus.style.width = "30px";
        img_plus.style.height = "30px";

        let img_minus = document.createElement('IMG');
        img_minus.setAttribute("src","images/minus.jpg");
        img_minus.style.width = "30px";
        img_minus.style.height = "30px";

        // comentariile cu mai mult de 3 voturi negative sunt ascunse
        if(negative_comm > 3)
            continut.style.display = "none";

        img_plus.addEventListener("click",  function(){

            if (typeof(Storage) != "undefined") {
 
                x = Number(localStorage.getItem(key_plus[i])) + 1;
                localStorage.setItem(key_plus[i], x);

                result_plus.innerHTML = localStorage.getItem(key_plus[i]) ;
            } 
            else {

                result_plus.innerHTML = "Sorry, your browser does not support web storage...";
              }

        }, true );

        img_minus.addEventListener("click",  function(){

            if (typeof(Storage) !== "undefined") {

                y = Number(localStorage.getItem(key_minus[i])) + 1;
                localStorage.setItem(key_minus[i], y);

                result_minus.innerHTML = localStorage.getItem(key_minus[i]) ;
            } 
            else {

                result_minus.innerHTML = "Sorry, your browser does not support web storage...";
              }

        }, true );

        continut.appendChild(img);
        continut.appendChild(nume);
        continut.appendChild(document.createElement('BR'));
        continut.appendChild(comentariu);
        continut.appendChild(img_plus);
        continut.appendChild(result_plus);
        continut.appendChild(img_minus);
        continut.appendChild(result_minus);
        continut.style.border = "1px solid black";

        responseArea.appendChild(continut);
    }
   } 
}


