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



const GrupoExtensao = () => {


    const [nome, setNome] = useState('');
    const [ano_semestre, setAno_Semestre] = useState('');
    const [professor, setProfessor] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');
    const [prof_id, setProfId] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        loadProfessor()
    }, [])

    const limparCampos = () => {

        setNome('');
        setAno_Semestre('');
        setProfId('')
    }

    const loadProfessor = async () => {
        try {
            const res = await api.get('/professor/list')
            setProfessor(res.data)
        } catch (error) {
            console.log(error);
            setTitulo('Sem Conexão!');
            setMessage('Não foi possível listar os Professores!');
            handleShow();
        }
    }

    async function handleSubmit() {

        const data = {
            nome: nome,
            ano_semestre: ano_semestre,
        }

        if (!data.nome || data.nome === '') {
            setTitulo('Erro!');
            setMessage('O preenchimento do Nome é Obrigatório!');
            handleShow();
            return;
        }
        if (!data.ano_semestre || data.ano_semestre === '') {
            setTitulo('Erro!');
            setMessage('O preenchimento do Nome é Obrigatório!');
            handleShow();
            return;
        }
        if (!prof_id || prof_id === '') {
            setTitulo('Erro!');
            setMessage('é necessário selecionar um professor!');
            handleShow();
            return;
        }

        try {

            const res = await api.post('/grupo_extensao/' + prof_id, data)
            console.log(prof_id)

            if (res.status === 200) {
                setTitulo('Sucesso!');
                setMessage('Grupo de Extensão Cadastrado com Sucesso!');
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
        <div style={{marginTop:15}}>

            <Box sx={{ display: 'flex' }} style={{ marginLeft: 160 }}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 15, display: 'flex', flexDirection: 'column' }} >
                    <h2 style={{textAlign: 'center'}}>Cadastro de Grupo de Extensão</h2>
                        <TextField
                            id="outlined-basic"
                            label="Nome do Grupo de Extensão"
                            value={nome}
                            variant="outlined"
                            style={{ width: 600, marginTop:30 }}
                            onChange={e => setNome(e.target.value)}

                        />
                        <TextField id="outlined-basic"
                            label="Ano Semestre"
                            variant="outlined"
                            type="number"
                            style={{ width: 200, marginTop: 40 }}
                            value={ano_semestre}
                            onChange={e => setAno_Semestre(e.target.value)}
                        />

                        <Form.Group className="mb-3" controlId="listLocalidades" style={{marginTop:40}}>

                            <Form.Select aria-label="Default select example" value={prof_id} onChange={e => setProfId(e.target.value)} style={{height:56}} >
                                <option>Selecione o Professor</option>
                                {professor.map((professores, i) => (
                                    <option value={professores.id} key={i}>{professores.nome}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Stack spacing={1} direction="row">
                            <Button variant="outline-primary btn-sm" onClick={handleSubmit} style={{ marginTop: 60, marginLeft: 100 }}>Cadastrar Grupo de Extensão</Button>
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

export default GrupoExtensao