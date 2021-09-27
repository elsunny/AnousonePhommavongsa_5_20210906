//////////////////////////////////
// manage cart form 
/////////////////////////////////

// get the form
let form = document.querySelector('#cartForm');

// listen change on input email field
form.email.addEventListener('change', () => {
    checkEmail(this);
})

// check email expression
const checkEmail = (inputEmail) => {
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$','g'
    );
    console.log(inputEmail.value);
    if (emailRegExp.test(inputEmail.value)) {
        console.log('email valide');
    } else {console.log('email non valide');}
}