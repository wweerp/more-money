<template>
  <Layout>
    <Types class="x" :value.sync="xxx"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Types from '@/components/Money/Types.vue';
import {Component} from 'vue-property-decorator';
import dayjs from 'dayjs'

@Component({components: {Types}})
export default class Statistics extends Vue {
  xxx = '-'
}
</script>

<style scoped lang="scss">
 .x ::v-deep li {
   background:#c4c4c4;
   &.selected{
     background:white;
     &::after{
       display: none;
     }
   }
 }

</style>