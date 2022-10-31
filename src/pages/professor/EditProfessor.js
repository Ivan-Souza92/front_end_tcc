import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useParams } from 'react-router-dom'


const EditProfessor = () => {

    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');

    const { id } = useParams();

    useEffect(() => {
        async function getProfessor() {
            const res = await api.get('' + id)
            setNome(res.data.nome)
            setCurso(res.data.curso)
        }

        getProfessor();
    }, [])

    async function handleSubmit() {

        const data = {
            nome: nome,
            curso: curso,
        }

        if (!data.nome || data.nome === '') {
            setTitulo('Erro!');
            setMessage('O preenchimento do Nome é Obrigatório!');
            handleShow();
            return;
        }
        if (!data.curso || data.curso === '') {
            setTitulo('Erro!');
            setMessage('O preenchimento do Curso é Obrigatório!')
            handleShow();
            return;
        }

        //console.log(data)
        try {
            const res = await api.put('/api/professor/update/' + id, data)
            if (res.status === 200) {
                window.location.href = '/lista_de_professores';
            }
        } catch (error) {
            alert('Erro ao alterar os dados do professor')
        }


    }

    return (
      <>
      </>
    )
}

export default EditProfessor;