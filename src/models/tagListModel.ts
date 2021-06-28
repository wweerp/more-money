const tagListModel = {
    fetch(){
        return JSON.parse(window.localStorage.getItem('taglist') || '[]')
    },
    save(data:string[]){
        window.localStorage.setItem('taglist', JSON.stringify(data));
    }
}
export default tagListModel