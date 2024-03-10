//הוספת קו תחתי לקישור שהביא לדף זה
const Recipe = document.getElementById("aLiRecipes");
Recipe.className = " black nav-link active";

const recipe = JSON.parse(sessionStorage.getItem('recipe'));

const showNameTitle=document.getElementById("showNameTitle");
showNameTitle.style="padding:64px 23px 65px !important ";

const showRecipe=document.getElementById("showRecipe");
showRecipe.style="   padding: 30px;";


//שליפת הdivim למילוי בפרטי המתכון
const title = document.getElementById('title');
title.innerText = recipe.name + "\n" + recipe.owner;
const categories = document.getElementById('categories');
const img = document.getElementById('img');
img.src="../"+ recipe.img;
img.style.objectFit="cover";
// img.style.backgroundSize="cover";
// img.style.backgroundRepeat="no-repeat";
// img.style.backgroundPosition="50% 50%";
img.classList.add("w-50");
const ingredients = document.getElementById('ingredients');
ingredients.style.padding="0px 20px";
recipe.ingredients.forEach(element => {
    ingredients.innerText += element + "\n";
});
const howToPrepare = document.getElementById('howToPrepare');
recipe.howToPrepare.forEach(element => {
    howToPrepare.innerText += element + "\n";
});
howToPrepare.style.padding="0px 20px";

//פונקציה המוסיפה ספאנים לתוך div הקטגוריות
const writeCategories = () => {
    let span;
    recipe.category.forEach(element => {
        span = document.createElement('span');
        span.innerText = "#" + element;
        categories.appendChild(span);
    })
    span.innerText = "";
}
writeCategories();

//טיפול בiconim 
const showIcons = document.getElementById('showIcons');
const addTimers = () => {
    recipe.time.forEach(element => {
        console.log(element);
        let timer = document.createElement('div');
        timer.classList = "p-2 timer";
        timer.onclick = () => { startTimer(element, timer) };
        timer.title = "הפעל טיימר " + element + " דקות";
        const audio = document.createElement('audio');
        showIcons.appendChild(timer);
        timer.appendChild(audio);
    });
}

// פעולה המקבלת מספר דקות וקוצבת זמן
const startTimer=(minutes,timer)=>{
    timer.style=`background-image:url("../../assets/image/טיימר צהוב.svg")`;
    setTimeout(() => {
        timer.childNodes[0].src="../../assets/צלצול בית ספר המלא.mp3";
        timer.childNodes[0].autoplay="autoplay";
        console.log(timer.childNodes[0]);
        setTimeout(() => {
            alert("נגמר הזמן...");
            timer.style=`background-image:url("../../assets/image/טיימר שחור.svg")`;
            timer.childNodes[0].src="";
    
        },1000);
    }, 1000*60*minutes);

}
addTimers();

//טיפול בלב-הוספת והסרת המתכון למתכונים שלי
const heartFunctions=(recipeId)=>{

    // בדיקה האם להציג את הלב
    //יקרה רק כשהמשתמש מחובר
        let memberDetails=JSON.parse(localStorage.getItem('memberDetails'));
        const spanname=document.getElementById("spanName").innerText;
        const heart=document.getElementById("heart");
        if(spanname==""){
            heart.style.display="none";
            console.log("לא מחובר");
        }
        else
        {
            console.log("מחובר");   
            const user=JSON.parse(sessionStorage.getItem("currentUser"));
            let indexUser=memberDetails.indexOf(user);
            // let userDet=JSON.parse(localStorage.getItem(user));
            // console.log(userDet);
            let userRecipes=user.recipes;
            let index=userRecipes.indexOf(`${recipeId}`);
            console.log(index);
            //האם המתכון נמצא ברשימת המתכונים שלי שאז הלב יהיה צהוב
            if(index>-1){
                heart.style.backgroundImage="url('../../assets/image/לב צהוב.png')";
                heart.title="הסר ממתכונים שלי";
            }
            else
                heart.title="הוסף למתכונים שלי";
            //פעולה המוסיפה את המתכון לרשימת המתכונים שלי
        const addRecipeToMyRecipes=(recipeId)=>{
            console.log(userRecipes);
            userRecipes.unshift(JSON.stringify(recipeId));
            console.log(userRecipes);
            console.log(recipeId);
            user.recipes=userRecipes;
            memberDetails[indexUser]=user;
            // localStorage.setItem(user);
            sessionStorage.setItem('currentUser',JSON.stringify(user));
            localStorage.setItem('memberDetails',JSON.stringify(memberDetails));
            heart.style.backgroundImage="url('../../assets/image/לב צהוב.png')";
            heart.title="הסר ממתכונים שלי";
        }
        //פעולה המסירה את המתכון מרשימת המתכונים שלי
        const removeRecipeFromMyRecipes=(recipeId)=>{
            console.log(recipeId);
            index=userRecipes.indexOf(`${recipeId}`);
            console.log(index);
            console.log(userRecipes);
            userRecipes.splice(index, 1);
            console.log(userRecipes);
            user.recipes=userRecipes;
            // localStorage.removeItem(user);
            sessionStorage.setItem('currentUser',JSON.stringify(user));
            localStorage.setItem('memberDetails',JSON.stringify(memberDetails));
            console.log(localStorage.getItem(user));
            heart.style.backgroundImage="url('../../assets/image/לב שחור.webp')";
            heart.title="הוסף למתכונים שלי";
        }
        heart.onclick=()=>{
            if(heart.title=="הסר ממתכונים שלי")
                removeRecipeFromMyRecipes(recipeId);
            else
                addRecipeToMyRecipes(recipeId);
        }
        }
    }
    heartFunctions(recipe.id);