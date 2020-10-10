import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import TextField from '@material-ui/core/TextField';


import Axios from "axios";

const baseUrl =`http://localhost:8091/platos`
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  row: {
    display: "flex",
    spacing: 10,
    marginBottom: 25,
  },
  item: {
    marginRight: "5%",
  },
  select: {
    width: "30%",
    marginRight: "5%",
  },
  selectRight: {
    width: "30%",
  },
  sendData: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignContent: "flex-end",
    flexDirection: "row",
    display: "flex",
  },
}));



export default function UserProfile() {
  const classes = useStyles();
  
  const [nombrePlato, setNombrePlato] = React.useState("");
  const [descPlato, setDescPlato] = React.useState("");
  const [precioPlato, setPrecioPlato] = React.useState("");
  const [imgPlato, setImgPlato] = React.useState("");
  const [categoriaPlato, setCategoriaPlato] = React.useState("");
  const [ingredientesPlato, setIngredientesPlato] = React.useState("");
  const [statusPlato, setStatusPlato] = React.useState("ACTIVATED");
  const [cantidadPlato, setCantidadPlato] = React.useState("");
 // const [errorNombre, setErrorNombre] = React.useState("");

 
  async function sendData() {
     
   
      var authOptions = {
        method: "POST",
        url: baseUrl,
        data: {
          idPlato : 5,
          nombrePlato: nombrePlato,
          descPlato: descPlato,
          precioPlato: precioPlato,
          categoriaPlato: categoriaPlato,
          ingredientesPlato: ingredientesPlato,
          statusPlato: statusPlato,
          cantidadPlato: cantidadPlato,
          restaurante: {imgRest: 1,},/*
              {categoriaRest: "asadero",
              descRest: "Pollo frito",
              idRest: 1,
              imgRest: "vacio",
              nombreRest: "Pio Pio", },
          //restaurante :{},  
       */
        },      
        json: true,
      };
      console.log(authOptions);
      await Axios(authOptions)
        .then(function(response) {
          //setLoading(false);
          console.log(response.data); 
          //console.log("1")        
        })
        .catch(function(error) {
          //setLoading(false);
          //console.log("2")
        });
   
  }
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Crear un Plato</h4>
              <p className={classes.cardCategoryWhite}>Complete los campos</p>
            </CardHeader>
            <CardBody>
              <GridContainer>                
                <GridItem xs={12} sm={12} md={6}>    
                <TextField                  
                  className={classes.item}
                  margin="normal"
                  required
                  fullWidth
                  label="Nombre del Plato"
                  variant="outlined"
                  onChange={(e) => setNombrePlato(e.target.value)}   
                            
                />                              
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>    
                <TextField                 
                  className={classes.item}
                  margin="normal"
                  required ="true"
                  fullWidth
                  label="Descripción"
                  variant="outlined"
                  onChange={(e) => setDescPlato(e.target.value)}                  
                />                            
                </GridItem>     
                
                <GridItem xs={12} sm={12} md={6}>    
                <TextField                 
                  className={classes.item}
                  margin="normal"
                  required
                  fullWidth
                  label="Precio"
                  variant="outlined"
                  onChange={(e) => setPrecioPlato(e.target.value)}                  
                />                            
                </GridItem>  
                
                <GridItem xs={12} sm={12} md={6}>    
                <TextField                 
                  className={classes.item}
                  margin="normal"
                  required
                  fullWidth
                  label="Categoria"
                  variant="outlined"
                  onChange={(e) => setCategoriaPlato(e.target.value)}                  
                />                            
                </GridItem>  
                <GridItem xs={12} sm={12} md={6}>    
                <TextField                 
                  className={classes.item}
                  margin="normal"
                  required
                  fullWidth
                  label="Ingredientes"
                  variant="outlined"
                  onChange={(e) => setIngredientesPlato(e.target.value)}                  
                />                            
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>    
                <TextField                 
                  className={classes.item}
                  margin="normal"
                  required
                  fullWidth
                  label="Platos Producidos"
                  variant="outlined"
                  onChange={(e) => setCantidadPlato(e.target.value)}                  
                />                            
                </GridItem>                  
              </GridContainer>              
            </CardBody>           
          </Card>
        </GridItem>      
      </GridContainer>

      <div className={classes.sendData}>
        <Button onClick={sendData} variant="contained" color="primary">
          Crear
        </Button>
      </div>
    </div>
  );
}
