export const missedProperties = (propertiesRequired, obj) => {
    const missingProperties = propertiesRequired.filter(property =>
        !obj.hasOwnProperty(property)
        || obj[property] === null
        || obj[property] === undefined
        || obj[property].trim() === ''
        );

    if (missingProperties.length > 0) {
        console.log('Missing required properties:', missingProperties);
        return missingProperties;
    }

    return null;
}

export const missedPropertiesWarehouse = (warehouse) => {
    const requiredProperties = ['warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email'];
    return missedProperties(requiredProperties, warehouse);
};

export const missedPropertiesInventory = (inventory) => {
    const requiredProperties = ['warehouse_id', 'item_name', 'description', 'category', 'status', 'quantity'];
    return missedProperties(requiredProperties, inventory);
};

export const havingValidEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return emailRegex.test(email);
}; 

export const havingValidPhone = (phone) => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return phoneRegex.test(phone);
};