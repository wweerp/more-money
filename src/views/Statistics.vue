<template>
    <Layout>
        <Types class-prefix="type" :data-source="RTList" :value.sync="type"/>
        <ol v-if="groupedList.length > 0">
            <li v-for="(group, index) in groupedList" :key="index">
                <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
                <ol>
                    <li v-for="item in group.items" :key="item.id" class="record">
                        <span>{{tagString(item.tags)}}</span>
                        <span class="notes">{{item.notes}}</span>
                        <span>￥{{item.amount}} </span>
                    </li>
                </ol>
            </li>
        </ol>
        <div v-else class="noResult">
            没有相关记录
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Types from '@/components/Money/Types.vue';
    import recordTypeList from '@/constants/recordTypeList';
    import {Component} from 'vue-property-decorator';
    import dayjs from 'dayjs'
    import clone from "../lib/clone";

    @Component({components: {Types}})
    export default class Statistics extends Vue {
        type = '-';
        RTList = recordTypeList;

        get recordList() {
            return (this.$store.state as RootState).recordList;
        }

        beforeCreate() {
            this.$store.commit('fetchRecords');
        }

        tagString(tags: Tag[]) {
            return tags.length === 0 ? '无' : tags.map(t=>t.name).join('，');
        }

        beautify(string: string) {
            const day = dayjs(string);
            const now = dayjs();
            if (day.isSame(now, 'day')) {
                return '今天';
            } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
                console.log('hi');
                return '昨天';
            } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
                return '前天';
            } else if (day.isSame(now, 'year')) {
                return day.format('M月D日');
            } else {
                return day.format('YYYY年M月D日');
            }
        }

        get groupedList() {
            const {recordList} = this;

            if (recordList.length === 0) {return [];}
            const newList = clone(recordList).filter(r => r.type === this.type).sort((a, b) => dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf());
            type Result = { title: string, total?: number, items: RecordItem[] }[]
            if(newList.length === 0) {return [] as Result}

            const result: Result = [{title: dayjs(newList[0].createTime).format('YYYY-MM-DD'), items: [newList[0]]}];
            for (let i = 1; i < newList.length; i++) {
                const current = newList[i];
                const last = result[result.length - 1];
                if (dayjs(last.title).isSame(dayjs(current.createTime), 'day')) {
                    last.items.push(current);
                } else {
                    result.push({title: dayjs(current.createTime).format('YYYY-MM-DD'), items: [current]});
                }
            }

            result.map(group => {
                group.total = group.items.reduce((sum, item) => {
                    console.log(sum);
                    console.log(item);
                    return sum + item.amount;
                }, 0);
            });
            return result;
        }


    }
</script>

<style scoped lang="scss">
    ::v-deep {
        .type-tabs-item {
            background: #c4c4c4;
            &.selected {
                background: white;
                &::after {
                    display: none;
                }
            }
        }
    }

    %item {
        padding: 8px 16px;
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        align-content: center;
    }
    .title {
        @extend %item;
    }
    .record {
        background: white;
        @extend %item;
    }
    .notes {
        margin-right: auto;
        margin-left: 16px;
        color: #999;
    }

    .noResult{
        padding: 16px;
        text-align: center;
    }

</style>
