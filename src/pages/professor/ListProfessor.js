import '../../App.css';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from 'react-bootstrap/Modal'

const ListProfessor = () => {

  const [professor, setProfessor] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [message, setMessage] = useState('');
  const [titulo, setTitulo] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  useEffect(() => {
    loadProfessor()
  }, [])

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

  const modal = () => {
    setTitulo('Atenção!')
    setMessage('Deseja excluir esse registro?')
    handleShow2();
  }

  const deleteProf = async (id) => {
    try {
      await api.delete('/professor/delete/' + id)
      setTitulo('Sucesso!');
      setMessage('Registro deletado com sucesso!');
      handleShow();
      setProfessor(professor.filter(professor => professor.id !== id)) 
    } catch (error) {
      setTitulo('Erro!');
      setMessage('Erro ao deletar o registro!');
      handleShow();
      console.log(error)
    }
  }

  return (
    <div className='App'>
      <div className='container'>

        <Box sx={{ display: 'flex' }}>

          <Grid item xs={12}>

            <Paper sx={{ p: 10, display: 'flex', flexDirection: 'column', marginLeft: 10, marginTop: 10 }} >
              <h2>Lista de Professores Cadastrados</h2>
              <Table striped bordered hover style={{ marginTop: 30 }}>
                <thead>
                  <tr>
                    <th>Nome do Professor</th>
                    <th >Curso</th>
                    <th >Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {professor.map((professores, i) => (
                    <tr key={i}>
                      <td style={{ width: 300 }}>{professores.nome}</td>
                      <td style={{ width: 300 }}>{professores.curso}</td>
                      <td>
                        <Button variant="outline-warning btn-sm" style={{ marginRight: 15 }}>
                          Editar
                        </Button>
                        <Button variant="outline-danger btn-sm" onClick={() => modal()}>
                          Deletar
                        </Button>
                        <Modal show={show2} onHide={handleClose2} animation={false} style={{ marginTop: 150 }}>
                          <Modal.Header closeButton>
                            <Modal.Title>{titulo}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>{message}</Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={() => deleteProf(professores.id)}>
                              Deletar
                            </Button>
                            <Button variant="primary">Cancelar</Button>
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

export default ListProfessor;