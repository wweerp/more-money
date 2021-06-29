<template>
    <Layout>
        <div class="tags">
            <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
                <span>{{ tag.name }}</span>
                <Icon name="right"/>
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <button class="createTag" @click="createTag">新建标签</button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import tagListModel from '@/models/tagListModel';

    const tagList = tagListModel.fetch();

    @Component
    export default class Labels extends Vue {
        tags: TagItem[] = tagList;
        tag: TagItem = {id:'',name:''};

        createTag() {
            const name = window.prompt('请输出标签名');
            //判断输入的标签名是否重复
            const tagNow = this.tags.filter(t => t.id === name)[0];
            if (name === '') {
                window.alert('输入的标签名不能为空');
            } else if (name == null) {
                return;
            } else if(tagNow){
                window.alert('输入的标签名重复');
            }else{
                this.tag.id = name;
                this.tag.name = name;
                this.tag.createTime = new Date();
                const tag2: TagItem = tagListModel.clone(this.tag); //深拷贝一个tag
                this.tags.push(tag2);
                tagListModel.save(this.tags);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        background: white;
        font-size: 16px;
        padding-left: 16px;

        > .tag {
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;

            svg {
                width: 18px;
                height: 18px;
                color: #666;
                margin-right: 16px;
            }
        }
    }

    .createTag {
        background: #767676;
        color: white;
        border-radius: 4px;
        border: none;
        height: 40px;
        padding: 0 16px;

        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 28px;
        }
    }
</style>
