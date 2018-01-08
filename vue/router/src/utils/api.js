function fetchItem(id){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            const data ={title: `data with ${id}`};
            resolve(data)
        },2000);
    });
}

export {fetchItem}