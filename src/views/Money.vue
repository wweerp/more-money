<template>
    <Layout class-prefix="layout">
        <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
        <Types :value.sync="record.type" :data-source="RTList"/>
        <Notes field-name="备注" placeholder="在这里输入备注" @update:value="onUpdateNotes"/>
        <Tags @update:value="onUpdateTags"/>
    </Layout>
</template>

<script lang="ts">
    import Tags from '@/components/Money/Tags.vue';
    import Notes from '@/components/Money/Notes.vue';
    import Types from '@/components/Money/Types.vue';
    import NumberPad from '@/components/Money/NumberPad.vue';
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import recordTypeList from '@/constants/recordTypeList';



    @Component({components: {Tags, Notes, Types, NumberPad}})
    export default class Money extends Vue {
        get recordList() {
            return this.$store.state.recordList;
        }
        record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

        RTList = recordTypeList;

        onUpdateTags(value:string[]){
            this.record.tags = value;
        }
        onUpdateNotes(value: string) {
            this.record.notes = value;
        }

        onUpdateAmount(value: string) {
            this.record.amount = parseFloat(value);
        }

        saveRecord() {
            this.$store.commit('createRecord',this.record)
        }

    }
</script>

<style lang="scss">
    .layout-content {
        display: flex;
        flex-direction: column-reverse;
    }
</style>
