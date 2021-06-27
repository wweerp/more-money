const recordListModel = {
    clone(data: RecordItem[]) {
        return JSON.parse(JSON.stringify(data));
    },
    fetch(){
        return JSON.parse(window.localStorage.getItem('recordlist') || '[]') as RecordItem
    },
    save(data:RecordItem[]){
        window.localStorage.setItem('recordlist', JSON.stringify(data));
    }
}
export default recordListModel