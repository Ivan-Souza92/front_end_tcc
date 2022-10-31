import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import '../../App.css';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { api } from '../../services/api';
import Modal from 'react-bootstrap/Modal';


const CadastrarComunidade = () => {


    const [nome, setNome] = useState('');
    const [qtd_pessoas_atendidas, setQtd_pessoas_atendidas] = useState('');
    const [email, setEmail] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const limparCampos = () => {

        setNome('');
        setQtd_pessoas_atendidas('');
        setEmail('');
    }

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
            const res = await api.post('/comunidade', data)

            if (res.status === 200) {
                setTitulo('Sucesso!');
                setMessage('Comunidade Cadastrada com Sucesso!');
                handleShow();
                limparCampos();
            }
        } catch (error) {
            setTitulo('Verifique a sua Conexão!');
            setMessage('Erro na Conexão!');
            console.log(error)
            handleShow();
        }
    }



    return (
        <div style={{ marginTop: 28 }}>
            <span><h2 className='App'>Cadastro de Comunidade</h2></span> 
            <hr />
            <Box sx={{ display: 'flex' }} style={{ marginLeft: 160 }}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 15, display: 'flex', flexDirection: 'column' }} >
                        <TextField
                            id="outlined-basic"
                            label="Comunidade Nome"
                            value={nome}
                            variant="outlined"
                            style={{ width: 600 }}
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
                            <Button variant="outline-primary btn-sm" onClick={handleSubmit} style={{ marginTop: 60, marginLeft: 100 }}>Cadastrar Comunidade</Button>
                            <Button variant="outline-warning btn-sm" onClick={limparCampos} style={{ marginTop: 60, marginLeft: 130, marginRight: 40 }}>Limpar Campos</Button>
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

export default CadastrarComunidade;