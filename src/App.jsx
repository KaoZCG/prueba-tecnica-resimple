import React from 'react'
import Layout from './components/Layout'
import KPIs from './components/KPIs'
import Filters from './components/Filters'
import DataTable from './components/DataTable'
import useWorkersData from './hooks/useWorkersData'

const App = () => {
  const { workers, companies, areas, loading, error, filters, setFilters } = useWorkersData()

  return (
    <Layout>
      <KPIs workers={workers} />
      <Filters 
        companies={companies} 
        areas={areas}
        filters={filters}
        setFilters={setFilters}
      />
      <DataTable 
        data={workers} 
        loading={loading}
        error={error}
      />
    </Layout>
  )
}

export default App