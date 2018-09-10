$(document).ready(function(){
	var save = true;
	var iduser;
	function getUsers(){
		$.get('/getusers',function(data){
			createTable(data,"#table");
		})
	}
	function createTable(mas,element){
		$(element).empty();
		$("<table>").addClass("table").addClass("table-bordered").addClass("table-primary").appendTo(element);
		for(var i=0;i<mas.length;i++){
			$("<tr>").addClass('tr').appendTo(".table");
			for (key in mas[i]) {
				$("<td>").addClass("td").text(mas[i][key]).appendTo(".tr:last");
			}
			$("<td>").addClass("td").css({
				"width" :"50px"
			}).appendTo(".tr:last");
			$("<button>").text("Видалити").addClass("btn").addClass("btn-danger").
			click(function(){
				var id = $(this).parent().parent().children().filter(':first').text();
				deleteUser(id);
			}).appendTo(".td:last");
			$("<td>").addClass("td").css({
				"width" :"50px"
			}).appendTo(".tr:last");
			$("<button>").text("Змінити").addClass("btn").addClass("btn-primary").
			click(function(){
				iduser = $(this).parent().parent().children().filter(':first').text();
				var name = $(this).parent().parent().children().filter(':eq(1)').text();
				$('.name').val(name);
				var age = $(this).parent().parent().children().filter(':eq(2)').text();
				$('.age').val(age);
				$(".adduser").text("Змінити користувача");
				save = false;
			}).appendTo(".td:last");
			$(".tr:last td:first").hide();
		}
	}
	function addUser(name,age){
		var obj = {
				name: name,
				age: age
			}
		if(save){
			$(".adduser").text("Додати користувача");
			if(!name||!age){
				alert("Введіть значення!!");
				return;
			}
			$.post('/adduser',obj,function(data){
				console.log(data);
				getUsers();
			});

		}
		else{
				obj.id = iduser;
				$.post('/updateuser',obj,function(data){
				console.log(data);
				getUsers();
			});
			}
			save = true;
		}
	function deleteUser(id){
		var obj = {
			id: id
		}
		$.post('/deleteuser',obj,function(data){
			console.log(data);
			getUsers();
		});
	}
	$(".adduser").click(function(){
		addUser($(".name").val(),$(".age").val());
		$(".name").val("");
		$(".age").val("");
	});
	getUsers();
});