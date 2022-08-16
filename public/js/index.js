const cep = document.querySelector('#cep')




cep.addEventListener( "blur", async (e)=>{
    const url =  `https://viacep.com.br/ws/${cep.value}/json/`
    const dadosURL = await fetch(url)
    const dados = await dadosURL.json()
    for(let campos in dados){


        
      
       if(document.querySelector('#'+ campos)){
        document.querySelector("#" + campos).value = dados[campos]

       }
    }
})


