export default function getToken(){
  let cookieArr = document.cookie.split(";");
  for(let i=0; i<cookieArr.length; i++){
    let temp = cookieArr[i].split("=");
    if(temp[0].trim() == 'Authorization') return temp[1];
  }
  return false;
}