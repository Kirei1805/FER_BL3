import React, { useState, useMemo } from 'react';
import './App.css';
import { persons } from './person';

function App() {
  const [sortDirection, setSortDirection] = useState('asc');
  const [ageRange, setAgeRange] = useState({ min: '', max: '' });
  const [selectedSkill, setSelectedSkill] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const allSkills = useMemo(() => {
    const skillSet = new Set();
    persons.forEach(person => {
      person.skills.forEach(skill => skillSet.add(skill));
    });
    return Array.from(skillSet);
  }, []);

  const sortedPersons = useMemo(() => {
    return [...persons].sort((a, b) => {
      const compareResult = a.firstName.localeCompare(b.firstName);
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }, [sortDirection]);


  const filteredByAgeAndSkill = useMemo(() => {
    return persons.filter(({ age, skills }) => {
      const minAge = ageRange.min === '' ? 0 : parseInt(ageRange.min);
      const maxAge = ageRange.max === '' ? Infinity : parseInt(ageRange.max);
      const matchesAge = age >= minAge && age <= maxAge;
      const matchesSkill = selectedSkill === '' || skills.includes(selectedSkill);
      return matchesAge && matchesSkill;
    });
  }, [ageRange, selectedSkill]);


  const skillRanking = useMemo(() => {
    return persons.reduce((acc, { skills }) => {
      skills.forEach(skill => {
        acc[skill] = (acc[skill] || 0) + 1;
      });
      return acc;
    }, {});
  }, []);

  const sortedSkillRanking = useMemo(() => {
    return Object.entries(skillRanking)
      .sort(([, a], [, b]) => b - a);
  }, [skillRanking]);


  const searchAndSortedList = useMemo(() => {
    return persons
      .filter(person => {
        const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => {
     
        if (a.isActive !== b.isActive) return b.isActive ? 1 : -1;
    
        if (a.age !== b.age) return a.age - b.age;
  
        return a.lastName.localeCompare(b.lastName);
      });
  }, [searchTerm]);

  const statistics = useMemo(() => {
    const filteredPersons = searchAndSortedList;
    return {
      total: filteredPersons.length,
      averageAge: Math.round(
        filteredPersons.reduce((sum, p) => sum + p.age, 0) / filteredPersons.length
      ),
      activeCount: filteredPersons.filter(p => p.isActive).length
    };
  }, [searchAndSortedList]);

  return (
    <div className="App">
      <h1>Person Management</h1>

      <section>
        <h2>Person List</h2>
        <button onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}>
          Sort First Name {sortDirection === 'asc' ? 'A→Z' : 'Z→A'}
        </button>
        <ul>
          {sortedPersons.map(person => (
            <li key={person.id}>
              {person.firstName} {person.lastName}, Age: {person.age}, 
              City: {person.city}, Skills: {person.skills.join(', ')}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Filter by Age and Skill</h2>
        <input
          type="number"
          min="0"
          placeholder="Min Age"
          value={ageRange.min}
          onChange={e => {
            const value = parseInt(e.target.value);
            if (value >= 0 || e.target.value === '') {
              setAgeRange(prev => ({ ...prev, min: e.target.value }));
            }
          }}
        />
        <input
          type="number"
          min="0"
          placeholder="Max Age"
          value={ageRange.max}
          onChange={e => {
            const value = parseInt(e.target.value);
            if (value >= 0 || e.target.value === '') {
              setAgeRange(prev => ({ ...prev, max: e.target.value }));
            }
          }}
        />
        <select
          value={selectedSkill}
          onChange={e => setSelectedSkill(e.target.value)}
        >
          <option value="">Select Skill</option>
          {allSkills.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
        {filteredByAgeAndSkill.length === 0 ? (
          <p>No found.</p>
        ) : (
          <ul>
            {filteredByAgeAndSkill.map(person => (
              <li key={person.id}>
                {person.firstName} - {person.lastName} - {person.skills.join(', ')}
              </li>
            ))}
          </ul>
        )}
      </section>


      <section>
        <h2>Skill Ranking</h2>
        <table>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {sortedSkillRanking.map(([skill, count], index) => (
              <tr key={skill} style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}>
                <td>{skill}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Advanced Search and Statistics</h2>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <div className="statistics">
          <h3>Statistics</h3>
          <p>Total People: {statistics.total}</p>
          <p>Average Age: {statistics.averageAge}</p>
          <p>Active People: {statistics.activeCount}</p>
        </div>

        <ul>
          {searchAndSortedList.map(person => (
            <li key={person.id}>
              {person.firstName} {person.lastName} - Age: {person.age} 
              - {person.isActive ? 'Active' : 'Inactive'}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
