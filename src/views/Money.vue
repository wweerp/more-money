<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
        <Types @update:value="onUpdateType"/>
        <Notes field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
        <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
    import Tags from '@/components/Money/Tags.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Types from '@/components/Money/Types.vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import store from "../store/index2";



    @Component({components: {Tags, Notes, Types, NumberPad}})
    export default class Money extends Vue {
        recordList = store.recordList;
        tags = store.fetchTags();
        record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

        onUpdateTags(value: string[]) {
            this.record.tags = value;
        }

        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        onUpdateType(value: string) {
            this.record.type = value;
        }

        onUpdateAmount(value: string) {
            this.record.amount = parseFloat(value);
        }

        saveRecord() {
            store.createRecord(this.record)
        }

    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>
