//אנימציה של מעבר מהרשמה להתחברות 
$("#signup").click(function() {
    $(".message").css("transform", "translateX(100%)");
    if ($(".message").hasClass("login")) {
      $(".message").removeClass("login");
    }
    $(".message").addClass("signup");
  });
  
  $("#login").click(function() {
    $(".message").css("transform", "translateX(0)");
    if ($(".message").hasClass("login")) {
      $(".message").removeClass("signup");
    }
    $(".message").addClass("login");
  });
  // כפתור חזרה לעמוד קודם
  const previus= document.querySelector('.previus');
  previus.onclick=()=>{
    console.log(previus);

  history.back();
  }

  ////////// sighn in////////////
// שמירת פירטי לקוח חדש
let ourMembers = JSON.parse(localStorage.getItem('memberDetails')) || [];
const _sighUpButton=document.querySelector('.sighUpButton');
let flag=false;
let flagPassword=false;
_sighUpButton.onclick=() =>{
// input שומר את הערך שהוכנס בכל 
let userName= document.getElementById('name').value;
let userAddress= document.getElementById('address').value;
let userPhone= document.getElementById('phone').value;
let userMail= document.getElementById('email').value;
let userPassword= document.getElementById('password').value;
// ולידציות לבדיקת תקינות הקלט 
if(ValidateEmail(userMail) && phonenumber(userPhone) && allLetter(userName)&& alphanumeric(userAddress)){
  for (let i = 0; i < ourMembers.length; i++) {
    // אם השם הנוכחי קיים כבר 
    if (ourMembers[i].Name=== userName && ourMembers[i].Address === userAddress && ourMembers[i].Phone === userPhone && ourMembers[i].Mail === userMail){
      flag=true;
    }
    if(ourMembers[i].Password===userPassword){
      flagPassword=true;
  }
}
  // אם השם לא קיים
  //  local storage יוצר אובייקט עם פרטי הלקוח החדש ומכניס ל
  if (flag===false && flagPassword===false){
    const object={
      Name: userName,
      Address: userAddress,
      Phone: userPhone,
      Mail: userMail,
      Password: userPassword,
      recipes:[]
    }
    ourMembers.push(object);
    localStorage.setItem('memberDetails', JSON.stringify(ourMembers));
    // sessionStorage.setItem('currentUser',JSON.stringify(object));/////
    sessionStorage.setItem('currentUser');
    document.location.href=`../../pages/home/home.html`;
    alert('הפרטים נקלטו בהצלחה');
  }
  else{
    if(flag===true){
      alert('➡ log in -משתמש קיים. עבור ל');
      userMail="";
      userPhone="";
      userPassword="";
      userAddress="";
      userName="";
    }
    else{
      alert('סיסמא קיימת. בחר סיסמא חדשה.');
    }
    console.log([flag ,flagPassword]);
    flag=false;
    console.log([flag ,flagPassword]);
    flagPassword=false;
  }
}
else
    {
      return;
    }   
}
////////// log in////////////
// הצגת פרטי לקוח קיים
//  login אם נכנס ל
// אוטומטית משלים אותו כי הוא שמור במערכת
const _login= document.getElementById('login');
const memberName=document.getElementById('loginNM');
const memberPssword= document.getElementById('loginPW');
// מילוי אוטומטי של שם וסיסמא
_login.onclick=()=>{
if (ourMembers!=[]||ourMembers!=null){
  memberName.value=ourMembers[ourMembers.length-1].Name;
  memberPssword.value=ourMembers[ourMembers.length-1].Password;
  }
}
//  עובר לעמוד ראשי לאחר אישור פרטי חבר
const _logInButton=document.querySelector('.logInButton');
_logInButton.onclick=()=>{
  let existNameAndPassword=false;
  for (let i = 0; i < ourMembers.length; i++) {
    if (memberName.value===ourMembers[i].Name  && memberPssword.value===ourMembers[i].Password){
        sessionStorage.setItem('currentUser',JSON.stringify(ourMembers[i]));
        document.location.href=`../../pages/home/home.html`;
        existNameAndPassword=true;
      }
    }   
    if(!existNameAndPassword){
      alert("הנתונים שגויים");
      existNameAndPassword=false;  
    }
  }


// mail validation
function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.match(mailformat))
{
return true;
}
else
{
alert("מייל שגוי");
return false;
}
}
// phone vlidation
function phonenumber(inputtxt)
{
var phoneno = /^\d{10}$/;
if((inputtxt.match(phoneno)))
    {
  return true;
    }
else
  {
  alert("טלפון שגוי");
  return false;
  }
}
// name validation
function allLetter(inputtxt)
{
 var letters = /^[a-zA-Zא-ת\s]*$/;
 if(inputtxt.match(letters))
   {
    return true;
   }
 else
   {
   alert("שם שגוי");
   return false;
   }
}
// address validation
function alphanumeric(inputtxt)
{
var letterNumber = /^[0-9a-zA-Zא-ת\s]*$/;
if((inputtxt.match(letterNumber))) 
{
 return true;
}
else
{ 
 alert("כתובת שגויה"); 
 return false; 
}
}
// password validation// לא בשימוש כרגע...
function CheckPassword(inputtxt) 
{ 
var passw=  /^[0-9a-zA-Z]+$/;
if((inputtxt.match(passw)) )
{
 return true;
}
else
{ 
 alert("סיסמא שגויה"); 
 return false; 
}
}
//בדיקת סיסמא בהתאמה לשם משתמש
function CheckPassword2(inputtxt, i) {
  if (inputtxt===ourMembers[i].Password){
      return true;
  }
  else{
      alert('סיסמא לא זהה לסיסמא השמורה')
      return false; 
  }
}

//empty validation //לא בשימוש כרגע...
function required(inputtx) 
{
if (inputtx.value.length == 0)
 { 
    alert("חובה למלא את כל הפרטים");    
    return false; 
 }    
 return true; 
} 

