import React from 'react';
import '../../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';


const EditProfessor = () => {

    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams();

    useEffect(() => {
        async function getProfessor() {
            const res = await api.get('/professor/get/' + id)
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

        try {
            console.log(data.nome)
            const res = await api.put('/professor/edit/' + id, data)
            if (res.status === 200) {
                window.location.href = '/lista_de_professores';
            }
        } catch (error) {
            alert('Erro ao alterar os dados do professor')
        }


    }

    return (
        <div>
            <span><h2 className='App'>Alteração dos Dados</h2></span>
            <hr />
            <Box sx={{ display: 'flex' }} style={{ marginLeft: 160 }}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 15, display: 'flex', flexDirection: 'column' }} >
                        <TextField
                            id="outlined-basic"
                            variant="filled"
                            color="success"
                            label="Nome do Professor"
                            value={nome}
                            style={{ width: 600 }}
                            onChange={e => setNome(e.target.value)}

                        />
                        <TextField id="outlined-basic"
                            label="Curso"
                            variant="filled"
                            color="success"
                            style={{ width: 600, marginTop: 40 }}
                            value={curso}
                            onChange={e => setCurso(e.target.value)}
                        />
                        <Stack spacing={2} direction="row">
                            <Button variant="outline-primary btn-sm" onClick={handleSubmit} style={{ marginTop: 60, marginLeft: 100 }}>Editar Dados do Professor</Button>
                            <Button variant="outline-warning btn-sm" style={{ marginTop: 60, marginLeft: 130, marginRight: 40 }}>Voltar</Button>
                        </Stack>
                    </Paper>
                </Grid>
            </Box>
            <Modal show={show} onHide={handleClose} animation={false} style={{ marginTop: 150 }}>
                <Modal.Header closeButton>
                    <Modal.Title>{titulo}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
            </Modal>
        </div>
    )
}

export default EditProfessor;