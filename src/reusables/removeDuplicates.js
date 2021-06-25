export const removeDuplicates=(array)=> {
    let a = []
    array.map(x => {
      if(!a.includes(x)) {
        a.push(x)

      }
    })
    return a
  };