var trucksCount=document.getElementById('trucksCount')
var busesCount=document.getElementById('busesCount')
var carsCount=document.getElementById('carsCount')
var motorcyclesCount=document.getElementById('motorcyclesCount')
var totalRevenue=document.getElementById('totalRevenue')
var lastEntriesList=document.getElementById('lastEntriesList')





const socket = io("http://127.0.0.1:3000", {
    transports: ["websocket", "polling"], // Match server transports
  });
  

socket.on('newData',(data=>{

    console.log(data);
    trucksCount.innerHTML=data.trucksCount;
    carsCount.innerHTML=data.carsCount;
    motorcyclesCount.innerHTML=data.motorcyclesCount;
    busesCount.innerHTML=data.busesCount;
    totalRevenue.innerHTML=data.totalRevenue;
    lastEntriesList.innerHTML=" ";
    data.last5.forEach(element => {
        lastEntriesList.innerHTML+=`   
        <li class="list-group-item d-flex justify-content-between align-items-center">
       
            <span>Registration Number : ${element.carNumber}</span>
              <span class="badge bg-secondary rounded-pill"> ${element.carType} </span>
            <span class="badge bg-primary rounded-pill ">INR  ${element.tollAmt} </span>
          
        </li>  `
    });

}));




