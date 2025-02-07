import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";

const ProductForm = (props) => {
  const { isVisible, setIsVisible } = props;

  const {
    createProduct,
    deleteProduct,
    editProduct,
    updateProduct,
  } = useContext(ProductContext);

  const initialProductState = {
    _id: null,
    name: "",
    price: 0,
    expiry_date: null,
  };

  const [productData, setProductData] = useState(initialProductState);

  useEffect(() => {
    if (editProduct) setProductData(editProduct);
  }, [editProduct]);

  const updateProductName = (e) => {
    setProductData({
      ...productData,
      name: e.target.value.trim(),
    });
  };

  const updateProductPrice = (value) => {
    setProductData({
      ...productData,
      price: value,
    });
  };

  const _deleteProduct = () => {
    if (editProduct) {
      deleteProduct(productData._id);
      setProductData(initialProductState);
    }
    setIsVisible(false);
  };

  const saveProduct = () => {
    if (!editProduct) {
      createProduct(productData);
    } else {
      updateProduct(productData);
    }
    setProductData(initialProductState);
    setIsVisible(false);
  };

  const dialogFooter = (
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Delete" icon="pi pi-times" onClick={_deleteProduct} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
    </div>
  );

  const clearSelected = () => {
    setIsVisible(false);
    setProductData(initialProductState);
  };

  return (
    <div>
      <Dialog
        visible={isVisible}
        modal={true}
        style={{ width: "420px" }}
        contentStyle={{ overflow: "visible" }}
        header="Detalles del Producto"
        onHide={() => clearSelected()}
        footer={dialogFooter}
      >
        <div className="p-grid p-fluid">
          <br />
          <div className="p-float-label">
            <InputText
              value={productData.name}
              onChange={updateProductName}
            />
            <label>Nombre:</label>
          </div>
          <br />
          <div className="p-float-label">
            <InputNumber
              value={productData.price}
              onValueChange={(e) => updateProductPrice(e.value)}
              mode="currency"
              currency="USD"
            />
            <label>Precio:</label>
          </div>
          <br />
          <div className="p-float-label">
            <Calendar
              value={
                productData.expiry_date &&
                new Date(productData.expiry_date + " ")
              }
              onChange={(e) =>
                setProductData({
                  ...productData,
                  expiry_date: e.target.value.toISOString().substring(0, 10),
                })
              }
              dateFormat="yy-mm-dd"
            />
            <label>Fecha de caducidad:</label>
          </div>
          <br />
        </div>
      </Dialog>
    </div>
  );
};

export default ProductForm;