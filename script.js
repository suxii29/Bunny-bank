let deposits =
JSON.parse(localStorage.getItem("deposits")) || [];

const modal = document.getElementById("modal");

document
.getElementById("depositBtn")
.addEventListener("click", () => {
modal.classList.remove("hidden");
});

function closeModal(){
modal.classList.add("hidden");
}

function saveDeposit(){

const amount =
Number(document.getElementById("amountInput").value);

const note =
document.getElementById("noteInput").value;

if(!amount) return;

deposits.push({
amount,
note,
date:new Date().toLocaleDateString()
});

localStorage.setItem(
"deposits",
JSON.stringify(deposits)
);

closeModal();
updateUI();
}

function updateUI(){

const total =
deposits.reduce((sum,d)=>sum+d.amount,0);

document.getElementById("total")
.textContent =
`${total} SAR`;

const fill =
Math.min((total/5000)*100,100);

document.getElementById("coins")
.style.height =
fill + "%";

const progress =
Math.min((total/700)*100,100);

document.getElementById("progress")
.style.width =
progress + "%";

document.getElementById("goalText")
.textContent =
`${total} / 700 SAR`;

const history =
document.getElementById("historyList");

history.innerHTML="";

[...deposits]
.reverse()
.slice(0,10)
.forEach(item=>{

const li =
document.createElement("li");

li.textContent =
`${item.date} • ${item.amount} SAR`;

history.appendChild(li);

});
}

updateUI();
