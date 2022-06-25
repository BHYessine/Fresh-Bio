import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../../Redux/actions/productsActions";
import { Link } from "react-router-dom";

const EditProduct = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productReducer.product);

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setInputs(product);
  }, [product]);

  const handleUploade = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/products/${file.name}`);
    const uploadFile = uploadBytesResumable(storageRef, file);
    uploadFile.on(
      "state_change",
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
    dispatch(editProduct(product._id, inputs));
  };

  return (
    <div className="product-details container">
      {inputs && (
        <form className="product-action">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={inputs && inputs?.title}
              onChange={handleChange}
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
              value={inputs.price || ""}
              onChange={handleChange}
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
              value={inputs.stock || ""}
              onChange={handleChange}
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
          <img src={inputs.src} alt="" width="150px" height="150px" />
          <div className="btn-action">
            <Link to="/admin/products" onClick={handleSubmit}>
              Update Product
            </Link>
            <Link to="/admin/products">Cancel</Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
