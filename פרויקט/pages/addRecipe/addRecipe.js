const aaLiAddRecipe = document.getElementById('aLiAddRecipe');
aaLiAddRecipe.classList = " black nav-link active";

const addCategoryToRecipe = document.getElementById('addCategoryToRecipe');

let id;

//
const addToCategory = (AllCategoriesArray) => {
    const select = document.querySelector(".form-select");
    let op;
    AllCategoriesArray.forEach(category => {
        op = document.createElement('option');
        op.innerHTML = category;
        select.appendChild(op);
    });
}
// פונקציה שמאחזרת את כל הקטגוריות הקיימות
const getAllCategories = (recipes) => {
    let AllCategoriesArray = [];
    recipes.forEach(recipe => {
        recipe.category.forEach(category => {
            updatesubCategories(category, AllCategoriesArray);
        });
    });
    console.log(AllCategoriesArray);
    addToCategory(AllCategoriesArray);
}

//מקבלת קטגוריה ומערך הקטגוריות ומעדכנת את מערך הקטגוריות הבא אם היא לא נמצאת בו
const updatesubCategories = (category, subCategories) => {
    let check = true;
    subCategories.forEach(element => {
        if (category == element)
            check = false;
    });
    if (check)
        subCategories.push(category);
    return subCategories;
}



//
const getLastId=(recipes)=>{
    let ArrayRecipes=[];
    console.log(localStorage.getItem('ArrayRecipes'));
    let resipe;
    if (localStorage.getItem('ArrayRecipes')==null) {
        resipe = recipes.pop();
        recipes.push(resipe);
        id = (resipe.id) + 1;
        // console.log(id);
    }
    else{
        ArrayRecipes=localStorage.getItem('ArrayRecipes');
        resipe=ArrayRecipes.pop();
        console.log(ArrayRecipes);
        ArrayRecipes.push(resipe);
        resipe=JSON.parse(resipe);
        console.log(ArrayRecipes);
        id=(resipe.id)+1;
        console.log(id);
    }
    const btnAddRecipe=document.getElementById('submit');
    btnAddRecipe.onclick=()=>{
        createRecipe();
    }
}
//פונקציה היוצרת את המתכון ומוסיפה אותו ל sessionStorage
const createRecipe = () => {
    const ingredients = document.getElementById("ingredients").value;
    const ingredientsArray = ingredients.split("\n");
    const howToPrepare = document.getElementById("howToPrepare").value;
    const howToPrepareArray = howToPrepare.split("\n");
    // יצירת אוביקט המתכון
    const obgRecipe = {
        id: id,
        name: document.getElementById("nameRecipe").value,
        owner: document.getElementById("nameOwner").value,
        category: getCategories(),
        img: document.getElementById("inputGroupFile04").value,
        ingredients: ingredientsArray,
        howToPrepare: howToPrepareArray,
        time: document.getElementById("time")///ליצור מערך של זמנים
    }

    
    let ArrayRecipes=[];
    if (localStorage.getItem('ArrayRecipe')==null){
        const st = JSON.stringify([obgRecipe]);
        console.log(st);
        localStorage.setItem("ArrayRecipes",st);
    }
    else {
        console.log(obgRecipe);
        const st = JSON.stringify(obgRecipe);
        console.log(st);
        ArrayRecipes.push(st);
        console.log(ArrayRecipes);
        localStorage.setItem("ArrayRecipes", ArrayRecipes);
    }
    // recipes.push(JSON.parse(st));
    // console.log(JSON.parse(st));
}

//פונקציה שמכניסה בכל פעם את הקטגוריות הנוכחיות
let categories;
const getCategories = () => {
    let count = 0;
    categories = document.querySelectorAll(".form-select");
    let categoriesArray = [];
    // console.log(categories);
    categories.forEach(element => {
        count++;
        // console.log(element);
        let c = element.selectedOptions;
        // console.log(c);
        // c.forEach(element => {
        //     categoriesArray.push(c.value);
        // });
        categoriesArray = Array.from(element.selectedOptions).map(option => option.innerHTML);
        // console.log(categoriesArray);
    });
    return categoriesArray;
}

//
const submitEnter = document.getElementById('submit');

submitEnter.onclick=()=>{
    createRecipe();
}

$.ajax({
    url: "../../data/recipes.json",
    success: (result) => {
        console.log(result);
        getAllCategories(result);
        getLastId(result);
        // createRecipe(result);
    },
    error: err => {
        console.log(err);
        console.log("error in ajax");
    }
})
    // sessionStorage.setItem("nameRecipe",inputPassword.innerText);


