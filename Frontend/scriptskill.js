var url = 'http://localhost:3000'

function cadastrarskill()
{
	let body =
	{
		'name' : document.getElementById('skill').value,
		'damage' : document.getElementById('damage').value
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
				alert('Cadastro de skill efetuado! :D')
			}
			else
			{
				console.error(request.responseText)
				alert('Não foi possível efetuar o cadastro da skill! :(')
			}
		}
	}
	request.open("POST", url + "/Skill/AddSkill")
	request.setRequestHeader('Accept', 'text/plain')
	request.setRequestHeader('Content-type', 'application/json')
	request.send(JSON.stringify(body))
}

function listarskill()
{
	//da um GET no endpoint "skill"
	fetch(url + '/Skill/ListAllSkills')
	.then(response => response.json())
	.then((skills) =>
	{
		//pega div que vai conter a lista de usuarios
		let listaSkills = document.getElementById('lista-skills')
		
		//limpa div
		while(listaSkills.firstChild)
		{
			listaSkills.removeChild(listaSkills.firstChild)
		}
		
		//preenche div com skills recebidos do GET
		for(let skill of skills)
		{
			//cria div para as informacoes de uma skill
			let divSkill = document.createElement('div')
			divSkill.setAttribute('class', 'form')
			
			// //pega o id da skill
			let divId = document.createElement('input')
			divId.placeholder = 'ID'
			divId.value = skill.id
			divSkill.appendChild(divId)

			//pega o nome da skill
			let divName = document.createElement('input')
            divName.placeholder = 'Nome'
            divName.value = skill.name
            divSkill.appendChild(divName)

            //pega o dano da skill
            let divDamage = document.createElement('input')
            divDamage.placeholder = 'Damage'
            divDamage.value = skill.damage
            divSkill.appendChild(divDamage)
			
			// //cria o botao para remover a skill
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerskill(skill.id)
			btnRemover.style.marginRight = '5px'
			
			// //cria o botao para atualizar a skill
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizarskill(skill.id, divName, divDamage)
			btnAtualizar.style.marginLeft = '5px'
			
			// //cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divSkill.appendChild(divBotoes)
			
			//insere a div da skill na div com a lista de skills
			listaSkills.appendChild(divSkill)
		}
	})
}

function atualizarskill(id, divName, divDamage)
{
	let body =
	{
		"id": id,
		'Name': divName.value,
        'Damage': divDamage.value,
	}
	
	fetch(url + "/Skill/UpdateSkill",
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
		listarskill()
		console.log(output)
		alert('Skill atualizada! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar a skill :/')
	})
}

function removerskill(id)
{
	fetch(url + '/Skill/RemoveSkill?id=' + id,
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
		listarskill()
		console.log(output)
		alert('Skill removida! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover a skill :/')
	})
}
