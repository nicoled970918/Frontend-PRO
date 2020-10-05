import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table2 from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import { useEffect, useState } from "react";
import Axios from "axios";
import{TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Modal, Button, TextField}from '@material-ui/core';
import{Edit,Delete} from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));


const baseUrl =`http://localhost:8080/api/v1/usuarios`

export default function TableList() {
  const styles= useStyles();
  const classes = useStyles();  
  const [data, setData] = useState([]);

  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    codUsuario: '',
    nomCliente:''
  })
  const handleChange=e=>{
    const {name, value}=e.target;
    setConsolaSeleccionada(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(consolaSeleccionada);
  }

  
  const peticionPut=async()=>{
    console.log("Put");
    await Axios.put(baseUrl+consolaSeleccionada.id, consolaSeleccionada)
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(consola=>{
        if(consolaSeleccionada.id===consola.id){
          consola.codUsuario=consolaSeleccionada.codUsuario;
          consola.nomCliente=consolaSeleccionada.nomCliente;
         
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola=(consola, caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  const peticionGet= async()=>{
    await Axios.get(baseUrl)
    .then(response=>{
      setData(response.data)
      console.log(response.data)
    })
    .catch((error)=>{console.log(error)})
  }
useEffect(()=>{
   peticionGet();
},[])

const columns = [
  { id: "nomCliente", label: "Nombre del Plato" },
 
  {
    id: "codUsuario",
    label: "Categoria",
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

const bodyEditar=(
  <div className={styles.modal}>
    <h3>Editar Plato</h3>
    <TextField name="nomCliente" className={styles.inputMaterial} variant="outlined" label="Nombre del Plato" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nomCliente}/>
    <br />
    <br />   
    <TextField name="codUsuario" className={styles.inputMaterial} variant="outlined" label="Descripcion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.codUsuario}/>
    <br /><br />
    <div align="right">
      <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
      <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
    </div>
  </div>
)

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>TABLA DE PLATOS</h4>
            <p className={classes.cardCategoryWhite}>
              Aqui encontraras todos los platos que oferta el restaurante 
            </p>
          </CardHeader>
          <CardBody>
           <TableContainer>
             <Table>
               <TableHead>
                 <TableRow>
                   <TableCell>Nombre del Plato</TableCell>
                   <TableCell>Categoria</TableCell>
                   <TableCell>Acciones</TableCell>              
                 </TableRow>
               </TableHead>
               <TableBody>
                 {data.map(console=>(
                   <TableRow key={console.id}>
                     <TableCell>{console.nomCliente}</TableCell>
                     <TableCell>{console.codUsuario}</TableCell>
                     <TableCell>
                       <Edit onClick={() =>seleccionarConsola(console,'Editar')}/>
                       &nbsp;&nbsp;&nbsp;
                       <Delete/>
                     </TableCell>
                   </TableRow>
                 ))}
              
                    
               </TableBody>
             </Table>
           </TableContainer>
              <Modal
                open={modalEditar}
                onClose={abrirCerrarModalEditar}>
                {bodyEditar}
              </Modal>         
          </CardBody>
        </Card>
      </GridItem>
    
    </GridContainer>
  );
}
