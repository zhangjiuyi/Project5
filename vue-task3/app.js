
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
			this.todoList.push({
				title: this.newTodo,
				createdAt: new Date(),
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
    window.onbeforeunload =()=>{
			let dataString = JSON.stringify(this.todoList);
    	window.localStorage.setItem('myTodos',dataString);
		}
		let oldDataString = window.localStorage.getItem('myTodos')
		let oldData = JSON.parse(oldDataString)
		this.todoList = oldData || []
	}

 })
