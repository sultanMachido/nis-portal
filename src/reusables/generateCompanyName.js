
const generateCompanyName = (companyName)=>{
     
    let rand= Math.floor((Math.random() * 1000) + 1);
    // let name = companyName.split(' ').join('');

    return `${companyName}${rand}`
}




module.exports = generateCompanyName;