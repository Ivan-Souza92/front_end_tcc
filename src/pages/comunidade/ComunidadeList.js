import '../../App.css';
import { api } from '../../services/api';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Modal from 'react-bootstrap/Modal'

const ComunidadeList = () => {

  const [comunidade, setComunidades] = useState([]);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [titulo, setTitulo] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loadComunidades = async () => {
    try {
      const res = await api.get('/comunidade/list')
      setComunidades(res.data)
      console.log(comunidade)
    } catch (error) {
      console.log(error);
      //alert("Não foi possível listar as comunidades.")
      setTitulo('Sem Conexão!');
      setMessage('Não foi possível listar as comunidades!');
      handleShow();
    }
  }


  useEffect(() => {
    loadComunidades()
  }, [])

  return (
    <div className='App'>
      <div className='container'>

        <Box sx={{ display: 'flex' }}>

          <Grid item xs={12}>

            <Paper sx={{ p: 10, display: 'flex', flexDirection: 'column', marginLeft: 10, marginTop: 10 }} >
              <h2>Lista de Comunidades</h2>
              <Table table-success table-striped style={{ marginTop: 30 }}>
                <thead>
                  <tr>
                    <th>Nome da Comunidade</th>
                    <th style={{ width: 300 }}>Quantidade de Pessoas Atendidas</th>
                    <th>Email</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {comunidade.map((comunidades, i) => (
                    <tr key={i}>
                      <td>{comunidades.nome}</td>
                      <td>{comunidades.qtd_pessoas_atendidas}</td>
                      <td>{comunidades.email}</td>
                      <td>
                        <Button variant="outline-warning btn-sm" style={{ marginRight: 15 }}>
                          Editar
                        </Button>
                        <Button variant="outline-danger btn-sm">
                          Deletar
                        </Button>
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
    </div>

  )
}

export default ComunidadeList;