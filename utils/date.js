const formateDate = (date)=>{
    const isoDate = new Date(date);
    console.log(isoDate,'isoDate')
    const formattedDate = isoDate.toISOString().split('T')[0];
    console.log(date)
    return formattedDate
}

export { formateDate }