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

const baseUrl =`http://localhost:8080/api/v1/usuarios`
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
  
  const [codUsuario, setCodUser] = React.useState("");
  const [nomCliente, setNomClient] = React.useState("");
 
  async function sendData() {
 
      var authOptions = {
        method: "POST",
        url: baseUrl,
        data: {
          codUsuario: codUsuario,
          nomCliente: nomCliente,   
       
        },      
        json: true,
      };
      console.log(authOptions);
      await Axios(authOptions)
        .then(function(response) {
          //setLoading(false);
          console.log(response.data); 
          console.log("1")        
        })
        .catch(function(error) {
          //setLoading(false);
          console.log("2")
        });
   
  }
  /*
  const [formulario,setFormulario] = useState({
    codUsuario: '',
    nomCliente: ''
  })
  const handleChange =  e =>{
    const{name,value}= e.target;
    setFormulario(prevState=>({
      ...prevState,
      [name]:value
    }))
    console.log(formulario)
    
  }

  var formularioBody =(
    <div>
      <TextField name="nomCliente" id="outlined-basic" label="Nombre Plato" variant="outlined" onChange={handleChange}/>
                  &nbsp;&nbsp;&nbsp;
      <TextField  name="codUsuario" id="outlined-basic" label="Descripción" variant="outlined" onChange={handleChange}/>
      <div align="right">
      <Button onclick ={peticionPost} color="primary">Crear Plato</Button>
      </div>
     
    </div>

  )
  var peticionPost= ()=>{
    console.log("Entramos")
    Axios.post(baseUrl, formulario)
    .then(response=>{
      setData(data.concat(response.data))
      console.log(response.data)
    })
    .catch((error)=>{console.log(error)})
  }
*/
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
                  onChange={(e) => setNomClient(e.target.value)}                  
                />                              
                </GridItem>

                <GridItem xs={12} sm={12} md={6}>    
                <TextField                 
                  className={classes.item}
                  margin="normal"
                  required
                  fullWidth
                  label="Descripción"
                  variant="outlined"
                  onChange={(e) => setCodUser(e.target.value)}                  
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
