<template>
  <a-table :columns="columns" :data-source="data" :loading="loading">
    <a slot="stuname" slot-scope="text">{{ text }}</a>
  </a-table>
</template>
<script>
import { getTeacher } from "../api/index.js";
import { message } from "ant-design-vue";

const columns = [
  {
    title: "姓名",
    dataIndex: "stuname",
    key: "stuname",
    scopedSlots: { customRender: "stuname" },
  },
  {
    title: "老师",
    dataIndex: "teachername",
    key: "teachername",
  },
];

export default {
  props: ["stuname", "id"],
  async mounted() {
    const { data } = await getTeacher(this.id);
    message.success("成功获取数据");
    this.loading = false;
    this.data = [data];
  },
  data() {
    return {
      data: [],
      columns,
      loading: true,
    };
  },
};
</script>
