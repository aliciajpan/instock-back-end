export const missedProperties = (warehouse) => {
    const requiredProperties = ['warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email'];
    const missingProperties = requiredProperties.filter(property => !warehouse.hasOwnProperty(property));
    if (missingProperties.length > 0) {
        console.log('Missing required properties:', missingProperties);
        return missingProperties;
    }
	return null;
};

export const havingValidEmail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return emailRegex.test(email);
}; 

export const havingValidPhone = (phone) => {
    const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    return phoneRegex.test(phone);
};