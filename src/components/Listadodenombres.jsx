import { useState } from "react"
import  uniqid  from "uniqid"

export const Listadodenombres = () => {
 
 const [nombre,setNombre] = useState('')
 const [listaNombres,setListadonombres] = useState([])
 const [modoEdicion,setModoEdicion] = useState(false)
 const [id,setId] = useState('')
 const [error,setError] = useState(null)

 const addNombre = (e) =>{
   e.preventDefault()
   if(!nombre.trim()){
     setError('El campo nombre esta vacio')
     return
   }
   const nuevoNombre= {
     id: uniqid(),
     tituloNombre:nombre
   }
   setListadonombres([...listaNombres,nuevoNombre])
   setNombre('')
   setError(null)
 }

 const deleteNombre = (id)=>{
    const nuevoArray = listaNombres.filter(item =>item.id !== id)
    setListadonombres(nuevoArray)

 }

 const editar = (item) =>{
   setModoEdicion(true)
   setNombre(item.tituloNombre)
   setId(item.id)
 }

 const editarNombre=(e)=>{
   e.preventDefault()
   const nuevoArray = listaNombres.map(item => item.id === id ? {id:id, tituloNombre:nombre}: item)
   setListadonombres(nuevoArray)
   setModoEdicion(false)
   setNombre('')
 }
 
 
  return (
    <div>
        <h2>Aplicacion CRUD basica</h2>
      <div className="row"> 
          <div className="col ">
              <h2>Listado de nombres</h2>
              <ul className="list-group">
                {
                  listaNombres.map(item =>
                    <li key={item.id} className="list-group-item">
                      {item.tituloNombre}
                      <button
                        className="btn btn-danger float-end"
                        onClick={() => deleteNombre(item.id)}
                      >
                        Borrar

                      </button> 
                      <button
                        className="btn btn-info float-end"
                        onClick={() => editar(item)}
                      >
                        Editar

                      </button>
                    </li>
                )
                }
              </ul>
          </div>
          <div className="col">
              <h2>Formulario para añadir nombres</h2>
              <form onSubmit={modoEdicion ? editarNombre: addNombre} className="form-group">
                <input onChange={(e)=>{setNombre(e.target.value)}} type="text"
                 className="form-control mb-3
                 " placeholder="introduce un nombre"
                 value={nombre}
                  />
                <input 
                className="btn btn-info btn-block" 
                type="submit" 
                value={modoEdicion ? "Editar nombre": "Registrar nombre"}
                />
              </form>
              {
                error != null && <div className="alert alert-danger">
                  {error}
                </div>
              }
          </div>
      </div>
    </div>
  )
}
