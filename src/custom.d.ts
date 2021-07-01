type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number; // 数据类型 object | string
    createTime?: Date; // 类或构造函数  ？表示这个属性的值可以不存在
}

type Tag = {
    id: string;
    name: string;
}

type TagItem = {
    id: string;
    name: string;
    createTime?: Date;
}

type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'success' | 'duplicated' // 联合类型
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
    remove: (id: string) => boolean
    save: () => void
}
