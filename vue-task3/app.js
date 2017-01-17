
import Vue from 'vue'

var app = new Vue({
	el: '#app',
	data: {
		msg: 'This is todo list',
		newTodo: '',
		todoList: []
	},
	methods: {
		addTodo() {
			if(!/\S/g.test(this.newTodo)){
				return alert('不能为空哦')
			}
			//获取当前时间
      let time = new Date(),
        year = time.getFullYear(),
        month = time.getMonth()+1,
        day = time.getDate(),
        hour = time.getHours(),
        minute = time.getMinutes(),
				timeStr = year+'.'+ month+'.'+day+'>'+hour+':'+minute;

			this.todoList.push({
				title: this.newTodo,
				createdAt: timeStr,
				done: false
			})
			this.newTodo = '';
		},
		removeTodo(todo) {
			let idx = this.todoList.indexOf(todo);
			this.todoList.splice(idx,1)
		}
	},
	created() {
		//将数据保存在localStorage里防止关闭浏览器丢失
    window.onbeforeunload =()=>{
			let dataString = JSON.stringify(this.todoList);
    	window.localStorage.setItem('myTodos',dataString);
      let todoString = JSON.stringify(this.newTodo);
      window.localStorage.setItem('newTodo',todoString);
		}
		let oldDataString = window.localStorage.getItem('myTodos')
		let oldData = JSON.parse(oldDataString)
		this.todoList = oldData || []

		let oldTodos = window.localStorage.getItem('newTodo')
		let oldTodo = JSON.parse(oldTodos)
		this.newTodo = oldTodo || ''
	}
 })
