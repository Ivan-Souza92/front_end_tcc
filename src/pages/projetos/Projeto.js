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



const Projeto = () => {


    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [grupo_extensao, setGrupo_Extensao] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');
    const [grupo_id, setGrupoId] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        loadGrupo()
    }, [])

    const limparCampos = () => {

        setNome('');
        setDescricao('');
        setGrupoId('');
    }

    const loadGrupo = async () => {
        try {
            const res = await api.get('/grupo_extensao/lista')
            if (res.data.length == 0) {
                setTitulo('Atenção!');
                setMessage('Para cadastrar um projeto é necessário cadastrar um grupo de extensão primeiro!');
                handleShow();
                return;
            }
            setGrupo_Extensao(res.data)
        } catch (error) {
            setTitulo('Sem Conexão!');
            setMessage('Não foi possível listar os Grupos de Extensão!');
            handleShow();
        }
    }

    async function handleSubmit() {

        const data = {
            nome: nome,
            descricao: descricao,
        }

        if (!data.descricao || data.descricao === '') {
            setTitulo('Erro!');
            setMessage('O preenchimento da descrição do projeto é obrigatório!');
            handleShow();
            return;
        }
        if (!grupo_id || grupo_id === '') {
            setTitulo('Erro!');
            setMessage('É necessário selecionar um Grupo de Extensão!');
            handleShow();
            return;
        }

        try {
            const res = await api.post('/projeto/' + grupo_id, data)
            if (res.status === 200) {
                setTitulo('Sucesso!');
                setMessage('Projeto Cadastrado com Sucesso!');
                handleShow();
                limparCampos();
            }
        } catch (error) {
            setTitulo('Verifique a sua Conexão!');
            setMessage('Teste');
            handleShow();
        }
    }

    return (
        <div style={{ marginTop: 15 }}>

            <Box sx={{ display: 'flex' }} style={{ marginLeft: 160 }}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 15, display: 'flex', flexDirection: 'column' }} >
                        <h2 style={{ textAlign: 'center' }}>Cadastro de Projeto</h2>

                        <TextField id="outlined-basic"
                            label="Descrição do Projeto"
                            variant="outlined"
                            type="text"
                            style={{ marginTop: 40 }}
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        />

                        <Form.Group className="mb-3" controlId="listLocalidades" style={{ marginTop: 40 }}>

                            <Form.Select aria-label="Default select example" value={grupo_id} onChange={e => setGrupoId(e.target.value)} style={{ height: 56 }} >
                                <option>Selecione o Grupo de Extensão</option>
                                {grupo_extensao.map((grupos, i) => (
                                    <option value={grupos.id} key={i}>{grupos.nome}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Stack spacing={1} direction="row">
                            <Button variant="outline-primary btn-sm" onClick={handleSubmit} style={{ marginTop: 60, marginLeft: 100 }}>Cadastrar Projeto</Button>
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

export default Projeto