<template>
  <a-table :columns="columns" :data-source="data" :loading="loading">
    <a slot="name" slot-scope="text">{{ text }}</a>
  </a-table>
</template>
<script>
import { getCourse } from "../api/index";
import { message } from "ant-design-vue";
const columns = [
  {
    title: "Name",
    dataIndex: "stuname",
    key: "stuname",
    scopedSlots: { customRender: "stuname" },
  },
  {
    title: "课程",
    dataIndex: "coursename",
    key: "coursename",
  },
];
export default {
  async mounted() {
    // message.info("获取数据中...");
    const { data } = await getCourse(this.id);
    message.success("获取成功");
    this.loading = false;
    this.data = [data];
  },
  props: ["name", "id"],
  data() {
    return {
      data: [],
      columns,
      subjectName: ["text", "math", "english", "optional", "limit"],
      loading: false,
    };
  },
};
</script>
