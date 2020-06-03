window.onload = main;

function main()
{
    lista_ingred = document.getElementById("ingrediente");
    lista_ingred.addEventListener("dblclick", rastoarna_lista, false);
    getRating();
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
         txt.localeCompare('LI') == 0 || txt.localeCompare('H2') == 0)
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

function rastoarna_lista()
{
    var lista = document.getElementById("ingrediente").children;

    l = lista.length - 1;
    var txt = "";

     for(var i = l; i >= 0; i --)
    {
        // inner html, contine marcaje, browserul le interpreteaza
        txt = txt + "<li>" + (lista[i].textContent);
        
    }
    document.getElementById("ingrediente").innerHTML = txt;
}

function submitData()
  {
    let nume = document.getElementById("nume_recenzie").value;
    let reteta = document.getElementById("nume_reteta").textContent;
    let email = document.getElementById("email").value;
    let nota1 = document.getElementById("nota1").value;
    let nota2 = document.getElementById("nota2").value;
    let nota3 = document.getElementById("nota3").value;

    if(nume == "" || reteta == "" || email == ""
           || nota1 == "" || nota2 == "" || nota3 == "")
        {
          // toate fields trebuie completate
          alert("Pentru a putea oferi un rating, va rog sa completati toate casetele!");
          return;
        }

        fetch("http://localhost:3000/recenzie", {
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
        body: JSON.stringify({nume: nume, reteta:reteta, email:email, nota1:nota1, nota2:nota2, nota3:nota3})
    }).then((data) => {
        return data.json()
    }).then((json)=>{
        if(json.Status === "OK"){
        console.log(json);
        }

        else
        {
            let div = document.getElementById("rating");
            div.innerHTML = "nunu";
            div.style.padding = "15px";
            div.style.marginTop = "0px";
            div.style.fontFamily = "'Playfair Display', serif";
        }
    })
    }
   
function getRating(){
    fetch("http://localhost:3000/recenzie")
    .then((data) => { return data.json() })
    .then((json) => displayRating(json))
}

function displayRating(data){

    let responseArea = document.getElementById('rating');

    let img_clock = document.createElement('IMG');
    img_clock.setAttribute("src","images/clock.png");
    img_clock.style.width = "50px";
    img_clock.style.height = "50px";

    let img = document.createElement('IMG');
    img.setAttribute("src","images/money.jpg");
    img.style.width = "50px";
    img.style.height = "50px";

    let img1 = document.createElement('IMG');
    img1.setAttribute("src","images/sanatate.jpg");
    img1.style.width = "50px";
    img1.style.height = "50px";

    let total_text = document.createElement('P');
    total_text.innerHTML = "Media generala"

    let total_categ = document.createElement('P');
    total_categ.innerHTML = "Medii pe categorii:"

    let total = document.createElement('P');

    let medie_nota1 = document.createElement('P');
    
    let medie_nota2 = document.createElement('P');
    
    let medie_nota3 = document.createElement('P');
    
    let reteta = document.getElementById("nume_reteta").textContent;
    let suma = 0; // toate notele insumate pentru o reteta
    let t = 0; // numarul tuturor notelor insumate

    if(medie_nota1.textContent == NaN)
        medie_nota1.innerHTML = 0;

    if(medie_nota2.innerHTML == NaN)
        medie_nota2.innerHTML = 0;

    if(medie_nota3.innerHTML == NaN)
        medie_nota3.innerHTML = 0;

    let s_nota1 = 0;
    let s_nota2 = 0;
    let s_nota3 = 0;
    // pentru fiecare reteta calculez mediile recenziilor
    for (let i = 0; i< data.length; i++)
    {
        if(data[i]["reteta"].localeCompare(reteta) == 0)
        {
            t +=1;
            suma = suma + Number(data[i]["nota1"]) + Number(data[i]["nota2"]) + Number(data[i]["nota3"]);
            s_nota1 = s_nota1 + Number(data[i]["nota1"]);
            s_nota2 = s_nota2 + Number(data[i]["nota2"]);
            s_nota3 = s_nota3 + Number(data[i]["nota3"]);
        }
    }
    medie_nota1.innerHTML = (s_nota1 / t).toFixed(2);

    medie_nota2.innerHTML = (s_nota2 / t).toFixed(2);

    medie_nota3.innerHTML = (s_nota3 / t).toFixed(2);

    let nr = suma / (3*t)
    total.innerHTML = nr.toFixed(2);
    
    responseArea.appendChild(total_categ);

    responseArea.appendChild(img_clock);
    responseArea.appendChild(medie_nota1);

    responseArea.appendChild(img);
    responseArea.appendChild(medie_nota2);

    responseArea.appendChild(img1);
    responseArea.appendChild(medie_nota3);

    responseArea.appendChild(total_text);
    responseArea.appendChild(total);
}




