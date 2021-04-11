<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      :loading="loading"
      :pagination="pageSetter"
      @change="changePage"
    >
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" />学生姓名</span>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="showModal_1(record)"
          >查看学生选了什么课程</a-button
        >
        <a-divider type="vertical" />
        <a-button type="link" @click="showModal_2(record)"
          >查看学生对应老师</a-button
        >
      </span>
    </a-table>
    <a-modal
      v-model="visible_1"
      title="学生成绩表格"
      @ok="handleOk_1"
      style="width: 80%"
      :destroyOnClose="boolean"
    >
      <Grade :name="name" :id="id"></Grade>
    </a-modal>
    <a-modal
      v-model="visible_2"
      title="任课老师表格"
      @ok="handleOk_2"
      style="width: 80%"
      :destroyOnClose="boolean"
    >
      <Teachers :name="name" :id="id"></Teachers>
    </a-modal>
  </div>
</template>
<script>
import Grade from "../components/grade";
import Teachers from "../components/teachers";
import { checkUrlRight } from "../api/index";

const columns = [
  {
    align: "center",
    dataIndex: "stuname",
    key: "stuname",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "stuname" },
  },
  {
    align: "center",
    title: "出生日期",
    dataIndex: "birthday",
    key: "birthday",
  },
  {
    align: "center",
    title: "学号",
    dataIndex: "stuno",
    key: "stuno",
  },
  {
    align: "center",
    title: "性别",
    key: "sex",
    dataIndex: "sex",
  },
  {
    align: "center",
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

export default {
  async mounted() {
    // console.log(666);

    try {
      const { data, totalcount } = await checkUrlRight();

      this.loading = false;
      this.pageSetter.total = totalcount;

      // data是一个数组
      data.forEach((element) => {
        element.birthday = new Date(element.birthday)
          .toLocaleString()
          .slice(0, -10);
        element.sex = element.sex ? "男" : "女";
      });
      this.data = this.data.concat(data);
    } catch (error) {
      console.log("出错了", error);
    }
  },
  data() {
    return {
      visible_1: false,
      visible_2: false,
      data: [],
      columns,
      name: "",
      id: 0,
      boolean: true,
      loading: true,
      pageSetter: { defaultPageSize: 5, total: 0 },
      checked: [],
    };
  },
  components: {
    Grade,
    Teachers,
  },
  methods: {
    showModal_1(record) {
      this.visible_1 = true;
      this.name = record.name;
      this.id = record.stuno;
    },
    showModal_2(record) {
      this.visible_2 = true;
      this.name = record.name;
      this.id = record.stuno;
    },
    handleOk_1(e) {
      console.log(e);
      this.visible_1 = false;
    },
    handleOk_2(e) {
      console.log(e);
      this.visible_2 = false;
    },
    async changePage(page) {
      try {
        const { data, totalcount } = await checkUrlRight(page.current);

        this.loading = false;
        this.pageSetter.total = totalcount;

        // data是一个数组
        data.forEach((element) => {
          element.birthday = new Date(element.birthday)
            .toLocaleString()
            .slice(0, -10);
          element.sex = element.sex ? "男" : "女";
        });
        this.data = data;
      } catch (error) {
        console.log("出错了", error);
      }
    },
  },
};
</script>
