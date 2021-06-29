<template>
  <div>
    <label class="notes">
      <span class="name">{{this.fieldName}}</span>
      <input type="text" :placeholder="this.placeholder" :value="value" @input="onNotesChanged($event.target.value)">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  @Prop({default:''}) readonly  value : string;
  @Prop({required:true}) fieldName : string
  @Prop() placeholder:string
  @Watch('value')
  onNotesChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    flex-grow: 1;
    height: 64px;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>
