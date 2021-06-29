const tagListModel = {
    clone(data: TagItem) {
        return JSON.parse(JSON.stringify(data));
    },
    fetch(){
        return JSON.parse(window.localStorage.getItem('taglist') || '[]')
    },
    save(data:TagItem[]){
        window.localStorage.setItem('taglist', JSON.stringify(data));
    }
}
export default tagListModel
