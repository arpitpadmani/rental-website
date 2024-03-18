// UpdateVehicle.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";

const UpdateVehicle = () => {
  const [updatedpProduct, setUpdatedProduct] = useState({
    vehicleName: "",
    vehicleModel: "",
    fuelType: "gasoline",
    transmissionType: "manual",
    hasGPS: "",
    seatingCapacity: "",
    modelYear: "",
    location: "",
    price: "",
    depositPrice: "",
    city: "",
  });

  const [products, setProducts] = useState(null);

  const { id } = useParams();
  console.log(id);
  const [data, setUser] = useState(true);
  useEffect(() => {
    fetch(`http://localhost:5000/api/detail/getProduct/ProductById/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Optional: Log the data received from the server
        setProducts(data);
        if (data) {
          setUpdatedProduct({
            vehicleName: data.vehicleName,
            vehicleModel: data.vehicleModel,
            fuelType: data.fuelType,
            transmissionType: data.transmissionType,
            hasGPS: data.hasGPS,
            seatingCapacity: data.seatingCapacity,
            modelYear: data.modelYear,
            location: data.location,
            price: data.price,
            depositPrice: data.depositPrice,
            city: data.city,
          });
        }
      })
      .catch(error => console.error('Error fetching product:', error));

  }, [id]);
  console.log(updatedpProduct);
  // const vehicle = id === products._id ? sampleVehicle : null;
  const navigate = useNavigate();

  console.log(products);
  const [updatedVehicle, setUpdatedVehicle] = useState({ ...products });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(products);
  };

  const handleUpdate = async (e, req, res) => {

    e.preventDefault();
    try {
      // console.log(user.userData._id);
      // console.log('Request Payload:', JSON.stringify(userData));
      console.log(id);
      const response = await fetch(`http://localhost:5000/api/detail/product/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedpProduct),
      });
      console.log(response);
      const res_data = await response.json();
      console.log(res_data);

      if (response.ok) {
        toast.success("Updated Successfully", { position: "top-right" });
        // console.log("updated successfully done");
        // Handle success
      } else {
        toast.error("Error in updating data", { position: "top-right" })
        // Handle error
        // const errorData = await response.json();
        console.error('Error:');
      }

    } catch (error) {
      toast.error("Error in updating data", { position: "top-right" })
      console.error(error);
    }


    navigate(`/admin/vehicleDetail/${id}`);
  };

  // if (!vehicle) {
  //   return <div className="text-center">Vehicle not found</div>;
  // }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <p className="text-4xl font-semibold text-center mb-4">Update Vehicle</p>
        <hr className="my-4" />
        <div className="flex mt-8 justify-center">
          <div className="w-1/2 pl-4">
            <form className="max-w-md mx-auto">
              <label className="block mb-4">
                Vehicle Name:
                <input
                  type="text"
                  id="vehicleName"
                  name="vehicleName"
                  value={updatedpProduct.vehicleName}
                  onChange={handleChange}
                  className="p-2 border ml-2 rounded-md"
                />
              </label>
              <label className="block mb-4">
                Model:
                <input
                  type="text"
                  id="vehicleModel"
                  name="vehicleModel"
                  value={updatedpProduct.vehicleModel}
                  onChange={handleChange}
                  className="p-2 border ml-2 rounded-md"
                />
              </label>
              <label className="block mb-4">
                Model Year:
                <input
                  type="text"
                  id="modelYear"
                  name="modelYear"
                  value={updatedpProduct.modelYear}
                  onChange={handleChange}
                  className="p-2 border ml-2 rounded-md"
                />
              </label>
              <label className="block mb-4">
                Seats:
                <input
                  type="text"
                  id="seatingCapacity"
                  name="seatingCapacity"
                  value={updatedpProduct.seatingCapacity}
                  onChange={handleChange}
                  className="p-2 border ml-2 rounded-md"
                />
              </label>
              <div className="mb-6">
                <label htmlFor="transmissionType" className="block text-gray-700">
                  Transmission Type:
                </label>
                <select
                  id="transmissionType"
                  name="transmissionType"
                  value={updatedpProduct.transmissionType}
                  onChange={handleChange}
                  className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="fuelType" className="block text-gray-700">
                  Fuel Type:
                </label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={updatedpProduct.fuelType}
                  onChange={handleChange}
                  className="w-full  p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  required
                >
                  <option disabled > setlect Fuel Type</option>
                  <option value="petrol">Petrol</option>
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
              <label className="block mb-4">
                Price:
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={updatedpProduct.price}
                  onChange={handleChange}
                  className="p-2 border ml-2 rounded-md"
                />
              </label>
              <label className="block mb-4">
                Deposit Price:
                <input
                  type="text"
                  id="depositPrice"
                  name="depositPrice"
                  value={updatedpProduct.depositPrice}
                  onChange={handleChange}
                  className="p-2 border ml-2 rounded-md"
                />
              </label>
              <label className="block mb-4">
                GPS Navigation:
                <input
                  type="text"
                  id="hasGPS"
                  name="hasGPS"
                  value={updatedpProduct.hasGPS}
                  onChange={handleChange}
                  className="p-2 border ml-2 rounded-md"
                />
              </label>
              <label className="block mb-4">
                Location :
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={updatedpProduct.location}
                  onChange={handleChange}
                  className="p-2 border ml-2 rounded-md"
                />
              </label>
              <label className="block mb-4">
                City:
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={updatedpProduct.city}
                  onChange={handleChange}
                  className="p-2 border ml-2 rounded-md"
                />
              </label>
              {/* Add more input fields as needed */}
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-black text-white py-2 px-5 mx-32 mt-10 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateVehicle;
