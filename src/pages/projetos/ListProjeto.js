import '../../App.css';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from 'react-bootstrap/Modal'

const ListProjeto = () => {

  const [projeto, setProjeto] = useState([]);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [message, setMessage] = useState('');
  const [titulo, setTitulo] = useState('');
  const [id, setId ] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const redireciona = (id) => {
    window.location.href = '/projeto/' + id;
  }

  useEffect(() => {
    loadProjeto()
  }, [])

  const loadProjeto = async () => {
    try {
      const res = await api.get('/projeto/list_all')
      setProjeto(res.data)
    } catch (error) {
      console.log(error);
      setTitulo('Sem Conexão!');
      setMessage('Não foi possível listar os Grupos de Extensao!');
      handleShow();
    }
  }

  const modal = (idProj) => {
    setTitulo('Atenção!')
    setMessage('Deseja excluir esse registro?')
    handleShow2();
    setId(idProj);
  }

  const deleteGrupo = async () => {
    handleClose2()
    try {
      await api.delete('/projeto/delete/'+ id)
      setTitulo('Sucesso!');
      setMessage('Registro deletado com sucesso!');
      handleShow();
      setProjeto(projeto.filter(projeto => projeto.id !== id)) 
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
              <h2>Lista de Projetos</h2>
              <Table striped bordered hover style={{ marginTop: 30 }}>
                <thead>
                  <tr>
                    <th>Descrição do Projeto</th>
                    <th >Nome do Grupo de Extensão</th>
                    <th >Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {projeto.map((projetos, i) => (
                    <tr key={i}>
                      <td style={{ width: 300 }}>{projetos.descricao}</td>
                      <td>{projetos.grupo_extensaos.nome}</td>
                      <td>
                        <Button variant="outline-warning btn-sm" onClick={() => redireciona(projetos.id)} style={{ marginRight: 15 }}>
                          Editar
                        </Button>
                        <Button variant="outline-danger btn-sm" onClick={() => modal(projetos.id)}>
                          Deletar
                        </Button>
                        <Modal show={show2} onHide={handleClose2} animation={false} style={{ marginTop: 150 }}>
                          <Modal.Header closeButton>
                            <Modal.Title>{titulo}</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>{message}</Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={() => deleteGrupo()}>
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

export default ListProjeto;