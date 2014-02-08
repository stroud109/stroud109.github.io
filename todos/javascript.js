// TODO:
// remember the state of the todo list, so upon refresh it's still there
// listen to submit event on form rather than keypress event

var $button = $('#create');
var $input = $('#input');
var $list = $('#list');
var $checkmark = $('#checkmark');

$input.keypress(function(e) {
    if(e.which == 13) {
        $list.append('<div class="panel panel-default panel-body">' +
            $input.val() +
            '<span class="navbar-right todo x-mark"><span class="glyphicon glyphicon-remove" data-action="delete"></span></span>' +
            '<span class="navbar-right todo checkmark"><span class="glyphicon glyphicon-ok" data-action="done"></span></span></div>');
        $input.val('');
    }
});

$list.on('click', 'div [data-action=done]', function (e){
    var panel = $(e.target).closest('.panel');
    panel.addClass('done');
    $list.append(panel);
});

$list.on('click', 'div [data-action=delete]', function (e){
    $(e.target).closest('.panel').fadeOut();
});
