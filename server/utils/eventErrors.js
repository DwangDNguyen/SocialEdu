const handleEventErrors = (error, res) => {
    const schemaErrors = { title: "", start: "", end: "" };
    if (error.errors) {
        Object.values(error.errors).forEach((error) => {
            schemaErrors[error.properties.path] = error.properties.message;
        });
        return res.status(500).json(schemaErrors);
    } else if (error.code == 11000) {
        console.log(error);
        schemaErrors[Object.keys(error.keyPattern)[0]] = `This is a duplicate ${
            Object.keys(error.keyPattern)[0]
        }. please enter a new one`;
        return res.status(500).json(schemaErrors);
    } else {
        return res.status(500).json("something went wrong");
    }
};

export default handleEventErrors;
