module.exports = {
    // Getter function to be used in Thought model and Reactions schema
    formatTimestamp(date) {
        return new Date(date).toLocaleString();
    }
}