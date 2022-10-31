import '../../App.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { api } from '../../services/api';
import Modal from 'react-bootstrap/Modal';



const CadastroProfessor = () => {

    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const limparCampos = () => {

        setNome('');
        setCurso('');
    }

    async function handleSubmit() {

        const data = {
            nome: nome,
            curso: curso
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
            const res = await api.post('/prof_extensionista', data)

            if (res.status === 200) {
                setTitulo('Sucesso!');
                setMessage('Professor Cadastrado com Sucesso!');
                handleShow();
                limparCampos();
            }
        } catch (error) {
            setTitulo('Verifique a sua Conexão!');
            setMessage('Erro na Conexão!');
            handleShow();
        }
    }

    return (
        <div>
            <span><h2 className='App'>Cadastro do Professor Extensionista</h2></span>
            <hr />
            <Box sx={{ display: 'flex' }} style={{ marginLeft: 160 }}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 15, display: 'flex', flexDirection: 'column' }} >
                        <TextField
                            id="outlined-basic"
                            label="Nome do Professor"
                            value={nome}
                            variant="outlined"
                            style={{ width: 600 }}
                            onChange={e => setNome(e.target.value)}

                        />
                        <TextField id="outlined-basic"
                            label="Curso"
                            variant="outlined"
                            style={{ width: 600, marginTop: 40 }}
                            value={curso}
                            onChange={e => setCurso(e.target.value)}
                        />
                        <Stack spacing={2} direction="row">
                            <Button variant="outline-primary btn-sm" onClick={handleSubmit} style={{ marginTop: 60, marginLeft: 100 }}>Cadastrar Professor</Button>
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

export default CadastroProfessor;