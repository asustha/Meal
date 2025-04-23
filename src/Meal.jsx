import React, { useState, useEffect } from 'react';
import './MealSearch.css';

const Meal = () => {
  const [search, setSearch] = useState('');
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (search.trim() === '') {
      setMeal(null);
      setError('');
      return;
    }

    const timer = setTimeout(() => {
      const fetchMeal = async () => {
        try {
          const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
          const data = await res.json();
          if (data.meals) {
            setMeal(data.meals[0]);
            setError('');
          } else {
            setMeal(null);
            setError('No meals found');
          }
        } catch (err) {
          console.error(err);
          setError('Something went wrong');
        }
      };

      fetchMeal();
    }, 500); 

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="meal-container">
      <h1> Meal Finder</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Type a meal name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {meal && (
        <div className="meal-info">
          <h2>{meal.strMeal}</h2>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <p>{meal.strInstructions}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Meal;
