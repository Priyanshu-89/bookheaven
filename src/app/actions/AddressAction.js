"use server"
import Dbconnect from "../libs/Dbconnect";
import AddressUser from "../models/Address";

export const handleAddress = async (formData) => {

        await Dbconnect()
        // let name = formData.get('name');
        // let contact = formData.get('contact');
        // let city = formData.get('city');
        // let state = formData.get('state');
        // let land = formData.get('land');
        // let pincode = formData.get('pincode');
        let {name, contact, city, state, land, pincode}=formData

        let record = { name, contact, city, state, land, pincode };
     let data=await AddressUser.create(record);

    
    
};
