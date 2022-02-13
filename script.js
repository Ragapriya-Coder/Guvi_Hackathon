//api URL
const api_url =
"https://www.anapioficeandfire.com/api/books";

// Defining async function
async function getapi(url) {

// Storing response
const response = await fetch(url);

// Storing data in form of JSON
var data = await response.json();

console.log(data);
if (response) {
    hideloader();
}
//display data
    show(data);

}
// Calling that async function

getapi(api_url).catch(alert);

// Function to hide the loader
function hideloader() {
document.getElementById('loading').style.display = 'none';
}
// Function to define innerHTML for HTML table
function show(data) {
    console.log('show data enabled');


    let html = '', urlInner = '';
    let i = 0;
    data.forEach(data => {
        // const d = new Date(data.released);
        // console.log(d);
        // let day = d.getDate();
        // console.log('    98889999');
        // console.log(d);
        let htmlSegment = `<div class="user">
                            
                            <h2>${data.name} ${data.isbn} </h2>
                            <h3> ${data.numberOfPages} </h3>
                            <h3> ${data.authors} </h3>
                            <h3> ${data.publisher}  </h3>
                            <h3> ${data.released}  </h3>
                            <div class="chara-list chara-list-${i}">
                            </div> 
                         
                        </div>`;
                        getchara(data, i);
                        i++;
        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;

}
async function geteach(bookchara) {
 
    const data3 = await fetch(`${bookchara}`);
    const charac = await data3.json();
    return charac;
}

async function getchara(bookchara, i) {
    

    // USING PROMISE.ALL TO GET EACH CHARACTERS API NAME INTO THE BOOK DETAILS // 

    const data2 = await Promise.all([geteach(bookchara.characters[0]), geteach(bookchara.characters[1]),
     geteach(bookchara.characters[2]), geteach(bookchara.characters[3]),
      geteach(bookchara.characters[4])]);
   
    data2.forEach(data => {
        const characontainer = document.querySelector(`.chara-list-${i}`);
        characontainer.innerHTML += `
                    <p>${data.name}</p>
                `;
    })
}

// function fetchCharacter(data) {
//     let urlInner = '';
//     const fruits = [];
//     data.forEach(data => {
//         urlInner = data.characters[0];
//         // console.log('neededValue=' + neededValue + ', URL=' + urlInner);
//          fetch(urlInner)
//           .then(responseI => responseI.json())
//           .then(responseBodyI => {
//             //  console.log(responseBodyI) ;
             
//              fruits.push(responseBodyI.name);
//              console.log(fruits);
//              return responseBodyI;
//           }).catch(err => {
//             console.error('Failed to fetch one or more of these URLs:');
//             console.log(err);
//           });
//         //   console.log("outside response body") ;
//         //   console.log(fruits);
//         })
// }
