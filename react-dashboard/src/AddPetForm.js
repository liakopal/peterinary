
function AddPetForm() {
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would handle the submission, e.g., send data to your server
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="petType">Pet Type:</label>
        <select id="petType" name="type" required>
          <option value="Cat">Cat</option>
          <option value="Dog">Dog</option>
        </select>
      </div>
      
      {/* Repeat for other fields */}
      
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddPetForm;
