<template>
    <layout>
        <div class="navBar">
            <Icon class="leftIcon" name="left" @click.native="goBack"/>
            <span class="title">编辑标签</span>
            <span class="rightIcon"></span>
        </div>
        <div class="form-wrapper">
            <Notes :value="currentTag.name" @update:value="update" field-name="标签名" placeholder="在这里输入标签名"/>
        </div>
        <div class="deleteTag-wrapper">
            <button class="deleteTag" @click="remove">删除标签</button>
        </div>
    </layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import Notes from '@/components/Money/Notes.vue';

    @Component({
        components: {Notes}
    })
    export default class EditLabel extends Vue {
        get currentTag() {
            return this.$store.state.currentTag;
        }

        created() {
            this.$store.commit('fetchTags');
            const id = this.$route.params.id;
            this.$store.commit('setCurrentTag', id);
            if (!this.currentTag){
                this.$router.replace('/404');
            }
        }

        update(name:string) {
            if (this.currentTag) {
               this.$store.commit('updateTag',{id:this.currentTag.id,name:name});
            }
        }

        remove() {
            if(this.currentTag){
                this.$store.commit('removeTag',this.currentTag.id);
                this.$router.back();
            }else{
                alert("删除失败")
            }
        }

        goBack() {
            this.$router.back();
        }

    }
</script>

<style lang="scss" scoped>
    .navBar {
        text-align: center;
        font-size: 16px;
        padding: 12px 16px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > .title {
        }

        > .leftIcon {
            width: 24px;
            height: 24px;
        }

        > .rightIcon {
            width: 24px;
            height: 24px;
        }
    }

    .form-wrapper {
        background: white;
        margin-top: 8px;
    }

    .deleteTag {
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
