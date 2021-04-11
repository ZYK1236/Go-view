import axios from "../utils/service";
import store from "../store/index";

export const checkUrlRight = (num = 1) => {
  const BASEURL = store.state.baseUrl;
  return axios({
    method: "get",
    url: BASEURL + store.state.afterUrl_1,
    params: {
      pageNum: num,
    },
  });
};

export const getCourse = (id) => {
  const BASEURL = store.state.baseUrl;
  return axios({
    method: "get",
    url: BASEURL + store.state.afterUrl_2,
    params: {
      stuno: id,
    },
  });
};

export const getTeacher = (id) => {
  const BASEURL = store.state.baseUrl;

  return axios({
    method: "get",
    url: BASEURL + store.state.afterUrl_3,
    params: {
      stuno: id,
    },
  });
};

export const findCourse = () => {
  const BASEURL = store.state.baseUrl;

  return axios({
    method: "get",
    url: BASEURL + store.state.afterUrl_4,
  });
};

export const postMsg = (value) => {
  const BASEURL = store.state.baseUrl;

  return axios({
    method: "post",
    url: BASEURL + store.state.afterUrl_6,
    data: value,
  });
};

export const findTeacher = () => {
  const BASEURL = store.state.baseUrl;

  return axios({
    method: "get",
    url: BASEURL + store.state.afterUrl_5,
  });
}
