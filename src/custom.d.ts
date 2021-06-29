type RecordItem = {
    tags: string[];
    notes: string;
    type: string;
    amount: number; // 数据类型 object | string
    createTime?: Date; // 类或构造函数  ？表示这个属性的值可以不存在
}

type TagItem = {
    id: string;
    name: string;
    createTime?: Date;
}
