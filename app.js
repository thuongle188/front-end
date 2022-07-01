var doctorApi = 'http://127.0.0.1:8000/getDoctor';
var doc;

const open = document.querySelector('#noti');
const okBtns = document.querySelector('#btnok');

function start(){
    handleAddForm();
       // renderNoti();
    getDoctor();
}

start();
// get doctor
fetch(doctorApi).then(function(response){
    return response.json();
}).then(function(doctors){
    var htmls = doctors.map(function(doctor){

        return `<li>
            <h2>${doctor.name}</h2>
            <p>${doctor.time}</p>
        </li> 
        <br>`
    });
    var html = htmls.join('');
    document.getElementById('doctor-block').innerHTML = html;
}).catch(function(err){
    alert('log bac si loi');
})

function getDoctor(){
    fetch(doctorApi)
        .then(function(response){
            return response.json();
        })
        .then(function(doctor){
            doc = doctor;
             //doctor.str();
             for(let i=0; i<doc.length; i++){
                //alert(doc[i]+'aedrfghj');
                console.log(doc[i]);
                console.log(doc[i].name);
             }
            
        })
}
// add schedule ok
function renderNoti(){
    return `<p>Thành công</p>`;
}
function handleAddForm(){
    var submitBtn = document.querySelector('#submit');

    submitBtn.onclick = function(){
        // alert('click');
        var hoten = document.querySelector('input[name="hoten"]').value;
        var sdt = document.querySelector('input[name="sdt"]').value;
        var bacsi = document.querySelector('input[name="bacsi"]').value;
        var time = document.querySelector('input[name="time"]').value;
        // alert(time);
        var formData = {
            customer_name: hoten,
            phone: sdt,
            doctor: bacsi,
            schedule: time
        };
        var fcus ={
            name: hoten,
            phone: sdt
        };
       // let s=[doctor.name];
        //var [] names = doctor.name;
        let id;
        let f = false;
           // if (bacsi == "MAI"  || bacsi=="Luan"|| bacsi=="An"|| bacsi=="Mguyen Mai Anh"){
           for(let i=0; i<doc.length; i++){
                if(doc[i].name == bacsi && doc[i].time=="Yes") { 
                    f=true;
                    id=i+1;
                    break;
                }
           }
           if(f==false) alert('Đăng ký không thành công ');
           if(f==true){
                createSchedule(formData);

                // notification
                document.getElementById('name-noti').innerHTML = hoten;
                document.getElementById('phone-noti').innerHTML = sdt;
                document.getElementById('doctor-noti').innerHTML = bacsi;
                document.getElementById('time-noti').innerHTML = time;

                let iddoctor = JSON.stringify(id);
                updateDoctor(iddoctor);
                createCustomer(fcus);
           }          
    }
}

var addScheduleApi = 'http://127.0.0.1:8000/addschedule/';
function createSchedule(data){
    var options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };
    fetch(addScheduleApi, options).then(function(response){
        response.json();
    })
    .then(function(){
        // alert('Dang ki thanh cong');
        open.classList.add('open-noti');
    }).then(function(){
        function hideBuyTickets(){
            open.classList.remove('open-noti');
            location.reload();
        }
        okBtns.addEventListener('click', hideBuyTickets);        
    })
}

var updateDoctorApi = 'http://127.0.0.1:8000/updateDoctor/';
function updateDoctor(data){
    var options = {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };
    fetch(updateDoctorApi, options).then(function(response){
        response.json();
    })
}

var addCustomerApi='http://127.0.0.1:8000/addCustomer/';
function createCustomer(data){
    var options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };
    fetch(addCustomerApi, options).then(function(response){
        response.json();
    })
}