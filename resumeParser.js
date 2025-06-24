const fs = require("fs");

const extractText = (filePath) => {
    const content = fs.readFileSync(filePath, "utf-8");
    return {
        name: "Sample Name",
        email: "sample@example.com",
        skills: "JavaScript, Node.js",
        experience: "2 years at XYZ",
    };
};

module.exports = { extractText };