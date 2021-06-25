




 





export const apiUrl =()=>{
    console.log(process.env.NODE_ENV)
    let Url
    if (process.env.NODE_ENV ==='production') {
      return Url = 'https://api-remi-hr.herokuapp.com'
     }else{
       
       return  Url = 'http://localhost:5000'
     }
}







