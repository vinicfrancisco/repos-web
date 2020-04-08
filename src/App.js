import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/repositories');

        setRepos(response.data);
      } catch (error) {
        alert('Falha ao carregar repositórios')
      }
    }

    loadData();
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Repositório',
      url: 'https://github.com/vinicfrancisco/repos-web',
      techs: ['React', 'ReactJS', 'React-Native', 'NodeJS'],
    });

    setRepos([...repos, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepos(repos.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map((repo) => (
          <li key={String(repo.id)}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
