import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from './UserContext'; // Import UserContext

const EditPet = () => {
  const { petId } = useParams();
  const { user } = useContext(UserContext); // Use UserContext to access the logged-in user
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPetData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3010/api/pet/${petId}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data && user && data.owner === user._id) { // Check if the logged-in user is the owner of the pet
          setPet(data);
        } else {
          console.error('You are not authorized to view this pet');
          // Handle unauthorized access here
        }
      } catch (error) {
        console.error('Failed to fetch pet data:', error);
      }
    };

    fetchPetData();
  }, [petId, user]); // Include user in the dependency array

  if (!pet) {
    return <div>Loading pet information...</div>;
  }

  return (
    <div>
      <h1>{pet.name}</h1>
      <p>Breed: {pet.breed}</p>
      <p>Gender: {pet.gender}</p>
      <p>Birthdate: {pet.birthdate || 'Not specified'}</p>
      <p>Notes: {pet.notes}</p>
      {/* Additional pet details */}
    </div>
  );
};

export default EditPet;
