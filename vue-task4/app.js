
import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = 'hUSnN2Nsy6Q3KbgjQs2jP2xR-gzGzoHsz';
var APP_KEY = 'Mek3nJMrEgWqjopa8Gl9m4RE';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var app = new Vue({
	el: '#app',
	data: {
    actionType: 'signUp',
		formData: {
    	username: '',
			password: ''
		},
		user: '',
    msg: 'This is todo list',
		newTodo: '',
		todoList: [],
		currentUser: null
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
		},
		signUp() {
			console.log('我是注册')
      // 新建 AVUser 对象实例
      let user = new AV.User();
      // 设置用户名
      user.setUsername(this.formData.username);
      // 设置密码
      user.setPassword(this.formData.password);

      user.signUp().then( (loginedUser)=> {
      	alert('注册成功')
        console.log(loginedUser);
      	this.currentUser = this.formData.username
        this.user = loginedUser.attributes.username

      }, (error) => {
      	alert('注册失败')
      });
		},
		login() {
      console.log('我是登录')
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) =>{
      	console.log('登录成功')
      	console.log(loginedUser)
				this.user = this.formData.username
        this.currentUser = this.getCurrentUser()
      }, function (error) {
        alert('登录失败') // 👈
      });
		},
		logout() {
      AV.User.logOut();
      // 现在的 currentUser 是 null 了
      this.currentUser = null;
      window.location.reload()
		},
		getCurrentUser() {
			let current = AV.User.current()
			if(current) {
        let {id, createdAt, attributes: {username}} = current
        return {id, username, createdAt}
			}else {
				return null
			}
		}
	},
	created() {
		//将数据保存在localStorage里防止关闭浏览器丢失
    window.onbeforeunload = ()=>{
			let dataString = JSON.stringify(this.todoList);
    	window.localStorage.setItem('myTodos',dataString);

      let todoString = JSON.stringify(this.newTodo);
      window.localStorage.setItem('newTodo',todoString);

      let userString = JSON.stringify(this.user);
      window.localStorage.setItem('user',userString);
		}
		let oldDataString = window.localStorage.getItem('myTodos')
		let oldData = JSON.parse(oldDataString)
		this.todoList = oldData || []

		let oldTodos = window.localStorage.getItem('newTodo')
		let oldTodo = JSON.parse(oldTodos)
		this.newTodo = oldTodo || ''

    let oldUser = window.localStorage.getItem('user')
    let oldUsername = JSON.parse(oldUser)
    this.user = oldUsername || ''

    this.currentUser = this.getCurrentUser();
	}
 })
