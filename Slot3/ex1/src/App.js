import { useState } from 'react';
import './App.css';

function App() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('none');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', ...new Set(companies.map(company => company.category))];

  const filteredCompanies = companies
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || company.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case 'yearAsc':
          return a.start - b.start;
        case 'yearDesc':
          return b.start - a.start;
        case 'duration':
          return (a.end - a.start) - (b.end - b.start);
        default:
          return 0;
      }
    });

  return (
    <div className="App">
      <div className="controls" style={{ margin: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <div>
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '5px' }}
          />
        </div>

        <div>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ padding: '5px' }}
          >
            <option value="none">Sort by...</option>
            <option value="yearAsc">Year (Ascending)</option>
            <option value="yearDesc">Year (Descending)</option>
            <option value="duration">Duration</option>
          </select>
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{ padding: '5px' }}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredCompanies.length > 0 ? (
        <table style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Company Name</th>
              <th style={tableHeaderStyle}>Category</th>
              <th style={tableHeaderStyle}>Start Year</th>
              <th style={tableHeaderStyle}>End Year</th>
              <th style={tableHeaderStyle}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                <td style={tableCellStyle}>{company.name}</td>
                <td style={tableCellStyle}>{company.category}</td>
                <td style={tableCellStyle}>{company.start}</td>
                <td style={tableCellStyle}>{company.end}</td>
                <td style={tableCellStyle}>{company.end - company.start} years</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          No results found
        </div>
      )}
    </div>
  );
}

const tableHeaderStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '12px',
  borderBottom: '1px solid #ddd'
};

const tableCellStyle = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
  textAlign: 'left'
};
export default App;
