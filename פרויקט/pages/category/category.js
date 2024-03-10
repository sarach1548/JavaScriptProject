//הוספת קו תחתי לקישור שהביא לדף זה
const aRecipes=document.getElementById("aLiRecipes");
aRecipes.classList=" black nav-link active";

//מערך הקטגוריות לשליפה
const params=new URLSearchParams(document.location.search);
const categories=params.getAll('category');


// body לתוך
//נוסיף את כל האלמנטים בעמוד
const body=document.getElementById('body');

//סימן החיפוש
const div=document.createElement('div');
div.classList="input-group rounded bg-transparent w-50 pe-6";
div.style="width: 500px!important; margin: auto";
const button=document.createElement('button');
button.id="myBtn";
button.classList="input-group-text border-0 bg-transparent";
const i=document.createElement('i');
i.classList="bi bi-search";//.add("fas","fa-search")
const input=document.createElement('input');
input.id="myInput";
input.classList="form-control rounded navSearch";
input.type="search";
input.placeholder="חיפוש";
input.ariaLabel="Search";
input.ariaDescribedby="search-addon";
input.value="";
// input.value=params.get('search');
button.appendChild(i);
div.appendChild(button);
div.appendChild(input);
body.appendChild(div);
//לתוכו יכנסו המתכונים
const divRecipes=document.createElement('div');
divRecipes.id="Recipes";
divRecipes.style="display: flex;   flex-wrap: wrap; justify-content: center;";
//לתוכו יכנסו הכפתורים לתתי הקטגוריות
const divCategory=document.createElement('div');
divCategory.id="divCategory";
divCategory.style="display:flex;  flex-wrap:wrap; justify-content: center;";
body.appendChild(divCategory);

//פונקציות

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
 //מוסיפה כותרות לעמוד לפי הקטגוריות הנתונות במערך
const addTitles=()=>{
    const divTitles=document.createElement('div');
    divTitles.style.paddingRight="50px";
    let i;
    let aHref="../category/category.html?";
    for(i=1;i<categories.length;i++){
        aHref+="category="+categories[i-1]+"&";
        const a=document.createElement('a');
        a.classList="text-decoration-none  fs-2 fw-light";
        a.innerText=categories[i-1]+">";
        a.href=aHref;
        divTitles.appendChild(a);
    }
    const a=document.createElement('a');
    aHref+="category="+categories[i-1];
    a.href=aHref;
    a.classList="text-decoration-none  fs-2 fw-light";
    a.innerText=categories[i-1];
    divTitles.appendChild(a);
    body.appendChild(divTitles);

}
//פונקציה המחזירה האם המתכון יכול להיות מוצג  כלומר: מכיל את כל הקטגוריות 
//categories
const contain=(categoriesRecipe)=>{
    let answer=true;
    categories.forEach(element => {
        const index=categoriesRecipe.indexOf(element);
         if(index==-1){
            answer= false;
         }
    });
    return answer;
}
//פונקציה המציגה מתכון בודד
const drowRecipe=(recipe)=>{
     const div=document.createElement('div');
     div.classList="recipe p-3";
     const a=document.createElement('a');
     a.href="../recipe/recipe.html";
     a.classList="card text-center mb-3 text-decoration-none";
     a.style="max-width: 18rem;";
     a.onclick=()=>{
        sessionStorage.setItem('recipe',JSON.stringify(recipe));
     }
     const img=document.createElement('img');
     img.src="../../assets/recipesImg/"+recipe.id+".png";
     img.classList="card-body card-text";
     img.style="width: 280px; height: 224px;    object-fit: cover;";
     const divSpan=document.createElement('div');
     divSpan.innerText=recipe.name;
     divSpan.classList="card-header";
     divRecipes.appendChild(div);
     div.appendChild(a);
     a.appendChild(img);
     a.appendChild(divSpan);


}
//מקבלת קטגוריה ומערך הקטגוריות ומעדכנת את מערך הקטגוריות הבא אם היא לא נמצאת בו
const updatesubCategories=(category,subCategories)=>{
    let check=true;
    subCategories.forEach(element => {
        if(category==element)
            check=false;       
    });
    if(check)
        subCategories.push(category);
    return subCategories;
}
//מקבלת 2 מערכים וממזגת ללא כפילויות
const mergeArrays=(subCategories,recipeArray)=>{
    recipeArray.forEach(element => {
        subCategories=updatesubCategories(element,subCategories);
    });
    return subCategories;
}
//פונקציה הבודקת אלו מתכונים עונים לקטגוריות שבמערך categories
//מציירת אותם, ומחזירה את מערך הקטגוריות הבא
const forAllRecipes=(recipesArray)=>{
    body.appendChild(divRecipes);
    let subCategories=[];
    recipesArray.forEach(element => {
        if(contain(element.category)){
            drowRecipe(element);
            subCategories=mergeArrays(subCategories,element.category);
        }
    });
    subCategories=removeCategoriesFromsubCategories(subCategories,categories);
    return subCategories;
}
//פונקציה המחסרת את categories
//מ subCategories
const removeCategoriesFromsubCategories=(subCategories,categories)=>{
    categories.forEach(element=>{
        const index=subCategories.indexOf(element);
         const subCategories1=subCategories.slice(0,index);
         if(index!=subCategories.length-1){
            const subCategories2=subCategories.slice(index+1,subCategories.length);
            subCategories=subCategories1.concat(subCategories2);

         }
         else
            subCategories=subCategories1;
    })
    return subCategories;
}
//פונקציה המציירת תתי קטגוריות
const drowAllCategories=(subCategories)=>{
    subCategories.forEach(element=>{
        drowCategory(element);
    })
}
//פונקציה המציירת תת קטגוריה אחת
const drowCategory=(categoryName)=>{
    const a=document.createElement('a');
    const span=document.createElement('span');
    span.classList="badge rounded-pill text-bg-secondary";
    span.innerText=categoryName;
    a.id=categoryName;
    a.href=document.location.href+"&category="+categoryName;
    a.style="margin-left: 5px;";
    a.appendChild(span);
    divCategory.appendChild(a);
        //<span class="badge rounded-pill text-bg-secondary">קינוחים</span>

}
//פונקציה שאחראית על כל הפעולות שיקרו באים קריאת השרת תצליח
const showRecipes=(recipes)=>{
    addTitles();
    let subCategories=forAllRecipes(recipes);
    drowAllCategories(subCategories);

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
