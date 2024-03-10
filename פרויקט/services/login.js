const btnEntering=document.getElementById('btnEnter');
const sName=document.getElementById('spanName');
const myRecipes=document.getElementById('liMyRecipes');
btnEntering.onclick=()=>{
    switch(btnEntering.innerText){
        case"התחבר":{
            const divLogin=document.getElementById('login');
            if(divLogin.classList!="z-2 position-absolute p-5 fixed-top rounded-0"){
                divLogin.classList="z-2 position-absolute p-5 fixed-top rounded-0";
                divLogin.style.backgroundColor="rgb(214, 206, 206)";
                const divLoggg=document.createElement('div');
                const span=document.createElement('span');
                span.innerText="הזן סיסמא";
                const formLogin =document.createElement('form');
                const inputName=document.createElement('input');
                inputName.type="text";
                inputName.style.display="none";
                inputName.classList="input-group-text";

                const inputPelephone=document.createElement('input');
                inputPelephone.type="number";
                inputPelephone.style.display="none";
                inputPelephone.classList="input-group-text";

                const inputEmail=document.createElement('input');
                inputEmail.type="email";
                inputEmail.style.display="none";
                inputEmail.classList="input-group-text";

                const inputPassword=document.createElement('input');
                inputPassword.type="password";
                inputPassword.classList="input-group-text";

                const aLoginOrIForgotPassword=document.createElement('a');
                aLoginOrIForgotPassword.innerText=" שכחתי סיסמא /הירשם";
                const aConnect=document.createElement('a');
                aConnect.innerText=" התחבר";
                const btnContinue=document.createElement('button');
                btnContinue.innerText="אישור";
                btnContinue.classList="btn btn-light";
                
                aLoginOrIForgotPassword.onclick=()=>{
                    inputName.style.display="inline";
                    inputPelephone.style.display="inline";
                    inputEmail.style.display="inline";
                    inputPassword.style.display="none";
                    span.innerText="שלב א' מילוי פרטים אישיים";
                    btnContinue.innerText="מעבר לשלב ב'"; 
                }
                aConnect.onclick=()=>{
                    inputName.style.display="none";
                    inputPelephone.style.display="none";
                    inputEmail.style.display="none";
                    inputPassword.style.display="inline";
                    span.innerText="הזן סיסמא";
                    btnContinue.innerText="אישור";
                }
                btnContinue.onclick=(event)=>{
                    event.preventDefault();
                    switch(btnContinue.innerText){
                        case "אישור":{
                            const user=JSON.parse(localStorage.getItem(inputPassword.value)); 
                            console.log(user);
                            if(user==null){
                                span.innerText="סיסמא שגויה, נסה שנית";
                            }
                            else{
                                sessionStorage.setItem("currentUser",inputPassword.value);
                                sessionStorage.setItem("currentUserName",user.name);
                                sName.innerText=user.name;
                                divLogin.removeChild(divLoggg);
                                btnEntering.innerText="התנתק";
                                myRecipes.style.display="list-item";
                                divLogin.classList=" "; 
                            }
                            break;
                        }
                        case "אשר והמשך לגלוש":{
                                const psw=localStorage.getItem(`${inputName.value} ${inputPelephone.value} ${inputEmail.value}`);
                                sessionStorage.setItem("currentUser",psw);
                                sessionStorage.setItem("currentUserName",inputName.value);
                                sName.innerText=`${inputName.value}`;
                                divLogin.removeChild(divLoggg);
                                btnEntering.innerText="התנתק";
                                myRecipes.style.display="list-item";
                                divLogin.classList=" ";
                                break;
                        }
                        case "המשך לגלוש":{
                            divLogin.removeChild(divLoggg);
                            btnEntering.innerText="התנתק";
                            myRecipes.style.display="list-item";
                            divLogin.classList=" ";
                        }
                        case "מעבר לשלב ב'":{
                            if(inputEmail.value==""||inputName.value==""||inputPelephone.value=="")
                                span.innerText="קלט לא תקין-שדה אחד או יותר לא מילאת";
                            else
                                if(inputEmail.value[0]==" "||inputName.value[0]==" "||inputPelephone.value[0]==" ")
                                span.innerText="קלט לא תקין-שדה אחד או יותר מתחיל ברווח";
                                else{
                                    const psw=localStorage.getItem(`${inputName.value} ${inputPelephone.value} ${inputEmail.value}`);
                                    console.log(psw);
                                    if(psw!=undefined){
                                        span.innerText="הנך רשום/ה במערכת הסיסמא שלך היא:"+psw;
                                        inputEmail.style.display="none";
                                        inputName.style.display="none";
                                        inputPelephone.style.display="none";;
                                        btnContinue.innerText="אשר והמשך לגלוש";
                                        console.log(psw);
                        
                                    }
                                    else{
                                        inputEmail.style.display="none";
                                        inputName.style.display="none";
                                        inputPelephone.style.display="none";
                                        inputPassword.style.display="inline";
                                        span.innerText="בחר/י לך סיסמא";
                                        btnContinue.innerText="סיים רישום";
                                        console.log("else");
                        
                                    }
                                }
                        break;
                        }
                        case("סיים רישום"):{
                            var checkPsw=localStorage.getItem(inputPassword.value);
                            if(checkPsw!=undefined||inputPassword.value==""||inputPassword.value[0]==" ")
                                span.innerText="לא ניתן לבחור סיסמא זו בחר סיסמא חדשה";
                            else{
                                inputPassword.style.display="none";
                                const obgUser={
                                    name:inputName.value,
                                    pelephone:inputPelephone.value,
                                    email:inputEmail.value, 
                                    recipes:[1,2],
                                    notes:[{id:1,add:"ניתן להפחית לחצי את כמות השמן"},{id:2,add:"להוסיף רבע כוס סוכר"}]
                                }
                                localStorage.setItem(inputPassword.value,JSON.stringify(obgUser));
                                localStorage.setItem(`${inputName.value} ${inputPelephone.value} ${inputEmail.value}`,inputPassword.value);
                                sessionStorage.setItem("currentUser",inputPassword.value);
                                console.log(inputPassword.value);
                                sessionStorage.setItem("currentUserName",inputName.value);
                                sName.innerText=inputName.value;
                                span.innerHTML="נרשמת בהצלחה";
                                btnContinue.innerText="המשך לגלוש";

                            }
                            break;
                        }
                    }


                }

                //הוספת האלמנטים לעץ הdom
                divLogin.appendChild(divLoggg);
                divLoggg.appendChild(span);
                divLoggg.appendChild(formLogin);
                divLoggg.appendChild(aConnect);
                divLoggg.appendChild(aLoginOrIForgotPassword);
                formLogin.appendChild(inputName);
                formLogin.appendChild(inputPelephone);
                formLogin.appendChild(inputEmail);
                formLogin.appendChild(inputPassword);
                formLogin.appendChild(btnContinue);

            }
            
        }
        case "התנתק":{
            sessionStorage.removeItem('currentUserName');
            sessionStorage.removeItem('currentUser');
            btnEntering.innerText="התחבר";
            myRecipes.style.display="none";
            sName.innerText="";
            if(document.title=="myRecipes")
                document.location.href="../../pages/home/home.html";
        }
    }
}