

import Vuex from 'vuex'
import Vue from 'vue'
import objectPath from 'object-path'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selected: 'profile',
    user: {
      id: '',
      username: ''
    },
    resume: {
      config: [
        {field: 'profile', icon: 'id'},
        {field: 'workHistory', icon: 'work'},
        {field: 'education', icon: 'book'},
        {field: 'projects', icon: 'heart'},
        {field: 'awards', icon: 'cup'},
        {field: 'contacts', icon: 'phone'},
      ],
      profile: {
        name: '张无忌',
        city: '上海',
        title: '前端开发',
        birthday: '1991-10-7'
      },
      workHistory: [
        {company: '小鱼科技', content: '我的第一份工作是小鱼科技,在公司啥都做,'},
        {company: '小猫科技', content: '我的第二份工作是小猫科技,在公司啥都干'}
      ],
      education: [
        {school: '家里蹲中学', content: '高中'},
        {school: '家里蹲大学', content: '大专'}
      ],
      projects: [
        { name: 'proA', content: '文字'},
        { name: 'proB', content: '文字'}
      ],
      awards: [
        { name: '再来一瓶', content: '康师傅冰红茶'},
        { name: '三号学生', content: '在校三好学生'},
        { name: '好人卡', content: '好多好人卡'}
      ],
      contacts: [
        { contact: 'phone', content: '1498384343'},
        { contact: 'qq', content: '123124560'}
      ],
    }
  },
  mutations: {
    initState(state,payload){
      Object.assign(state, payload)
    },
    switchTab(state,payload) {
      state.selected = payload
    },
    updateResume(state,{path, value}){
      // state.resume[field][subfield] = value
      objectPath.set(state.resume, path, value)
      localStorage.setItem('state',JSON.stringify(state))
    },
    setUser(state,payload){
      Object.assign(state.user, payload)
      console.log(state.user)
    },
    removeUser(state) {
      state.user.id = null
    }
  }
})
