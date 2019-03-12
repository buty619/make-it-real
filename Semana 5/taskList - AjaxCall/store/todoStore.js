class todoStore{
  findAll(){
    return $.get("http://makeitreal-todo.herokuapp.com/todo_items").done(data => {
        let todos = []
        for(const i of data){
          todos.push(Object.setPrototypeOf(i,Todo.prototype))
        }
      return todos;
    })
  }
  create(todo){
    return $.ajax({
      method: 'POST',
      url: 'http://makeitreal-todo.herokuapp.com/todo_items',
      contentType: 'application/json',
      data: JSON.stringify(todo)
    }).done(data => {
      return Object.setPrototypeOf(data, Todo.prototype)
    }).fail(error =>{
      console.log(error)
    })
  }
  update(id,done){
    return $.ajax({
      method: 'PATCH',
      url: 'http://makeitreal-todo.herokuapp.com/todo_items/'+id,
      contentType: 'application/json',
      data: JSON.stringify(done)
    }).fail(error =>{
      console.log(error)
    })
  }
}