import '../../App.css';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';


const ProjetoEdit = () => {

    const [descricao, setDescricao] = useState('');
    const [grupo_extensao, setGrupoExtensao] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');
    const [grupo_extensao_id, setGrupo_extensao_id] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams();

    const redireciona = (id) => {
        window.location.href = '/projeto/list';
      }

    useEffect(() => {
        async function getProjeto() {
            const res = await api.get('/projeto/get/' + id)
            setDescricao(res.data.descricao)
            setGrupo_extensao_id(res.data.grupo_extensao_id)
        }

        getProjeto();
        loadGrupo();
    }, [])

    const loadGrupo = async () => {
        try {
            const res = await api.get('/grupo_extensao/lista')
            setGrupoExtensao(res.data)
        } catch (error) {
            console.log(error);
            setTitulo('Sem Conexão!');
            setMessage('Não foi possível listar oo grupos de extensões!');
            handleShow();
        }
    }


    async function handleSubmit() {

        const data = {
            descricao: descricao,
            grupo_extensao_id: grupo_extensao_id
        }

        if (!data.descricao || data.descricao === '') {
            setTitulo('Erro!');
            setMessage('O preenchimento da descricao é Obrigatório!');
            handleShow();
            return;
        }
        if (!data.grupo_extensao_id || data.grupo_extensao_id === '') {
            setTitulo('Erro!');
            setMessage('É necessário selecionar um Grupo de Extensão!')
            handleShow();
            return;
        }

        try {
            console.log(data.nome)
            const res = await api.put('/projeto/edit/' + id, data)
            if (res.status === 200) {
                window.location.href = '/projeto/list';
            }
        } catch (error) {
            alert('Erro ao alterar os dados desse Grupo de Extensão')
        }


    }

    return (
        <div style={{marginTop:15}}>

            <Box sx={{ display: 'flex' }} style={{ marginLeft: 160 }}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 15, display: 'flex', flexDirection: 'column' }} >
                    <h2 style={{textAlign: 'center'}}>Editar O Projeto de Extensão</h2>
                        <TextField
                            id="outlined-basic"
                            label="Descrição do Projeto"
                            value={descricao}
                            variant="outlined"
                            style={{ width: 600, marginTop:30 }}
                            onChange={e => setDescricao(e.target.value)}

                        />
                        <Form.Group className="mb-3" controlId="listLocalidades" style={{marginTop:40}}>

                            <Form.Select aria-label="Default select example" value={grupo_extensao_id} onChange={e => setGrupo_extensao_id(e.target.value)} style={{height:56}} >
                                <option>Selecione o Grupo Extensão</option>
                                {grupo_extensao.map((grupo, i) => (
                                    <option value={grupo.id} key={i}>{grupo.nome}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Stack spacing={1} direction="row">
                            <Button variant="outline-primary btn-sm" onClick={handleSubmit} style={{ marginTop: 60, marginLeft: 100 }}>Editar Grupo de Extensão</Button>
                            <Button variant="outline-warning btn-sm" onClick={redireciona} style={{ marginTop: 60, marginLeft: 100 }}>Voltar</Button>
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

export default ProjetoEdit;