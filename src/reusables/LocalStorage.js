 export const addToLocalStorage =(response,key)=>{
    let item;
    if (localStorage.getItem(key)===null) {
        item = []
    }else{
      item = JSON.parse(localStorage.getItem(key))
    }

    item.push(response)

     localStorage.setItem(key,JSON.stringify(item))

}


