import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './components/listItems';
import ListProfessor from './pages/professor/ListProfessor';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CadastroProfessor from './pages/professor/CadastroProfessor';
import CadastrarComunidade from './pages/comunidade/CadastrarComunidade';
import ComunidadeList from './pages/comunidade/ComunidadeList';
import Drawer from './components/Drawer';
import AppBar from './components/AppBar';
import EditProfessor from './pages/professor/EditProfessor';
import GrupoExtensao from './pages/grupo_extensao/GrupoExtensao';
import ListGroup from './pages/grupo_extensao/ListGrupo';
import EditGrupo from './pages/grupo_extensao/EditGrupo';
import Projeto from './pages/projetos/Projeto';
import ListProjeto from './pages/projetos/ListProjeto';
import ComunidadeEdit from './pages/comunidade/ComunidadeEdit';
import ProjetoEdit from './pages/projetos/ProjetoEdit';
import Aluno from './pages/aluno/Aluno';
import AlunoList from './pages/aluno/AlunoList';
import AlunoEdit from './pages/aluno/AlunoEdit';




const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px',
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Granbery
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              <Divider sx={{ my: 1 }} />
              {secondaryListItems}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/professor" element={<CadastroProfessor />} />
              <Route path="/professor/list" element={<ListProfessor />} />
              <Route path="/professor/:id" element={<EditProfessor/>} />
              <Route path="/grupo_extensao" element={<GrupoExtensao />} />
              <Route path="/grupo_extensao/list" element={<ListGroup />} />
              <Route path="/grupo_extensao/:id" element={<EditGrupo />} />
              <Route path="/comunidade/create" element={<CadastrarComunidade />} />
              <Route path="/comunidade/listing" element={<ComunidadeList />} />
              <Route path="/comunidade/:id" element={<ComunidadeEdit />} />
              <Route path="/projeto" element={<Projeto />} />
              <Route path="/projeto/list" element={<ListProjeto />} />
              <Route path="/projeto/:id" element={<ProjetoEdit />} />
              <Route path="/aluno" element={<Aluno />} />
              <Route path="/aluno/list" element={<AlunoList />} />
              <Route path="/aluno/:id" element={<AlunoEdit />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}