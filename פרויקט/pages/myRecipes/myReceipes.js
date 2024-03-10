//הוספת קו תחתי לקישור שהביא לדף זה
const MyRecipes=document.getElementById("aLiMyRecipes");
MyRecipes.className=" black nav-link active";
//הdiv שלתוכו יוכנסו כל האלמנטים
const body=document.getElementById('body');
//שליפת הcurrent user
const psw=sessionStorage.getItem('currentUser');
var currentUser=JSON.parse(sessionStorage.getItem('currentUser'));
//כותרות
const h1=document.createElement('h1');
h1.innerText="my recipes";
h1.classList ="fst-italic text-center fw-light";
const h2=document.createElement('h2');
h2.innerText=currentUser.Name;
h2.classList="text-center fw-light";
body.appendChild(h1);
body.appendChild(h2);
//סימן החיפוש
const div=document.createElement('div');
div.classList="input-group rounded bg-transparent w-50 pe-6";
div.style="width: 500px!important; margin: auto";
const button=document.createElement('button');
button.id="myBtn";
button.classList="input-group-text border-0 bg-transparent";
// const i=document.createElement('i');
// i.classList="bi bi-search";//.add("fas","fa-search")
const input=document.createElement('input');
input.id="myInput";
input.classList="form-control rounded navSearch";
input.type="search";
input.placeholder="חיפוש";
input.ariaLabel="Search";
input.ariaDescribedby="search-addon";
input.value="";
// input.value=params.get('search');
// button.appendChild(i);
div.appendChild(button);
div.appendChild(input);
body.appendChild(div);
//divRecipes להצגה
const divRecipes=document.createElement('div');
divRecipes.id="divRecipes";
body.appendChild(divRecipes);
divRecipes.style="display: flex;   flex-wrap: wrap; justify-content: center;";



//פונקציית החיפוש:
const search=(string)=>{
    const recipesInThePage=document.getElementsByClassName('recipe');

    for(let i=0;i<recipesInThePage.length;i++){
        if(recipesInThePage[i].childNodes[0].childNodes[1].innerText.includes(string)){
            recipesInThePage[i].style.display="inline";
        }
        else
            recipesInThePage[i].style.display="none";
    }
}
input.onchange=()=>{
    search(input.value);}

//פונקציה המקבל id 
//של מתכון מתוך האוסף result
//ומחזירה תשובה בוליאנית האם הוא יכול להיות מוצג-כלומר:נכלל ברשימת המתכונים הנבחרים
const ifToShow=(id)=>{
    let check=false;
    currentUser.recipes.forEach(element => {
        if(element==id)
        check= true;
    });
    return check;
}
//פונקציה המציירת מתכון אחד
const drowRecipe=(recipe)=>{
    const div=document.createElement('div');
    div.classList=" recipe p-3";
    const a=document.createElement('a');
    a.href="../recipe/recipe.html";
    a.classList=" card text-center mb-3 text-decoration-none";
    a.style="max-width: 18rem;";
    a.onclick=()=>{
       sessionStorage.setItem('recipe',JSON.stringify(recipe));
    }
    const img=document.createElement('img');
    img.src="../../assets/recipesImg/"+recipe.id+".png";
    // img.classList="card-body card-text";
    img.style="width: 280px; height: 224px;    object-fit: cover;";
    const divSpan=document.createElement('div');
    divSpan.innerText=recipe.name;
    divSpan.classList="card-header";
    divRecipes.appendChild(div);
    div.appendChild(a);
    a.appendChild(img);
    a.appendChild(divSpan);
}

//פעולה המקבלת את מערך כל המתכונים 
//ומציגה את המתכונים הנבחרים
const showRecipes=(result)=>{
    result.forEach(element => {
        if(ifToShow(element.id))
            drowRecipe(element);
    });
}

//קריאת שרת והצגת המתכונים
$.ajax({
    url: "../../data/recipes.json",
    success: (result) => {
        console.log(result);
        showRecipes(result);
    },
    error: err => {
        console.log(err);
        console.log("error in ajax");
    }
})
const i=document.createElement('i');
i.classList="bi bi-search";//.add("fas","fa-search")
input.id="myInput";
input.classList="form-control rounded navSearch";
input.type="search";
input.placeholder="חיפוש";
input.ariaLabel="Search";
input.ariaDescribedby="search-addon";



