

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

const cardTemplate =`<div class="card mb-4">
				
<div class="card-body d-flex">
    <div><img style="width: 18rem;" src="https://images.unsplash.com/photo-1624916888351-a18f955a1b93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" class="card-img-top" alt="phoneimage"></div>
    <div class="d-flex flex-column flex-fill mx-4">
        <div><p class="h3">h3. Bootstrap heading</p>
            <p class="h4">h3. Bootstrap heading</p>
            <ul class="list-unstyled">
                <li>List item 1</li>
                <li>List item 1</li>
                <li>List item 1</li>
                <li>List item 1</li>
                <li>List item 1</li>

            </ul>
        </div>
    </div>
</div>
</div>`



console.log({email, ram, minrange, maxrange, phoneos, othertypes, noCostEmi})
loading = true;
document.getElementById("resultsLoading").style.visibility='visible';
fetch('https://6i0qk.sse.codesandbox.io/api/phonedata').then(response => response.json())
  .then(result => {
      loading = false;
        document.getElementById("resultsLoading").style.visibility='hidden';
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
                      <li>Rear Camera : ${data.rearCamera} | Front Camera ${data.frontCamera}</li>
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