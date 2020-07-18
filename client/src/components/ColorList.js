import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, refresh, setRefresh}) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = e => {
    e.prevetnDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors`, colorToAdd)
      .then(res => {
        setRefresh(!refresh);
      })
      .catch(err => console.log(err));
  }

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setRefresh(!refresh);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = e => {
    // make a delete request to delete this color
   axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${colors.id}`)
    .then(res => {
      setRefresh(!refresh);
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='colors-wrap'>
      <p>Colors</p>

      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}>
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit Color</legend>
          <label>
            Color Name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            Hex Code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>Save Color</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
    </div>
  );
};

export default ColorList;
