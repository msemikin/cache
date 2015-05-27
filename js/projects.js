$('.form').find('input, textarea').on('keyup blur focus', function (e) {
    var $this = $(this), label = $this.prev('label');
    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {
        if ($this.val() === '') {
            label.removeClass('highlight');
        } else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }
});
$('.tab a').on('click', function (e) {
    e.preventDefault();
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    target = $(this).attr('href');
    $('.tab-content > div').not(target).hide();
    $(target).fadeIn(600);
});

function edit(){
    document.getElementById('group').contentEditable = true;
    document.getElementById('job').contentEditable = true;
    document.getElementById('work').contentEditable = true;
}

function addTeacher(value, id){
    $("#mainTeacherDiv").append('<div id = teacher'+ id +' style="padding:0;" class="panel-body"><div class = \'gorizont\'><input type="button" style = "border-style: none; width: 97%; margin: 0;padding-right: 90%;"class="btn btn-default buttonTeacher" value='+value+'> <button id="deleteTeacher" style =\'border: none;\' type="button" class="btn btn-default btn-small" onclick="delTeacher();"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div>');
}

function delTeacher(id){
    $("#"+ id).remove();
}
function addProject(value, id){
    $("#mainProjectDiv").append('<div id = project'+ id + ' style="padding:0;" class="panel-body"><div class = \'gorizont\'><input type="button" style = "border-style: none;width: 90%; margin: 0;padding-right: 80%;"class="btn btn-default" value='+value+'> <button id="deleteProject" style =\'border: none;\' type="button" class="btn btn-default btn-small" onclick="alert(this.id);"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div>');
}

function delProject(id){
    $("#"+ id).remove();
}