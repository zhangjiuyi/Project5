
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
    fetchTodos() {
      if(this.currentUser){
        var query = new AV.Query('AllTodos');
        query.find()
          .then((todos) => {
            let avAllTodos = todos[0]
            let id = avAllTodos.id
            this.todoList = JSON.parse(avAllTodos.attributes.content)
            this.todoList.id = id
          },function(error){
            console.log(error)
          })
      }
		},
		updateTodos(idx) {
    	//根据idx参数将状态保存到服务器
			if(typeof idx === 'number'){
        this.todoList[idx].done = !this.todoList[idx].done
      }
      let dataString = JSON.stringify(this.todoList)
			let avTodos = AV.Object.createWithoutData('AllTodos',this.todoList.id)
			avTodos.set('content',dataString)
			avTodos.save().then(()=>{
				console.log('更新成功')
			})
		},
		saveTodos() {
			let dataString = JSON.stringify(this.todoList)
      var AVTodos = AV.Object.extend('AllTodos');
      var avTodos = new AVTodos();
      var acl = new AV.ACL()
			acl.setReadAccess(AV.User.current(),true) //只有这个用户能读
			acl.setWriteAccess(AV.User.current(),true) //只有这个用户能写

      avTodos.set('content',dataString);
      avTodos.setACL(acl) //设置访问控制
      avTodos.save().then((todo) => {
      	this.todoList.id = todo.id  // 把id挂到this.todoList.id上,否则下次不会调用updateTodos
        console.log('保存成功')
      }, function(error){
        console.log('保存失败')
      });
		},
    saveOrUpdateTodos() {
			if(this.todoList.id){
				this.updateTodos()
			}else{
				this.saveTodos()
			}
		},
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
      this.saveOrUpdateTodos()
    },
		removeTodo(todo) {
			let idx = this.todoList.indexOf(todo);
			this.todoList.splice(idx,1)
      this.saveOrUpdateTodos()
    },
		signUp() {
      // 新建 AVUser 对象实例
      let user = new AV.User();
      // 设置用户名
      user.setUsername(this.formData.username);
      // console.log(this.formData.username)
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
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) =>{
      	console.log('登录成功')
				this.user = this.formData.username
        this.currentUser = this.getCurrentUser()
				this.fetchTodos()  // 登录成功后读取 todos
      }, function (error) {
        alert('登录失败')
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
			//将用户名保存在localStorage
      let userString = JSON.stringify(this.user);
      window.localStorage.setItem('user',userString);
		}
    let oldUser = window.localStorage.getItem('user')
    let oldUsername = JSON.parse(oldUser)
    this.user = oldUsername || ''

    this.currentUser = this.getCurrentUser();
		this.fetchTodos()
	}
 })
