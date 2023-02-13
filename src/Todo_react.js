import React, { useState } from "react";
import "./Todo_react.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import img from './Todo_img.png';


const Todo_react = () => {
 
  const getLocalItems =()=>{
    let list = localStorage.getItem("mytodolist");
    if(list){
      return JSON.parse(localStorage.getItem('mytodolist'));
    }
    else{
      return [];
    }
  }

  const [inputData, setInputdata] = useState("");
  const [items, setItems] = useState(getLocalItems());
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/read');
      setItems(response.data);
    };
    fetchData();
  }, []);
  
  const addItems = async () => {
    if (inputData) {
      const id = new Date().getTime().toString();
      const data = { id, Data: inputData };
      await axios.post('/create', data);
      const response = await axios.get('/read');
      setItems(response.data);
      setInputdata('');
    } else {
      toast.info('Fill the details', {
        position: 'top-center',
        autoClose: 1999,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };
  
  const deleteItem = async (id) => {
    await axios.delete(`/delete/${id}`);
    const response = await axios.get('/read');
    setItems(response.data);
  };
  

  const removeall = () => {
    setItems([]);
  };
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
     addItems();
    }
  };
 
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <center>
            {" "}
            <img
              src={img}
              alt="Todo List"
            />
            <br /> <p>Add Your List Here ✌️</p>
            <div className="addItems">
              <div className="input-group mb-3 ">
                <input style={{ width: "200px" }} type="text" id="input" name="Data" className="form-control" placeholder="✍ Add items..." aria-describedby="button-addon2" value={inputData} onKeyDown={handleKeyDown} onChange={(event) => {setInputdata(event.target.value);}} />
                <button className="btn btn-dark" type="button" id="button-addon2" onClick={addItems}> <i className="fa fa-plus add-btn" title="Update item"></i></button>
              </div> 

            </div>
            <div className="showItems">
              {items.map((value) => {
                return (
                    <div className="eachItems" key={value.id}>
                      <div>
                        <div style={{ width: "420px", wordWrap: "break-word"}} className="inpt">
                          {value.Data}
                        </div>
                      </div>
                      <div className="btnn">
                          <button className="btn btn-light btn1" type="button" id="button-addon2" onClick={() => {  deleteItem(value.id); }}  > <i  className="far fa-trash-alt add-btn del_btn"  title="Delete item" ></i>  </button></div>
                        </div>
                );
              })}
            </div>
            <div className="remove">
              <button style={{ fontSize: "bold" }} type="button"className="btn btn-danger" onClick={removeall}
              >
                REMOVE ALL
              </button>
            </div>
          </center>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}


export default Todo_react;
