import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


import { useEffect, useState } from "react";
import Axios from "axios";
import{TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Modal, Button, TextField}from '@material-ui/core';
import{Edit,Delete} from '@material-ui/icons';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
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


const baseUrl =`http://localhost:8091/platos`

export default function TableList() {
  const styles= useStyles();
  const classes = useStyles();  
  const [data, setData] = useState([]);

  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);

  const [consolaSeleccionada, setConsolaSeleccionada]=useState({
    nombrePlato: '',
    descPlato: '',
    precioPlato: '',
    categoriaPlato: '',
    ingredientesPlato: '',  
    cantidadPlato: ''
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
    const baseUrlPut = `http://localhost:8091/platos/actualizar-plato`+`/`+consolaSeleccionada.idPlato;
    
    let response;
    var dataNueva=data;
    dataNueva.map(consola=>{
      if(consolaSeleccionada.idPlato===consola.idPlato){
        consola.nombrePlato=consolaSeleccionada.nombrePlato;
        consola.descPlato=consolaSeleccionada.descPlato;
        consola.precioPlato=consolaSeleccionada.precioPlato;
        consola.categoriaPlato=consolaSeleccionada.categoriaPlato;
        consola.ingredientesPlato=consolaSeleccionada.ingredientesPlato;
        consola.cantidadPlato=consolaSeleccionada.cantidadPlato;         
      }
    })
    var authOptions = {
      method: "PUT",
      url: baseUrlPut,
      data: consolaSeleccionada,      
      json: true,
    };
    console.log(authOptions)
    await Axios(authOptions)
      .then(function(response) {
        //setLoading(false);
        abrirCerrarModalEditar();
        alert("El plato ha sido actualizado de manera correcta");
        toast.success('Se actualizó el plato');
        //console.log("1")        
      })
      .catch(function(error) {
        //setLoading(false);
        //console.log("2")
         
      });
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarConsola=(consola, caso)=>{
    setConsolaSeleccionada(consola);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar();
    (caso==='Eliminar')?abrirCerrarModalEliminar():abrirCerrarModalEditar()
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

const peticionDelete=async()=>{   
  console.log(consolaSeleccionada.idPlato)
  const baseUrlDelete = baseUrl+`/eliminar-plato/`+consolaSeleccionada.idPlato;
  console.log(baseUrlDelete);
  await Axios.delete(baseUrlDelete)
  .then(res => {
    console.log(res);
    console.log(res.data);
    abrirCerrarModalEliminar();
    alert("El plato ha sido dado de baja.");
  })
}

const bodyEditar=(
  <div className={styles.modal}>
    <h3>Editar Plato</h3>
    <TextField name="nombrePlato" className={styles.inputMaterial} variant="outlined" label="Nombre del Plato" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombrePlato}/>
    <br />
    <br />   
    <TextField name="descPlato" className={styles.inputMaterial} variant="outlined" label="Descripcion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.descPlato}/>
    <br /><br />
    <TextField name="precioPlato" className={styles.inputMaterial} variant="outlined" label="Precio" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.precioPlato}/>
    <br />
    <br />  
    <TextField name="categoriaPlato" className={styles.inputMaterial} variant="outlined" label="Categoria" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.categoriaPlato}/>
    <br />
    <br />   
    <TextField name="cantidadPlato" className={styles.inputMaterial} variant="outlined" label="Cantidad" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.cantidadPlato}/>
    <br /><br />
    <div align="right">
      <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
      <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
    </div>
  </div>
)

const bodyEliminar=(
  <div className={styles.modal}>
    <h3>Dar de Baja un Plato</h3>
    <TextField name="nombrePlato" className={styles.inputMaterial} variant="outlined" label="Nombre del Plato" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.nombrePlato}/>
    <br />
    <br />   
    <TextField name="descPlato" className={styles.inputMaterial} variant="outlined" label="Descripcion" onChange={handleChange} value={consolaSeleccionada && consolaSeleccionada.descPlato}/>
    <br /><br />
    
    <div align="right">
      <Button color="primary" onClick={()=>peticionDelete()}>Cambiar Estado</Button>
      <Button onClick={()=>abrirCerrarModalEliminar()}>Cancelar</Button>
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
                   <TableCell>Descripción</TableCell>
                   <TableCell>Precio</TableCell>
                   <TableCell>Acciones</TableCell>              
                 </TableRow>
               </TableHead>
               <TableBody>
                 {data.map(console=>(
                   <TableRow 
                   hover                   
                   key={console.idPlato}>
                     <TableCell>{console.nombrePlato}</TableCell>
                     <TableCell>{console.descPlato}</TableCell>
                     <TableCell>{console.precioPlato}</TableCell>
                     <TableCell>
                       <Edit onClick={() =>seleccionarConsola(console,'Editar')}/>
                       &nbsp;&nbsp;&nbsp;
                       <Delete onClick={() =>seleccionarConsola(console,'Eliminar')}/>
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

              <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
              </Modal>         
          </CardBody>
        </Card>
      </GridItem>
    
    </GridContainer>
  );
}