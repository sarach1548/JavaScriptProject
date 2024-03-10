const divOfPage=document.getElementById('topNav');
divOfPage.classList="z-1  bg-white ";//fixed-top
// divOfPage.style="width:100%; "
const divNav=document.createElement('div');
divNav.id="divNav";
divNav.style="position: fixed;background-color: white;width: 100%;     z-index: 5;"
const divBlk=document.createElement('div');
divBlk.id="divBlk";
divBlk.style="height:70px;";
const divWht=document.createElement('div');
divWht.id="divWht";
divWht.classList="nav justify-content-center";
const ulNivut=document.createElement('ul');
ulNivut.id="ulNivut";
ulNivut.style="list-style-type: none";
ulNivut.classList="nav justify-content-center";
const liOnUs=document.createElement('li');
liOnUs.id="liOnUs";
liOnUs.className="liNav";

const aLiOnUs=document.createElement('a');
aLiOnUs.id="aLiOnUs";
aLiOnUs.href="../../pages/home/home.html";
aLiOnUs.innerText="קצת עלינו...";
aLiOnUs.style="text-decoration: none";
aLiOnUs.className="black";
// aLiOnUs.style.fontFamily="my_font";


const liRecipes=document.createElement('li');
liRecipes.id="liRecipes";
liRecipes.className="liNav";

const aLiRecipes=document.createElement('a');
aLiRecipes.id="aLiRecipes";
aLiRecipes.href="../../pages/chooseCategory/chooseCategory.html";
aLiRecipes.innerHTML="מתכונים";
aLiRecipes.style="text-decoration: none";
aLiRecipes.className="black";

const liAddRecipe=document.createElement('li');
liAddRecipe.id="liAddRecipe";
liAddRecipe.className="liNav";

const aLiAddRecipe=document.createElement('a');
aLiAddRecipe.id="aLiAddRecipe";
aLiAddRecipe.href="../../pages/addRecipe/addRecipe.html"
aLiAddRecipe.innerText="הוספת מתכון";
aLiAddRecipe.style="text-decoration: none";
aLiAddRecipe.className="black";

const liMyRecipes=document.createElement('li');
liMyRecipes.id="liMyRecipes";
liMyRecipes.className="liNav";
const aLiMyRecipes=document.createElement('a');
aLiMyRecipes.id="aLiMyRecipes";
aLiMyRecipes.href="../../pages/myRecipes/myRecipes.html";
aLiMyRecipes.innerText="המתכונים שלי";
aLiMyRecipes.style="text-decoration: none";
aLiMyRecipes.className="black";


const imgLogo=document.createElement('img');
imgLogo.src="../../assets/image/logoNav.png";
imgLogo.id="imgLogo";
const aLogo=document.createElement('a');
aLogo.id="aLogo";
aLogo.className="link-opacity-75-hover";
aLogo.href="../../pages/home/home.html";




const btnEnter=document.createElement('button');
btnEnter.id="btnEnter";
btnEnter.className="btn  btn-light yelow";
btnEnter.innerText="khjk";
btnEnter.style="      margin: 15px 20px;";
const aBtnEnter=document.createElement('a');
// aBtnEnter.href="../../pages/login/login.html";
btnEnter.onclick=()=>{
    if(btnEnter.innerText==="התחבר")
        document.location.href="../../pages/login/login.html";
    else{
        sessionStorage.removeItem('currentUser');
        spanName.innerText="";
        btnEnter.innerText="התחבר";
        liMyRecipes.style.display="none";

    }
        
}
// const nameOfUser=sessionStorage.getItem("currentUserName");
// if(nameOfUser==undefined){
//     btnEnter.innerText="התחבר";
//     liMyRecipes.style.display="none";
// }
// else{
//     btnEnter.innerText="התנתק";
//     liMyRecipes.style.display="list-item";
//     spanName.innerText=nameOfUser;
// }

const spanName=document.createElement('span');
spanName.id="spanName";
spanName.classList="fs-3 yelow";
spanName.style="    margin: 15px 20px;";
if(sessionStorage.getItem('currentUser')!=null){
    // const strCurrentUser=sessionStorage.getItem('currentUser');
    // console.log(strCurrentUser);
    // console.log(JSON.parse(sessionStorage.getItem('currentUser')).Name);
    spanName.innerText=JSON.parse(sessionStorage.getItem('currentUser')).Name;
    btnEnter.innerText="התנתק";
    liMyRecipes.style.display="list-item";
}
else{
    btnEnter.innerText="התחבר";
    liMyRecipes.style.display="none";
}

liOnUs .appendChild(aLiOnUs);
liRecipes .appendChild(aLiRecipes);
liAddRecipe .appendChild(aLiAddRecipe);
liMyRecipes.appendChild(aLiMyRecipes);
aLogo.appendChild(imgLogo);
ulNivut.appendChild(liOnUs);
ulNivut.appendChild(liRecipes);
ulNivut.appendChild(liAddRecipe);
ulNivut.appendChild(liMyRecipes);
divWht.appendChild(aLogo);
divWht.appendChild(ulNivut);
aBtnEnter.appendChild(btnEnter);
divBlk.appendChild(aBtnEnter);
divBlk.appendChild(spanName);
divNav.appendChild(divBlk);
divNav.appendChild(divWht);
divOfPage.appendChild(divNav);
