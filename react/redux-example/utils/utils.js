module.exports = {
    fetchData:(id)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
               resolve(id)
            },500)
        });
    }
}