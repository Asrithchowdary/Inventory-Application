import React,{useState} from "react";
import "../../styles/addProduct.css";

function AddProduct(){
    const [product,setProduct] = useState({
        name:"",
        price:"",
        category:"",
        stock:"",
        image:"",
        description:"",
    });

    const handleChange =(e) =>{
        setProduct({
            ...product,
            [e.target.name]:e.terget.value,
        });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();

        console.log("Product Added:", product);

        alert("Product Added Successfully");

        setProduct({
            name: "",
            price: "",
            category: "",
            stock: "",
            image: "",
            description: "",
        });
    };

    return(
        <div className="add-product-page">
            <div className="add-product-container">
                <h1>Add New Product</h1>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label>Product Name</label>

                        <input 
                        type="text"
                        name="name"
                        placeholder="Enter product name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="form-group">
                        <label>Price</label>

                        <input
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className="form-group">
                        <label>Category</label>

                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                            >
                                <option value="">Select Category</option>
                                <option value="Men">Men</option>
                                <option value="Women">Women</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Electronics">Electronics</option>
                            </select>
                    </div>

                    <div className="form-group">
                        <label>Stock Quantity</label>

                        <input
                            type="number"
                            name="stock"
                            placeholder="Enter stock quantity"
                            value={product.stock}
                            onChange={handleChange}
                            required
                            />
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>

                        <input
                            type="text"
                            name="image"
                            placeholder="Paste image URL"
                            value={product.image}
                            onChange={handleChange}
                            />
                    </div>

                    <div className="form-group">
                        <label>Description</label>

                        <textarea
                        name="description"
                        rows="4"
                        placeholder="Enter product description"
                        value={product.description}
                        onChange={handleChange}
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-btn">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;