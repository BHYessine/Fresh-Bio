import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../Redux/actions/productsActions";
import "./addProduct.css";
import { Link } from "react-router-dom";
const AddProduct = () => {
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleUploade = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/products/${file.name}`);
    const uploadFile = uploadBytesResumable(storageRef, file);
    uploadFile.on(
      "state_change",
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadFile.snapshot.ref).then((url) => {
          setInputs({ ...inputs, src: url });
        });
      }
    );
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs({ ...inputs, [name]: value });
  };
  const handleSubmit = () => {
    dispatch(addProduct(inputs));
  };

  return (
    <div className="product-details container">
      <form className="product-action">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Enter Title..."
          />
        </label>
        <label>
          Type:
          <select
            name="type"
            value={inputs.type || "Choose Type"}
            onChange={handleChange}
          >
            <option value="Choose Type" disabled>
              Choose Type
            </option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Meat">Meat</option>
            <option value="Chicken">Chicken</option>
          </select>
        </label>
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={inputs.price}
            onChange={handleChange}
            placeholder="Enter Price..."
          />
        </label>

        <label>
          Unit:
          <select
            name="unit"
            value={inputs.unit || "Choose Unit"}
            onChange={handleChange}
          >
            <option value="Choose Unit" disabled>
              Choose Unit
            </option>
            <option value="Kg">Kg</option>
            <option value="Piece">Piece</option>
            <option value="Packet">Packet</option>
          </select>
        </label>
        <label>
          Stock:
          <input
            type="text"
            name="stock"
            value={inputs.stock}
            onChange={handleChange}
            placeholder="Enter Stock..."
          />
        </label>
        <label>
          Photo:
          <input
            type="file"
            name="src"
            onChange={(e) => handleUploade(e.target.files[0])}
          />
        </label>
        {progress === 100 && (
          <img src={inputs.src} alt="" width="150px" height="150px" />
        )}
        <div className="btn-action">
          <Link to="/admin/products">
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={progress !== 100}
            >
              Add
            </button>
          </Link>

          <Link to="/admin/products">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
