

function showMinimumPrice(newVal){
    document.getElementById("minimumrange").innerHTML=newVal;
}

function showMaximumPrice(newVal){
    document.getElementById("maximumrange").innerHTML=newVal;
}

var loading = false;


function getResults(){

    const email = document.getElementById("email").value
    const ram = document.getElementById("ram").value
    const minrange = document.getElementById("minrange").value
    const maxrange = document.getElementById("maxrange").value

    const phoneosvalues = document.getElementsByName("phoneos")

    let phoneos;
    phoneosvalues.forEach(e => {
        if (e.checked) {
            //if radio button is checked, set sort style
            phoneos = e.value;
        }
    });

    var othertypes = []
var checkboxes = document.getElementsByName('othertype')

for (var i = 0; i < checkboxes.length; i++) {
    if(checkboxes[i].checked){
        othertypes.push(checkboxes[i].value)
    }
   
}

const noCostEmi = document.getElementById("showNoCostEmi").checked;




console.log({email, ram, minrange, maxrange, phoneos, othertypes, noCostEmi})
loading = true;
document.getElementById("resultsLoading").style.display='block';
fetch('https://6i0qk.sse.codesandbox.io/api/phonedata').then(response => response.json())
  .then(result => {
      loading = false;
        document.getElementById("resultsLoading").style.display='none';
        renderResults(result)

      console.log(result)
  })

}

function renderResults(result){

    var joinedHtml = ""

    result.map((item)=>{
        joinedHtml+= createMarkup({
            ...item
        })
    })

    const content = document.getElementById("phoneDataResults");
    content.innerHTML="";
   content.insertAdjacentHTML("beforeend", joinedHtml);

}


const createMarkup = function createMarkup(data) {
    // Just use the same syntax for node elements
    const markup = 
      `<div class="card mb-4">
				
      <div class="card-body d-flex">
          <div><img style="width: 150px; height:300px" src="${data.image}" class="card-img-top" alt="phoneimage"></div>
          <div class="d-flex flex-column flex-fill mx-4">
              <div><p class="h3">${data.brand} ${data.name}</p>
                  <p class="h4">₹ ${data.price}</p>
                  <ul class="list-unstyled">
                      <li>Rear Camera : [${data.rearCamera}] MP | Front Camera ${data.frontCamera} MP</li>
                      <li>${data.ram} | ${data.rom}</li>
                      <li>${data.display}</li>
                      <li>${data.battery} mAh Battery</li>
                      <li>${data.processor}</li>
                      <li>Operating System: ${data.os}</li>
                     
      
                  </ul>
              </div>
          </div>
      </div>
      </div>`;
  return markup;
  };