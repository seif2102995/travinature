const user = document.getElementById('username');
const pass = document.getElementById('password');
function signin(){
   if(user.value=="admin"){
      if(pass.value=="admin"){
         window.location.href="./html/admin.html";
      }else{
         console.log("hi1");
      }
   }else if(user.value!=""){
      if(pass.vlaue!=""){
         window.location.href="./html/home.html";
      }else{
         console.log('hi3');
      }
      console.log("hi2");
   }else{
      console.log("username or pssword cannot be empty");
   }
}