<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Types :value.sync="record.type" :data-source="RTList"/>
    <Notes :value="record.notes" @update:value="onUpdateNotes" field-name="备注" placeholder="在这里输入备注" />
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

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    //清空notes
    this.record.notes = '';
  }

}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
