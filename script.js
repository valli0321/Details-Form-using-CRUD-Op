const personName = document.getElementById("name");
const aadharNo = document.getElementById("id-number");
const eMail = document.getElementById("email");
const contactNumber = document.getElementById("mobile");

let itemsArray = JSON.parse(localStorage.getItem("details"))||[];
const deleteButton = document.getElementById("delete");

const form =  document.getElementById("form");
form.addEventListener("submit", handleSubmit);

showItems();

let idOfItem, index;

function validateForm() {
    
}



//Add and Update Entries
function handleSubmit(e){
    e.preventDefault();
    let count = 0;
    if(idOfItem){
        index = itemsArray.findIndex((item)=> item.id==idOfItem);
        
        for(let i in itemsArray){
            if(i==index){
                continue;
            }
            else{
                if((aadharNo.value == itemsArray[i].idNumber) && (eMail.value == itemsArray[i].mail)){
                    count = 1;
                    break;
                }
            }
        }
        if(count == 1){
            console.log("Duplicate Found");
            alert("Duplicate Found!!!! (Aadhar Number & Email should be Unique)");
        }
        else{
            itemsArray[index].name = personName.value;
            itemsArray[index].idNumber = aadharNo.value,
            itemsArray[index].mail = eMail.value,
            itemsArray[index].mobileNo = contactNumber.value;
            localStorage.setItem("crud2", JSON.stringify(itemsArray));
            showItems();
            personName.value="";
            aadharNo.value="";
            eMail.value="";
            contactNumber.value="";
            index=null;
            idOfItem="";
            console.log("Updated",idOfItem);
            document.getElementById("submit").innerHTML = "Add";
        }     
    }
    else{
        let counter=0;
        const enteredValue = {
            id: Date.now(),
            name: personName.value,
            idNumber: aadharNo.value,
            mail: eMail.value,
            mobileNo: contactNumber.value
        }
        console.log("Done",enteredValue);
        if(itemsArray.length>=0){
            for(let item of itemsArray){
                if(enteredValue.idNumber == item.idNumber){
                    counter=1;
                    break;
                }
            }
            if(counter==1){
                console.log("Duplicate Found");
                alert("Duplicate Found!!!! (Aadhar Number should be Unique)");
            }
            else{
                itemsArray.push(enteredValue);
                console.log(itemsArray)
                localStorage.setItem("details",JSON.stringify(itemsArray));
                showItems();
                personName.value="";
                aadharNo.value="";
                eMail.value="";
                contactNumber.value="";
                console.log("Entered");
            }
            
        }
        else{
            localStorage.setItem("details",JSON.stringify([enteredValue]));
            showItems();
            console.log("Entered");
            personName.value="";
            aadharNo.value="";
            eMail.value="";
            contactNumber.value="";
        }
    }
}


// Display Entries
function showItems(){
    console.log("Show Entries");
    let st="";
    for(let item of itemsArray){
        st+= `<tr>
                <td>${item.name}</td>
                <td>${item.idNumber}</td>    
                <td>${item.mail}</td>    
                <td>${item.mobileNo}</td>        
                <td><i style="color: black;" class="fa-solid fa-pen fa-lg" onclick="handleEdit(${item.id})"></i></td>
                <td><i style="color: black;" class="fa-solid fa-trash fa-lg" onclick="handleDelete(${item.id})" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></td>   
            </tr>`;       
    }
    document.getElementById("entries").innerHTML = st;
}

//Delete a Entry

deleteButton.addEventListener("click",checkDelete);

function checkDelete(){
    console.log("Deleted",idOfItem);
    const updatedArray = itemsArray.filter((element)=>element.id!=idOfItem)
    console.log(updatedArray);
    itemsArray = updatedArray;
    localStorage.setItem("details", JSON.stringify(itemsArray));
    showItems();
    idOfItem="";
}

function handleDelete(id){
    idOfItem = id;
    console.log(idOfItem);
}


// Edit a Entry
function handleEdit(id){
    idOfItem = id;
    index = itemsArray.findIndex((item)=> item.id==idOfItem);
    console.log("Edit",idOfItem,index);
    document.getElementById("name").value = itemsArray[index].name;
    document.getElementById("id-number").value = itemsArray[index].idNumber;
    document.getElementById("email").value = itemsArray[index].mail;
    document.getElementById("mobile").value = itemsArray[index].mobileNo;

    document.getElementById("submit").innerHTML = "Update";
    let st="";
    for(let item of itemsArray){
        if(item.id==idOfItem){
            st+= `<tr>
                <td>${item.name}</td>
                <td>${item.idNumber}</td>    
                <td>${item.mail}</td>    
                <td>${item.mobileNo}</td>     
                <td><i style="color: black;" class="fa-solid fa-pen fa-lg" onclick="handleEdit(${item.id})"></i></td>
                <td><i style="color: black;" class="fa-solid fa-trash fa-lg" ></i></td>   
            </tr>`;
        }
        else{
            st+= `<tr>
                <td>${item.name}</td>
                <td>${item.idNumber}</td>    
                <td>${item.mail}</td>    
                <td>${item.mobileNo}</td>       
                <td><i style="color: black;" class="fa-solid fa-pen fa-lg" onclick="handleEdit(${item.id})"></i></td>
                <td><i style="color: black;" class="fa-solid fa-trash fa-lg" onclick=""></i></td>   
            </tr>`; 
        }
               
    }
    document.getElementById("entries").innerHTML = st;
}


// Delete All Entries
function deleteAll(){
    localStorage.clear();
    itemsArray=[];
    document.getElementById("name");
    document.getElementById("id-number");
    document.getElementById("email");
    document.getElementById("mobile");
    idOfItem="";
    document.getElementById("submit").innerHTML = "Add";
    // list.classList.add("clear-data");
    // setTimeout(function(){ list.classList.remove("clear-data") }, 1500);
    console.log("Deleted all Data");
    document.getElementById("entries").innerHTML = "";
}