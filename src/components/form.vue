<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="姓名" has-feedback>
      <a-input
        v-decorator="[
          'stuname',
          {
            rules: [
              {
                required: true,
                message: '请输入姓名!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="选择课程" has-feedback>
      <a-select
        v-decorator="[
          'courseid',
          {
            rules: [{ required: true, message: '请输入课程' }],
          },
        ]"
      >
        <a-select-option v-for="item in chooseCourseItem" :key="item.id">
          {{ item.coursename }}(id:{{ item.id }})
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="选择老师" has-feedback>
      <a-select
        v-decorator="[
          'teacherid',
          {
            rules: [{ required: true, message: '请输入老师' }],
          },
        ]"
      >
        <a-select-option v-for="item in chooseTeacherItem" :key="item.id">
          {{ item.teachername }}(id:{{ item.id }})
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="学号" has-feedback>
      <a-input
        v-decorator="[
          'stuno',
          {
            rules: [
              {
                required: true,
                message: '请输入学号',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="性别" has-feedback>
      <a-select
        v-decorator="[
          'sex',
          {
            rules: [{ required: true, message: '请输入性别' }],
          },
        ]"
      >
        <a-select-option v-for="i in chooseItem" :key="i">
          {{ i }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="出生日期" has-feedback>
      <a-date-picker
        v-decorator="[
          'birthday',
          {
            rules: [{ required: true, message: '请输入出生日期' }],
          },
        ]"
        style="width: 100%"
      />
    </a-form-item>
    <a-form-item v-bind="tailFormItemLayout">
      <a-button type="primary" html-type="submit"> 提交数据 </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import { message } from "ant-design-vue";
import { findCourse, findTeacher, postMsg } from "../api/index";
export default {
  data() {
    return {
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      },
      chooseItem: ["男", "女"],
      chooseCourseItem: [],
      chooseTeacherItem: [],
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  async mounted() {
    const { data } = await findCourse();
    const teachers = await findTeacher();
    this.chooseCourseItem = data;
    this.chooseTeacherItem = teachers.data;
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          values.birthday = values.birthday._d.getTime().toString() - 0;
          const { code } = await postMsg(values);
          if (code === 1) {
            message.success("上传数据成功，正在跳转页面");
            setTimeout(() => {
              this.$router.go(0);
            }, 1000);
          }
        }
      });
    },
  },
};
</script>
