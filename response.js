const response = (statusCode, message, data, res) => {
    res.json([
        {
            statusCode,
            message,
            data
        }
    ])
}

export default response