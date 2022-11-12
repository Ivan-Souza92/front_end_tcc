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


const AlunoEdit = () => {

    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [ano_entrada, setAno_entrada] = useState('');
    const [semestre_entrada, setSemestre_entrada] = useState('');
    const [grupo_extensao, setGrupoExtensao] = useState([]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');
    const [grupo_extensao_id, setGrupo_extensao_id] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { id } = useParams();

    const redireciona = (id) => {
        window.location.href = '/aluno/list';
      }

    useEffect(() => {
        async function getProjeto() {
            const res = await api.get('/aluno/get/' + id)
            setNome(res.data.nome)
            setCurso(res.data.curso)
            setPeriodo(res.data.periodo)
            setAno_entrada(res.data.ano_entrada)
            setSemestre_entrada(res.data.semestre_entrada)
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
            setMessage('Não foi possível listar os grupos de extensões!');
            handleShow();
        }
    }


    async function handleSubmit() {

        const data = {
            nome: nome,
            curso: curso,
            periodo: periodo,
            ano_entrada: ano_entrada,
            semestre_entrada: semestre_entrada,
            grupo_extensao_id: grupo_extensao_id
        }

        if (!data.nome || data.nome === '') {
            setTitulo('Erro!');
            setMessage('O preenchimento do Nome é Obrigatório!');
            handleShow();
            return;
        }
        if (!data.curso || data.curso === '') {
            setTitulo('Erro!');
            setMessage('É necessário informar o curso')
            handleShow();
            return;
        }
        if (!data.periodo || data.periodo === '') {
            setTitulo('Erro!');
            setMessage('é necessário informar o periodo do aluno!')
            handleShow();
            return;
        }
        if (!data.ano_entrada || data.ano_entrada === '') {
            setTitulo('Erro!');
            setMessage('é necessário informar o ano que o aluno ingressou!')
            handleShow();
            return;
        }
        if (!data.semestre_entrada || data.semestre_entrada === '') {
            setTitulo('Erro!');
            setMessage('é necessário informar o ano que o aluno ingressou!')
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
            const res = await api.put('/aluno/edit/' + id, data)
            if (res.status === 200) {
                window.location.href = '/aluno/list';
            }
        } catch (error) {
            alert('Erro ao alterar os dados do aluno!')
        }


    }

    return (
 
        <div style={{ marginTop: 30 }}>
        <Box sx={{ display: 'flex' }} style={{ marginLeft: 160 }}>
            <Grid item xs={12}>
                <Paper sx={{ p: 15, display: 'flex', flexDirection: 'column' }} >
                    <h2 style={{ textAlign: 'center' }}>Editar Dados do Aluno</h2>
                    <TextField
                        id="outlined-basic"
                        label="Comunidade Nome"
                        value={nome}
                        variant="outlined"
                        style={{ width: 600, marginTop: 50 }}
                        onChange={e => setNome(e.target.value)}

                    />
                    <TextField id="outlined-basic"
                        label="Curso"
                        variant="outlined"
                        style={{ width: 600, marginTop: 40 }}
                        value={curso}
                        onChange={e => setCurso(e.target.value)}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                        <TextField id="outlined-basic"
                            label="Periodo"
                            variant="outlined"
                            style={{ width: 200, marginTop: 40 }}
                            value={periodo}
                            onChange={e => setPeriodo(e.target.value)}
                        />
                        <TextField id="outlined-basic"
                            label="Ano de Entrada"
                            variant="outlined"
                            style={{ width: 200, marginTop: 40, marginLeft: 20 }}
                            value={ano_entrada}
                            onChange={e => setAno_entrada(e.target.value)}
                        />

                    </div>

                    <TextField id="outlined-basic"
                        label="Semestre de Entrada"
                        variant="outlined"
                        style={{ width: 200, marginTop: 40, marginLeft: 200 }}
                        value={semestre_entrada}
                        onChange={e => setSemestre_entrada(e.target.value)}
                    />
                    <Form.Group className="mb-3" controlId="listLocalidades" style={{ marginTop: 40 }}>

                        <Form.Select aria-label="Default select example" value={grupo_extensao_id} onChange={e => setGrupo_extensao_id(e.target.value)} style={{ height: 56 }} >
                            <option>Selecione o Grupo de Extensão</option>
                            {grupo_extensao.map((grupos, i) => (
                                <option value={grupos.id} key={i}>{grupos.nome}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                    <Stack spacing={2} direction="row">
                        <Button variant="outline-primary btn-sm" onClick={handleSubmit} style={{ marginTop: 60, marginLeft: 100 }}>Editar Aluno</Button>
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

export default AlunoEdit;