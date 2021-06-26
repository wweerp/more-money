<template>
    <div class="tags">
        <div class="new">
            <button @click="create">新增标签</button>
        </div>
        <ul class="current">
            <li v-for="tag in dataSource" :key="tag" :class="{selected: selectedTags.indexOf(tag)>=0}" @click="toggleTag(tag)">{{tag}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component,Prop} from 'vue-property-decorator';

    @Component
    export default class Tags extends Vue {
        @Prop() dataSource:string[] | undefined;
        selectedTags : string[] = [];

        toggleTag(tag:string){
            const index = this.selectedTags.indexOf(tag);
            if(index >= 0){
                this.selectedTags.splice(index,1);
            }else{
                this.selectedTags.push(tag);
            }
        }

        create(){
            const name = window.prompt('请输入标签名');
            if (name === '') {
                window.alert('标签名不能为空');
            } else {
                this.$emit('update:dataSource', [...this.dataSource, name]);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        display: flex;
        flex-direction: column-reverse;
        padding: 16px;
        font-size: 14px;
        flex-grow: 1;
        > .current {
            display: flex;
            flex-wrap: wrap;
            > li {
                background: #d9d9d9;
                height: 24px;
                line-height: 24px;
                border-radius: 12px;
                padding: 0 16px;
                margin-right: 12px;
                margin-top: 4px;
                &.selected {
                    background: blue;
                    color: white;
                }
            }
        }
        > .new {
            padding-top: 16px;
            button {
                border: none;
                color: #999999;
                background: transparent;
                border-bottom: 1px solid;
                padding: 0 4px;
            }
        }
    }

</style>
