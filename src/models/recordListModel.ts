const recordListModel = {
    clone(data: RecordItem[] | RecordItem) {
        return JSON.parse(JSON.stringify(data));
    },
    fetch(){
        return JSON.parse(window.localStorage.getItem('recordlist') || '[]')
    },
    save(data:RecordItem[]){
        window.localStorage.setItem('recordlist', JSON.stringify(data));
    }
}
export default recordListModel
