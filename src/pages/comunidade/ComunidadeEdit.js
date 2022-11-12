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


const ComunidadeEdit = () => {

    const [nome, setNome] = useState('');
    const [qtd_pessoas_atendidas, setQtd_pessoas_atendidas] = useState('');
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams();

    const redireciona = (id) => {
        window.location.href = '/comunidade/listing';
      }

    useEffect(() => {
        async function getComunidade() {
            const res = await api.get('/comunidade/get/' + id)
            setNome(res.data.nome)
            setQtd_pessoas_atendidas(res.data.qtd_pessoas_atendidas)
            setEmail(res.data.email)
        }

        getComunidade();
    }, [])

    async function handleSubmit() {

        const data = {
            nome: nome,
            qtd_pessoas_atendidas: qtd_pessoas_atendidas,
            email: email
        }

        if (!data.nome || data.nome === '') {
            setTitulo('Erro!');
            setMessage('O preenchimento do Nome é Obrigatório!');
            handleShow();
            return;
        }
        if (!data.qtd_pessoas_atendidas || data.qtd_pessoas_atendidas === '') {
            setTitulo('Erro!');
            setMessage('é necessário informar o número de pessoas atendidas!')
            handleShow();
            return;
        }
        if (!data.email || data.email === '') {
            setTitulo('Erro!');
            setMessage('é necessário informar um email!')
            handleShow();
            return;
        }

        try {
            const res = await api.put('/comunidade/edit/' + id, data)
            if (res.status === 200) {
                window.location.href = '/comunidade/listing';
            }
        } catch (error) {
            alert('Erro ao alterar os dados da Comunidade')
        }


    }

    return (
        <div style={{ marginTop: 30 }}>
            <Box sx={{ display: 'flex' }} style={{ marginLeft: 160 }}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 15, display: 'flex', flexDirection: 'column' }} >
                        <h2 style={{ textAlign: 'center' }}>Editar Dados da Comunidade</h2>
                        <TextField
                            id="outlined-basic"
                            label="Comunidade Nome"
                            value={nome}
                            variant="outlined"
                            style={{ width: 600, marginTop: 50 }}
                            onChange={e => setNome(e.target.value)}

                        />
                        <TextField id="outlined-basic"
                            label="Número de Pessoas Atendidas"
                            variant="outlined"
                            style={{ width: 600, marginTop: 40 }}
                            value={qtd_pessoas_atendidas}
                            onChange={e => setQtd_pessoas_atendidas(e.target.value)}
                        />
                        <TextField id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            style={{ width: 600, marginTop: 40 }}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Stack spacing={2} direction="row">
                            <Button variant="outline-primary btn-sm" onClick={handleSubmit} style={{ marginTop: 60, marginLeft: 100 }}>Editar Comunidade</Button>
                            <Button variant="outline-warning btn-sm" onClick={redireciona} style={{ marginTop: 60, marginLeft: 130, marginRight: 40 }}>Voltar</Button>
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

export default ComunidadeEdit;