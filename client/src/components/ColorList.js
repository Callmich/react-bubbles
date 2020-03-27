import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" },
  id: ""
};

const ColorList = ({ colors, updateColors }) => {
  console.log("inital colors", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const id = colorToEdit.id

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const { push } = useHistory();

  const saveEdit = e => {
    e.preventDefault();
    console.log(id)
      axiosWithAuth()
        .put(`/api/colors/${id}`, colorToEdit)
        .then(rez =>{
          console.log("PUT req", rez)
          const updatedColors = colors.map(color => {
            console.log("Look Here!", color.id, id)
            if(color.id=== id){
              return colorToEdit
            } else{
              return color
            }
          })
          console.log("New Array", updatedColors)
          updateColors(updatedColors)
          console.log("after update",colors)
          push('/colors')
        })
        .catch(errz =>{
          console.log("Put Err",errz)
        })


    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    const deleteId = `${color.id}`
    axiosWithAuth()
      // console.log("What is color in the delete?", deleteId)
      .delete(`/api/colors/${deleteId}`)
      .then(resp => {
        console.log("resp from delete", resp)
        const listMinus = colors.filter(shade => {
          console.log("ThrowingShade!!!!!",shade.id, deleteId)
          if (`${shade.id}` === deleteId){

          }else{
            return shade
          }
        })
        updateColors(listMinus)
      })
      .catch(error => {
        console.log(error.response)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
