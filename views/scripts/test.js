// Delete Data const
const deleteBtns = document.querySelectorAll('.btn-outline-danger');
// form Data const
const modelUpdate = document.getElementById('modelUpdate');
const rentPerDayUpdate = document.getElementById('rentPerDayUpdate');
const carSizeUpdate = document.getElementById('carSizeUpdate');
const imageUpdate = document.getElementById('imageUpdate');
const updateBtn = document.getElementById('updateBtn')
// Make new New Data
const newDataBtn = document.getElementById('add-btn')
// -----------Delete Data
deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', () =>{
        this.deleteCarData(deleteBtn.value)
    });
});

function deleteCarData(data) {
    console.log(data);
    const endPoint = `http://localhost:8000/api/cars/${data}`;
    fetch(endPoint, {
    method: "DELETE"
    });
}

// ------------End Delete Data
// =========================================================
// ------------Update Car Data
if(updateBtn != null){
    updateBtn.addEventListener('click', ()=> {
        console.log(updateBtn.value)
        const data = {
            model: modelUpdate.value,
            rentPerDay: rentPerDayUpdate.value,
            carSize: carSizeUpdate.value,
            image: imageUpdate.value,
        }
        const jsonString = JSON.stringify(data)
        fetch(`http://localhost:8000/api/cars/${updateBtn.value}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },              
            body: jsonString    
        })
        .then(window.location.replace("http://localhost:8000/dashboard"))
    })
}
// ----------END Update Car Data
// ===========================================================
// ----------Create new car data
// if(newDataBtn != null){
//     newDataBtn.addEventListener('click', ()=> {
//         const NewCarData = {
//             model: modelUpdate.value,
//             rentPerDay: rentPerDayUpdate.value,
//             carSize: carSizeUpdate.value,
//             image: imageUpdate.value,
//         }
//         const jString = JSON.stringify(newCarData);
//         fetch('http:')
//     })
// }