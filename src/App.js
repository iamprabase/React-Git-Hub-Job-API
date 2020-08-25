import React, { useState } from 'react';
import useJobsApi from "./hooks/useJobsApi";
import { Container, Row } from "react-bootstrap";
import Job from './components/Job'
import JobPagination from './components/JobPagination';
import SearchForm from './components/SearchForm';

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1);
  
  const { jobs, loading, errors, hasNextPage } = useJobsApi(params, page);
  
  const handleParamsChange = (e) => {
    const params = e.target.name;
    const value = e.target.value;
    setPage(1);
    setParams(prevParams => {
      return {...prevParams, [params]: value}
    })
  }
  
  return (
    <Container>
      <Row>
        {errors && (
          <div className="errors">
            <h2>{errors}</h2>
          </div>
        )}
        {loading && (
          <div className="loading">
            <h2>{loading}</h2>
          </div>
        )}

        <div className="jobs">
          <h1>GitHub Jobs</h1>
          <SearchForm params={params} onParamsChange={handleParamsChange}/>
          <JobPagination page={page} setPage={setPage} hasNextPage={hasNextPage}/>
          { jobs.map(job => {
            return <Job key={job.id} job={job} />
          }) }
        </div>
      </Row>
    </Container>
  );
}

export default App;
