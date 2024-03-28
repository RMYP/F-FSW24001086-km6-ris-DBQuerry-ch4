class App {
    constructor() {
        this.deleteBtn = document.getElementById('deleteBtn');

        this.modelUpdate = document.getElementById('modelUpdate');
        this.rentPerDayUpdate = document.getElementById('rentPerDayUpdate');
        this.carSizeUpdate = document.getElementById('carSizeUpdate');
        this.imageUpdate = document.getElementById('imageUpdate');
        this.updateBtn = document.getElementById('updateBtn')
        this.btnGetCarData = document.getElementById('get-car-data-byId');
    }

    async init() {
        // await this.load();
        this.deleteBtn.onclick = this.deleteCarData;
        this.updateBtn.onclick = this.updateCarData;
        // this.btnGetCarData.onclick = this.updateCarData;
    }

    deleteCarData = () => {
        console.log(this.deleteBtn.value)
        fetch(`http://localhost:8000/api/cars/${this.deleteBtn.value}`, {
            method: 'DELETE'
        })
    }

    getCarDataById = () => {
        try {
            fetch(`http://localhost:8000/api/cars/${this.btnGetCarData.value}`, {
            method: 'GET'
        })
        } catch (error) {
            
        }
    }

    updateCarData = async () => {
        console.log(this.updateBtn.value)
        const data = {
            model: this.modelUpdate.value,
            rentPerDay: this.rentPerDayUpdate.value,
            carSize: this.carSizeUpdate.value,
            image: this.imageUpdate.value,
        }
        const jsonString = JSON.stringify(data)
        try {
            await fetch(`http://localhost:8000/api/cars/${this.updateBtn.value}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
               },              
            body: jsonString
        });
        } catch (err) {
            console.log(err)   
        }
    }
}