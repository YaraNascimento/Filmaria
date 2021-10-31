import { useEffect, useState } from 'react'
import './filme-info.css'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { toast } from "react-toastify"

export default function Filme(){
    const { id } = useParams()
    const history = useHistory()


    const [filme, setFilme] = useState([])
    const [ loading, setLoading] = useState(true)
 
useEffect(()=>{


    async function loadFilme(){
        const response = await api.get(`r-api/?api=filmes/${id}`)
        
        if(response.data.length === 0){
            // Tentou navegar um id que não existe, navego ele para home!
            history.replace('/')
            return
        }


        setFilme(response.data)
        setLoading(false)
    }

    loadFilme()

    return() => {
        console.log('Componente desmontado');
    }

}, [history, id])

 function salvaFilme(){
   

    const minhaLista = localStorage.getItem('filmes')

    let filmeSalvos = JSON.parse(minhaLista) || []


    // Se tiver um filme salvo com esse mesmo id, precisa ignorar. 
    const hasFilme = filmeSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)
    // Devolve um "TRUE" e se náo for igual irá devenvolver um 'false"

    if(hasFilme){
        toast.error('Você já possui esse filme salvo!')
        return
        // Para a execução do código aqui!!!    
    }

    filmeSalvos.push(filme)
    localStorage.setItem('filmes', JSON.stringify(filmeSalvos))
    toast.success('Filme salvo com sucesso!!!')
 }


 if(loading){
     return(
         <div className='filme-info'>
             <h1>
                    CARREGANDO O SEU FILME...
             </h1>
         </div>
     )
 }
    return(
        <div className='filme-info'>
           <h1>{filme.nome}</h1>
           <img src={filme.foto} alt={filme.nome}/>

           <h3>Sinopse</h3>
           {filme.sinopse}

        <div className='botoes'>

            <button onClick={salvaFilme}>Salvar</button>
            <button>
                <a target='blank' href={`https://youtube.com/results?search_query=${filme.nome}`}> 
                    Trailer 
                </a>
            </button>
        </div>
        </div>
    )
}