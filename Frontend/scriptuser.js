var url = 'http://localhost:3000'

function cadastrar()
{
	//construcao do json que vai no body da criacao de usuario	
	
	let body =
	{
		'username' : document.getElementById('username').value
	};
	
	//solucao alternativa usando AJAX
	let request = new XMLHttpRequest()
	request.onreadystatechange = () =>
	{
		if(request.readyState === 4)
		{
			if(request.status === 200)
			{
				console.log(request.responseText)
				alert('Cadastro efetuado! :D')
			}
			else
			{
				console.error(request.responseText)
				alert('Não foi possível efetuar o cadastro! :(')
			}
		}
	}
	request.open('POST', url + '/User/Register')
	request.setRequestHeader('Accept', 'application/json')
	request.setRequestHeader('Content-type', 'application/json')
	request.send(JSON.stringify(body))
}

function listar()
{
	//da um GET no endpoint "usuarios"
	fetch(url + '/User/ListAllUsers')
	.then(response => response.json())
	.then((usuarios) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaUsuarios = document.getElementById('lista-usuarios')
		
		//limpa div
		while(listaUsuarios.firstChild)
		{
			listaUsuarios.removeChild(listaUsuarios.firstChild)
		}
		
		//preenche div com usuarios recebidos do GET
		for(let usuario of usuarios)
		{
			//cria div para as informacoes de um usuario
			let divUsuario = document.createElement('div')
			divUsuario.setAttribute('class', 'form')
			
			// //pega o id do usuario
			let divId = document.createElement('input')
			divId.placeholder = 'ID'
			divId.value = usuario.id
			divUsuario.appendChild(divId)

			//pega o nome do usuario
			let divNome = document.createElement('input')
			divNome.placeholder = 'Username'
			divNome.value = usuario.username
			divUsuario.appendChild(divNome)
			
			// //cria o botao para remover o usuario
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(usuario.id)
			btnRemover.style.marginRight = '5px'
			
			// //cria o botao para atualizar o usuario
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(usuario.id, divNome)
			btnAtualizar.style.marginLeft = '5px'
			
			// //cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divUsuario.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de usuarios
			listaUsuarios.appendChild(divUsuario)
		}
	})
}

function atualizar(id, divNome)
{
	let body =
	{
		"id": id,
		'Username': divNome.value,
	}
	
	fetch(url + "/User/UpdateUser",
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Usuário atualizado! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o usuário :/')
	})
}

function remover(id)
{
	fetch(url + '/User/RemoveUser?id=' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Usuário removido! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o usuário :/')
	})
}
