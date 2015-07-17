var count = 1;
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
    //debugger;
    var gr = document.getElementById('group');
    gr.contentEditable = true;
    document.getElementById('job').contentEditable = true;
    document.getElementById('work').contentEditable = true;
    //gr.focus();
    $("#gr").css("background-color", "#86b8d8");
};
    

/*$(document.onclick = function(event) {
  var target = event.target; // где был клик?

  if (target.id == 'cabinet') return; // не на TD? тогда не интересует

  alert("hbjhb");
});*/

/*$('#addTeacher').click( function()
            {
                debugger;
                addTeacher("teacher", "2");
            });*/
function addTeacher(value, id){
    debugger;
    var newId = 'teacher_'+ id;
    var newButId = 'teacherBut_'+ id;
    $("#mainTeacherDiv").append('<div id = '+ newId +' style="padding:0;" class="panel-body"><div class = \'gorizont\'><input type="button" style = "border-style: none; width: 97%; margin: 0;padding-right: 90%;"class="btn btn-default" value='+value+'> <button id=' + newButId + ' style =\'border: none;\' type="button" class="btn btn-default btn-small" onclick="delTeacher(this.id);"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div>');
}

function delTeacher(id){
    debugger;
    var elId = 'teacher_' + id.slice(-1);
    $('#' + elId).remove();
}
/*$("#addProject").click( function()
           {
             addProject("cache", "2");
           }
        );*/
function addProject(projectName) {
    var json = $.session.get('session');
    if (json != undefined) {
        user = JSON.parse($.session.get('session'));
    }
    if (projectName == undefined) {
        $("#mainProjectDiv").append('<div id="projectDiv" style="padding:0;"'+
    'class="panel-body"> <div class=\'gorizont\'> '+
        '<input type="button" style="border-style: none;width: 90%; margin: ' +
        '0;padding-right: 80%;"class="btn btn-default buttonTeacher"'
        +'value="'+user.surname + count + '" onclick ="myFunction( '+user.surname + count + ')">' +
        '<button id="deleteTeacher" style=\'border: none;\' type="button" ' +
        'class="btn btn-default btn-small" onclick="editProject();">' +
        '<span class="glyphicon glyphicon-pencil" aria-hidden="true">' +
        '</span> </button> <button id="editTeacher" style=\'border: none;\' type="button" class="btn btn-default btn-small" onclick="delProject();"> ' +
        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> ' +
        '</button> </div> </div>');
        count++;
        projects.push(user.surname+count);
        var scope = angular.element(document.getElementById("mainProjectDiv")).scope();
        scope.$apply(function () {
            scope.update();
        });
    }
    else {
        $("#mainProjectDiv").append('<div id="projectDiv" ' +
        'style="padding:0;" class="panel-body"> <div class=\'gorizont\'> ' +
        '<input type="button" style="border-style: none;width: 90%; margin: ' +
        '0;padding-right: 80%;"class="btn btn-default buttonTeacher" value="'
        //+projectName.replace(projectName[projectName.length-1],"")
                                    +projectName.toString().trim()
                                    +'" onclick ="myFunction(\''
                                    +projectName.toString().trim()
                                    +'\')"> ' +
        '<button id="deleteTeacher" style=\'border: none;\' type="button" ' +
        'class="btn btn-default btn-small" onclick="editProject();">' +
        ' <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> ' +
        '</button> <button id="editTeacher" style=\'border: none;\' type="button" ' +
        'class="btn btn-default btn-small" onclick="delProject();"> ' +
        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span> ' +
        '</button> </div> </div>');
        count++;
    }
}

function delProject(id){
    var elId = 'project_' + id.slice(-1);
    $('#' + elId).remove();
}

$(document).ready(function(){
             $("#group").keypress(function(e){
               if(e.keyCode==13){
                 document.getElementById('group').contentEditable = false;
               }
             });
         });
$(document).ready(function(){
             $("#job").keypress(function(e){
               if(e.keyCode==13){
                 document.getElementById('job').contentEditable = false;
               }
             });
         });
$(document).ready(function(){
             $("#work").keypress(function(e){
               if(e.keyCode==13){
                 document.getElementById('work').contentEditable = false;
               }
             });
         });
