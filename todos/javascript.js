var $button = $('#create');
var $input = $('#input');
var $list = $('#list');
var $checkmark = $('#checkmark');
var persist = function() {
    var currentToDos = [];
    $list.find('.panel:visible').each(function(){
        var todo = $(this);
        currentToDos.push({
            text: todo.text(),
            done: todo.hasClass('done'),
        });
    });
    localStorage.todoList = JSON.stringify(currentToDos);
};

var loadFromStorage = function() {
    var todoList = localStorage.todoList;
    if(!todoList){
        return;
    }
    var todos = JSON.parse(todoList);
    for(var i = 0; i < todos.length; i++){
        $list.append(todoTemplate(todos[i].text, todos[i].done));
    }
};

var todoTemplate = function(text, isDone){
    return '<div class="panel panel-default panel-body ' +
            (isDone ? 'done':'') +'">' + text +
            '<span class="navbar-right todo x-mark"><span class="glyphicon glyphicon-remove" data-action="delete"></span></span>' +
            '<span class="navbar-right todo checkmark"><span class="glyphicon glyphicon-ok" data-action="done"></span></span></div>';
};

$('.input-form').on('submit', function(e) {
    e.preventDefault();
    $list.append(todoTemplate($input.val(), false));
    $input.val('');
    persist();
});

$list.on('click', 'div [data-action=done]', function (e){
    var panel = $(e.target).closest('.panel');
    panel.addClass('done');
    $list.append(panel);
    persist();
});

$list.on('click', 'div [data-action=delete]', function (e){
    $(e.target).closest('.panel').fadeOut(persist);
});


$(function(){
    loadFromStorage();
});
