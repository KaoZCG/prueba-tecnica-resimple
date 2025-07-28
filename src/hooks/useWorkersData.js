import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx'
import axios from 'axios'

const useWorkersData = () => {
  // Estados para almacenar los datos de trabajadores, empresas, áreas, estado de carga, error y filtros activos
  const [workers, setWorkers] = useState([])
  const [companies, setCompanies] = useState([])
  const [areas, setAreas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    company: '',
    area: '',
    searchTerm: '',
    minSalary: '',
    maxSalary: ''
  })

  useEffect(() => {
    // Este efecto se encarga de cargar y procesar los datos desde los archivos entregados (Excel y JSON)
    // Al finalizar, deja los datos listos para ser usados en la app y para los filtros
    const fetchData = async () => {
      try {
        // Cargar el diccionario de datos (estructura de empresas y áreas)
        const dictResponse = await axios.get('/diccionario-de-datos.json')
        const dictionary = dictResponse.data.EMPRESAS

        // Cargar y leer el archivo Excel con los datos de los trabajadores
        const excelResponse = await fetch('/origen-datos-junior.xlsx')
        const arrayBuffer = await excelResponse.arrayBuffer()
        const workbook = XLSX.read(arrayBuffer)
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const rawData = XLSX.utils.sheet_to_json(worksheet)

        // Procesar los datos crudos del Excel, asociando cada trabajador con su empresa y área
        // y normalizando los campos que se mostrarán en la app
        const processedData = rawData.map(item => {
          const company = dictionary.find(c => c.ID_EMPRESA == item.ID_EMPRESA)
          const area = company?.AREAS.find(a => a.ID_AREA === item.ID_AREA)
          
          return {
            ...item,
            NOMBRE_EMPRESA: company?.NOMBRE_EMPRESA || 'Desconocida',
            NOMBRE_AREA: area?.NOMBRE_AREA || 'Desconocida',
            SUELDO: area?.SUELDO || 0,
            EDAD: parseInt(item.EDAD) || 0
          }
        })

        // Extraer listas únicas de empresas y áreas para poblar los filtros del frontend
        const uniqueCompanies = [...new Set(processedData.map(item => item.NOMBRE_EMPRESA))]
        const uniqueAreas = [...new Set(processedData.map(item => item.NOMBRE_AREA))]

        setWorkers(processedData)
        setCompanies(uniqueCompanies)
        setAreas(uniqueAreas)
        setLoading(false)
      } catch (err) {
        setError(`Error al cargar datos: ${err.message}`)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Aplica los filtros seleccionados por el usuario sobre la lista de trabajadores
  // Permite filtrar por empresa, área, término de búsqueda (nombre o RUT) y rango de sueldo
  const filteredWorkers = workers.filter(worker => {
    const matchesCompany = !filters.company || worker.NOMBRE_EMPRESA === filters.company
    const matchesArea = !filters.area || worker.NOMBRE_AREA === filters.area
    const matchesSearch = !filters.searchTerm || 
      worker.NOMBRE_TRABAJADOR.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      worker.RUT_TRABAJADOR.includes(filters.searchTerm)
    const matchesSalary = (
      (!filters.minSalary || worker.SUELDO >= parseInt(filters.minSalary)) &&
      (!filters.maxSalary || worker.SUELDO <= parseInt(filters.maxSalary))
    )
    
    return matchesCompany && matchesArea && matchesSearch && matchesSalary
  })

  // Devuelve los datos filtrados y los métodos para usarlos en los componentes de la app
  return { 
    workers: filteredWorkers, 
    companies, 
    areas, 
    loading, 
    error,
    filters,
    setFilters
  }
}

export default useWorkersData