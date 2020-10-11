import React, { useState } from "react";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Axios from "axios";

import {Form, Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Input, StyledInlineErrorMessage,} 
        from "../../assets/jss/material-styles-form/styles-form";

const baseUrl =`http://localhost:8091/platos`;
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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function UserProfile() {
  const classes = useStyles();
  const [formValues, setFormValues] = React.useState();
  const [nombrePlato, setNombrePlato] = React.useState("");
  const [descPlato, setDescPlato] = React.useState("");
  const [precioPlato, setPrecioPlato] = React.useState("");
  const [imgPlato, setImgPlato] = React.useState("");
  const [categoriaPlato, setCategoriaPlato] = React.useState("");
  const [ingredientesPlato, setIngredientesPlato] = React.useState("");
  const [statusPlato, setStatusPlato] = React.useState("ACTIVATED");
  const [cantidadPlato, setCantidadPlato] = React.useState("");

 
  async function sendData(values) {
      var authOptions = {
        method: "POST",
        url: baseUrl,
        //dataAux: dataAux,
        data: {
          idPlato : 9,
          //nombrePlato: nombrePlato,
          nombrePlato: values.nombrePlato,
          //descPlato: descPlato,
          descPlato: values.descPlato,
          //precioPlato: precioPlato,
          precioPlato: values.precioPlato,
          //categoriaPlato: categoriaPlato,
          categoriaPlato: values.categoriaPlato,
          //ingredientesPlato: ingredientesPlato,
          ingredientesPlato: values.ingredientesPlato,
          //statusPlato: statusPlato,
          statusPlato: values.statusPlato,
          //cantidadPlato: cantidadPlato,
          cantidadPlato: values.cantidadPlato,
          restaurante: {imgRest: 1,},
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
          //console.log("0")
        });
   
  }

  const initialValues = ({
    nombrePlato: "",
    descPlato: "",
    precioPlato: "",
    categoriaPlato: "",
    ingredientesPlato: "",
    cantidadPlato: "",
  });
  
  const validationSchema = Yup.object({
    nombrePlato: Yup.string()
      .min(3, "El nombre del plato es demasiado corto")
      .required("Por favor, ingrese el nombre del plato"),

    ingredientesPlato: Yup.string()
      .min(3, "Los datos ingresados son demasiado cortos")
      .required("Por favor, ingrese los ingredientes del plato"),

    descPlato: Yup.string()
      .min(3, "La descipcion del plato es demasiado corta")
      .required("Por favor, ingrese la descripcion del plato"),

    precioPlato: Yup.number()
      //.min(2, "Ingrese un valor mayor a cero (0)")
      .required("Por favor, ingrese el valor del plato"),
    
    categoriaPlato: Yup.string()
      .min(3, "La categoria del plato es demasiado corta")
      .required("Por favor, ingrese la categoria del plato"),

    cantidadPlato: Yup.number()
      //.min(2, "Ingrese un valor mayor a cero (0)")
      .required("Por favor, ingrese la cantidad de platos"),
  });

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
            <Formik
              initialValues = {initialValues}
              validationSchema={validationSchema}
              
              onSubmit={(values, actions) => {
                console.log(values);
                sendData(values);

                const timeOut = setTimeout(() => {
                  actions.setSubmitting(false);
                  clearTimeout(timeOut);
                }, 1000);
              }}
            >
            {({
              values, errors, touched, handleSubmit,
              isSubmitting, isValidating, isValid,
            }) => {
              return (<>
              <Form onSubmit={handleSubmit}>
              <GridContainer xs={12} sm={12} md={12}>
              
              <GridItem xs={12} sm={12} md={8}>                
                <GridItem>    
                <Input                  
                  className={classes.item}
                  name="nombrePlato"
                  type = "text"
                  fullWidth
                  placeholder="Nombre del Plato*"
                  variant="outlined"
                  //onChange={(e) => setNombrePlato(e.target.value)}    
                  valid={touched.nombrePlato && !errors.nombrePlato}
                  error={touched.nombrePlato && errors.nombrePlato}    
                />
                {errors.nombrePlato && touched.nombrePlato && (
                  <StyledInlineErrorMessage>{errors.nombrePlato}</StyledInlineErrorMessage>
                )}
                </GridItem>

                <GridItem>    
                <Input                 
                  className={classes.item}
                  name="categoriaPlato"
                  type = "text"
                  fullWidth
                  placeholder="Categoría del Plato*"
                  variant="outlined"
                  //onChange={(e) => setCategoriaPlato(e.target.value)}      
                  valid={touched.categoriaPlato && !errors.categoriaPlato}
                  error={touched.categoriaPlato && errors.categoriaPlato}    
                />
                {errors.categoriaPlato && touched.categoriaPlato && (
                  <StyledInlineErrorMessage>{errors.categoriaPlato}</StyledInlineErrorMessage>
                )}                           
                </GridItem>

                <GridItem>    
                <Input                 
                  className={classes.item}
                  name="ingredientesPlato"
                  type = "text"
                  fullWidth
                  placeholder="Ingredientes del Plato*"
                  variant="outlined"
                  //onChange={(e) => setIngredientesPlato(e.target.value)}          
                  valid={touched.ingredientesPlato && !errors.ingredientesPlato}
                  error={touched.ingredientesPlato && errors.ingredientesPlato}    
                />
                {errors.ingredientesPlato && touched.ingredientesPlato && (
                  <StyledInlineErrorMessage>{errors.ingredientesPlato}</StyledInlineErrorMessage>
                )}                          
                </GridItem>

                <GridItem>    
                <Input                 
                  className={classes.item}
                  name="descPlato"
                  type = "text"
                  fullWidth
                  placeholder="Descripción del Plato*"
                  variant="outlined"
                  //multiline
                  //rows={4}
                  //onChange={(e) => setDescPlato(e.target.value)}             
                  valid={touched.descPlato && !errors.descPlato}
                  error={touched.descPlato && errors.descPlato}    
                />
                {errors.descPlato && touched.descPlato && (
                  <StyledInlineErrorMessage>{errors.descPlato}</StyledInlineErrorMessage>
                )}                           
                </GridItem>    
                
                <GridItem>    
                <Input                 
                  className={classes.item}
                  name="cantidadPlato"
                  type = "number"
                  min="1"
                  pattern="^[0-9]+"
                  fullWidth
                  placeholder="Cantidad*"
                  variant="outlined"
                  //onChange={(e) => setCantidadPlato(e.target.value)}
                  valid={touched.cantidadPlato && !errors.cantidadPlato}
                  error={touched.cantidadPlato && errors.cantidadPlato}    
                />
                {errors.cantidadPlato && touched.cantidadPlato && (
                  <StyledInlineErrorMessage>{errors.cantidadPlato}</StyledInlineErrorMessage>
                )}                           
                </GridItem> 
                
                <GridItem>    
                <Input                 
                  className={classes.item}
                  name="precioPlato"
                  type = "number"
                  min="1"
                  pattern="^[0-9]+"
                  fullWidth
                  placeholder="Precio del Plato*"
                  variant="outlined"
                  //onChange={(e) => setPrecioPlato(e.target.value)}              
                  valid={touched.precioPlato && !errors.precioPlato}
                  error={touched.precioPlato && errors.precioPlato}    
                />
                {errors.precioPlato && touched.precioPlato && (
                  <StyledInlineErrorMessage>{errors.precioPlato}</StyledInlineErrorMessage>
                )}                           
                </GridItem>
              </GridItem>

              <GridItem xs={12} sm={12} md={4}>
                <div className={classes.sendData}>
                  <Button fullWidth  variant="contained" color="primary" type="submit" disabled={!isValid || isSubmitting}>
                    AGREGAR PLATO
                  </Button>
                </div>
              </GridItem>
              </GridContainer>
              </Form>
              </>);
              }}
            </Formik> 
            </CardBody>           
          </Card>
        </GridItem>      
      </GridContainer>

      
    </div>
  );
}
