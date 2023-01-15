function initialize() {
    ITEM_LIST = [
        {"name": "Gloves", "size":1}, 
        {"name": "Sunglasses", "size":1},
        {"name": "Sneakers", "size":2},
        {"name": "Camera", "size":3},
        {"name": "Radio", "size":4},
        {"name": "Computer Keyboard", "size":4},
        {"name": "Laptop", "size":5},
        {"name": "Desktop", "size":6},
        {"name": "Printer", "size":7}, 
        {"name": "Television", "size":8}, 
        {"name": "Bathtub", "size":10},
        {"name": "Bed", "size":10},
        {"name": "Telescope", "size":7},
        {"name": "Barrel", "size":9},
        {"name": "Couch", "size":9},
        {"name": "Bicycle", "size":9},
        {"name": "Scooter", "size":8},
        {"name": "Baseball", "size":2},
        {"name": "Volleyball", "size":3},
        {"name": "Socks", "size":1}
    ]; 

    manifestTable = document.getElementById("list");

    boxDiv = document.getElementById("box"); 
    boxTable = document.getElementById("boxlist");
    boxSize = document.getElementById("boxSize"); 

    boxDiv.style.visibility = "hidden"; 

    totalScore = document.getElementById("total"); 
    score = 0; 

    totalCost = document.getElementById("cost"); 
    cost = 0; 

    manifestList = []; 
    genList(); 
    displayList();

    numManifest = 0; 
    genNum(); 
    remaining = document.getElementById("remain"); 
    remaining.innerHTML = numManifest

}

function genList() {
    for (var i=0; i < 10; i++) {
        num = Math.floor(Math.random() * 20); 
        manifestList.push(ITEM_LIST[num]); 
    }
}

function displayList() {
    items = document.getElementsByClassName('itemdiv'); 
    sizes = document.getElementsByClassName('sizediv'); 
    for (var i = 0; i < manifestList.length; i++) {
        items[i].innerHTML = manifestList[i].name; 
        sizes[i].innerHTML = manifestList[i].size; 
    }
}

function genNum() {
    num = Math.floor(Math.random() * 10) + 1; 
    numManifest = num; 
}

function smallBox() {
    boxDiv.style.visibility = "visible"; 
    boxSize.innerHTML = "SMALL BOX (MAX: 3)"; 
}

function largeBox() {
    boxDiv.style.visibility = "visible"; 
    boxSize.innerHTML = "LARGE BOX (MAX: 6)"; 
}

function xlargeBox() {
    boxDiv.style.visibility = "visible"; 
    boxSize.innerHTML = "EXTRA LARGE BOX (MAX: 10)"; 
}

function addtoBox(element) {
    if (boxDiv.style.visibility == "hidden") {
        return; 
    }
    var newRow = boxTable.insertRow(); 
    var newCell = newRow.insertCell(); 
    newCell.innerHTML = "<div onclick='removeItem(this);'>"+element.innerHTML+"</div>";
    
    for (var i = 0; i < manifestList.length; i++) {
        if (manifestList[i].name == element.innerHTML) {
            score += manifestList[i].size; 
            break; 
        }
    }
    totalScore.innerHTML = score; 

    row = element.closest('tr').rowIndex; 
    manifestTable.deleteRow(row); 
    if (manifestTable.rows.length == 1) {
        manifestTable.insertRow(); 
    }
}

function removeItem(element) {
    if (manifestTable.rows.length == 1) {
        manifestTable.deleteRow(1); 
    }
    var newRow = manifestTable.insertRow(); 
    var newCell = newRow.insertCell(); 
    newCell.innerHTML = "<div onclick='addtoBox(this);' class='itemdiv'>" + element.innerHTML+"</div>"
    newCell = newRow.insertCell(); 

    for (var i = 0; i < manifestList.length; i++) {
        if (manifestList[i].name == element.innerHTML) {
            score -= manifestList[i].size; 
            newCell.innerHTML = "<div class='sizediv'>" + manifestList[i].size + "</div>"; 
            break; 
        }
    }
    totalScore.innerHTML = score; 

    row = element.closest('tr').rowIndex; 
    boxTable.deleteRow(row); 
}

function closeBox() {
    size = boxSize.innerHTML; 
    if (size == "SMALL BOX (MAX: 3)" && score > 3) {
        return; 
    }
    if (size == "LARGE BOX (MAX: 6)" && score > 6) {
        return; 
    }
    if (size == "EXTRA LARGE BOX (MAX: 10)" && score > 10) {
        return; 
    }
    clearBox();
    score=0;  
    totalScore.innerHTML = score;
    if (manifestTable.rows.length == 2 && manifestTable.rows[1].innerHTML == "" && numManifest == 1) {
        numManifest -= 1; 
        remaining.innerHTML = numManifest; 
        boxDiv.style.visibility = "hidden";
        checkoutMsg = document.getElementById("checkout"); 
        checkoutMsg.innerHTML = "Great job today. Check in tomorrow for more manifests"; 
    }
    else if (manifestTable.rows.length == 2 && manifestTable.rows[1].innerHTML == "") {
        newManifest();
        numManifest -= 1; 
        remaining.innerHTML = numManifest
    }
    if (size == "SMALL BOX (MAX: 3)") {
        cost += 8 
    }
    if (size == "LARGE BOX (MAX: 6)") {
        cost += 13
    }
    if (size == "EXTRA LARGE BOX (MAX: 10)") {
        cost += 25
    }
    totalCost.innerHTML = "$" + cost; 
}

function clearBox() {
    for (var i = 1; i < boxTable.rows.length; ++i) {
        boxTable.deleteRow(i); 
        i--; 
    } 
    boxTable.insertRow(); 
}

function newManifest() {
    manifestList = []; 
    genList();  
    for (var i = 0; i < 10; i++) {
        var newRow = manifestTable.insertRow(); 
        var newCell = newRow.insertCell(); 
        newCell.innerHTML = "<div onclick='addtoBox(this);' class='itemdiv'>" + manifestList[i].name+"</div>"
        newCell = newRow.insertCell();
        newCell.innerHTML = "<div class='sizediv'>" + manifestList[i].size + "</div>";
    }
    displayList();
    boxDiv.style.visibility = "hidden"; 
}