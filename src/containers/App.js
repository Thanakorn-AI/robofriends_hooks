import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

const App = () => {
  // State for robots and search field
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  // Fetch robots data on component mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users));
  }, []); // Empty dependency array ensures this runs only once

  // Event handler for search input
  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
  };

  // Filter robots based on search field
  const filteredRobots = robots.filter(robot =>
    robot.name.toLowerCase().includes(searchfield.toLowerCase())
  );

  return !robots.length ? (
    <h1>Loading</h1>
  ) : (
    <div className='tc'>
      <h1 className='f1'>RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardList robots={filteredRobots} />
      </Scroll>
    </div>
  );
};

export default App;
