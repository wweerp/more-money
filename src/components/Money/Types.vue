<template>
    <div>
        <ul class="types" :class="{[classPrefix + '-tabs']:classPrefix}">
            <li class="tabs-item" v-for="item in dataSource" :key="item.value" :class="liClass(item)"
                @click="select(item)">{{item.text}}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';

    type DataSourceItem = { text: string, value: string }

    @Component
    export default class Types extends Vue {
        @Prop(String) value!: string;
        @Prop(String) classPrefix?: string;
        @Prop({required: true, type: Array}) dataSource!: DataSourceItem[];

        select(item: DataSourceItem) {
            this.$emit('update:value', item.value);
        }

        liClass(item: DataSourceItem) {
            return {
                [this.classPrefix + '-tabs-item']: this.classPrefix,
                selected: item.value === this.value
            };
        }
    }
</script>

<style lang="scss" scoped>
    .types {
        background: #C4C4C4;
        display: flex;
        font-size: 24px;

        > li {
            width: 50%;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            &.selected::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: #333;
            }
        }
    }
</style>
