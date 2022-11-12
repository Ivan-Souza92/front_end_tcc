import '../../App.css';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from 'react-bootstrap/Modal'

const AlunoList = () => {

    const [aluno, setAluno] = useState([]);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [message, setMessage] = useState('');
    const [titulo, setTitulo] = useState('');
    const [id, setId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const redireciona = (id) => {
        window.location.href = '/aluno/' + id;
    }

    useEffect(() => {
        loadAluno()
    }, [])

    const loadAluno = async () => {
        try {
            const res = await api.get('/aluno/list')
            setAluno(res.data)
        } catch (error) {
            console.log(error);
            setTitulo('Sem Conexão!');
            setMessage('Não foi possível listar os alunos!');
            handleShow();
        }
    }

    const modal = (idAluno) => {
        setTitulo('Atenção!')
        setMessage('Deseja excluir esse registro?')
        handleShow2();
        setId(idAluno);
    }

    const deleteAluno = async () => {
        handleClose2()
        try {
            await api.delete('/aluno/delete/' + id)
            setTitulo('Sucesso!');
            setMessage('Registro deletado com sucesso!');
            handleShow();
            setAluno(aluno.filter(aluno => aluno.id !== id))
            setId('');
        } catch (error) {
            setTitulo('Erro!');
            setMessage('Erro ao deletar o registro!');
            handleShow();
        }
    }

    return (
        <div className='App'>
            <div className='container'>

                <Box sx={{ display: 'flex' }}>

                    <Grid item xs={12}>

                        <Paper sx={{ p: 10, display: 'flex', flexDirection: 'column', marginLeft: 10, marginTop: 10 }} >
                            <h2>Lista de Alunos</h2>
                            <Table striped bordered hover style={{ marginTop: 30 }}>
                                <thead>
                                    <tr>
                                        <th>Nome do Aluno</th>
                                        <th >Curso</th>
                                        <th >Periodo</th>
                                        <th >Ano Entrada</th>
                                        <th >Semestre Entrada</th>
                                        <th >Grupo de Extensão</th>
                                        <th >Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aluno.map((alunos, i) => (
                                        <tr key={i}>
                                            <td>{alunos.nome}</td>
                                            <td>{alunos.curso}</td>
                                            <td>{alunos.periodo}</td>
                                            <td>{alunos.ano_entrada}</td>
                                            <td>{alunos.semestre_entrada}</td>
                                            <td>{alunos.grupo_extensaos.nome}</td>
                                            <td >

                                                    <Button variant="outline-warning btn-sm" onClick={() => redireciona(alunos.id)}>
                                                        Editar
                                                    </Button>
                                                    <Button variant="outline-danger btn-sm" onClick={() => modal(alunos.id)} style={{marginTop:10}}>
                                                        Deletar
                                                    </Button>
                                              
                                                <Modal show={show2} onHide={handleClose2} animation={false} style={{ marginTop: 150 }}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>{titulo}</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>{message}</Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={() => deleteAluno()}>
                                                            Deletar
                                                        </Button>
                                                        <Button variant="primary" onClick={handleClose2}>Cancelar</Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

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
        </div >

    )
}

export default AlunoList;