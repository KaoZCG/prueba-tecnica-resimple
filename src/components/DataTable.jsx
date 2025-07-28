import React, { useState } from 'react'
import { Table, Pagination, Button } from 'react-bootstrap'
import * as XLSX from 'xlsx'

const DataTable = ({ data, loading, error }) => {
  // Estado para la página actual de la tabla
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Cálculo de la cantidad total de páginas y los datos a mostrar en la página actual
  const totalPages = Math.ceil(data.length / itemsPerPage)
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Función para exportar los datos actuales a un archivo Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
      'Empresa': item.NOMBRE_EMPRESA,
      'Área': item.NOMBRE_AREA,
      'RUT': item.RUT_TRABAJADOR,
      'Nombre': item.NOMBRE_TRABAJADOR,
      'Edad': item.EDAD,
      'Profesión': item.PROFESION || 'No especificado',
      'Cargo': item.CARGO,
      'Sueldo': `$${item.SUELDO.toLocaleString()}`
    })))
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trabajadores")
    XLSX.writeFile(workbook, "trabajadores_resimple.xlsx")
  }

  // Renderizado condicional para mostrar mensajes de carga, error o sin resultados
  if (loading) return <div className="text-center py-4">Cargando datos...</div>
  if (error) return <div className="alert alert-danger">{error}</div>
  if (data.length === 0) return <div className="alert alert-info">No se encontraron resultados</div>

  return (
    // Contenedor principal de la tabla de trabajadores
    <div className="table-container bg-white rounded-3 shadow-sm p-4 mb-4">
      {/* Encabezado con título y botón de exportación */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="text-resimple-dark fw-bold">
          Listado de trabajadores ({data.length} resultados)
        </h5>
        <Button variant="resimple-primary" onClick={exportToExcel}>
          <i className="bi bi-download me-2"></i>
          Exportar a Excel
        </Button>
      </div>

      {/* Tabla de datos con encabezados y filas */}
      <div className="table-responsive">
        <Table striped hover className="align-middle">
          <thead className="bg-resimple-accent">
            <tr>
              <th>Empresa</th>
              <th>Área</th>
              <th>RUT</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Profesión</th>
              <th>Cargo</th>
              <th>Sueldo</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center text-muted">
                  No se han encontrado datos
                </td>
              </tr>
            ) : (
              paginatedData.map((worker, index) => (
                <tr key={index}>
                  <td>{worker.NOMBRE_EMPRESA}</td>
                  <td>{worker.NOMBRE_AREA}</td>
                  <td>{worker.RUT_TRABAJADOR}</td>
                  <td>{worker.NOMBRE_TRABAJADOR}</td>
                  <td>{worker.EDAD}</td>
                  <td>{worker.PROFESION || '-'}</td>
                  <td>{worker.CARGO}</td>
                  <td>${worker.SUELDO.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* Paginación para navegar entre páginas de resultados */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div className="text-muted">
            Página {currentPage} de {totalPages}
          </div>
          <Pagination>
            <Pagination.Prev 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
            />
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 
                ? i + 1 
                : currentPage >= totalPages - 2 
                  ? totalPages - 4 + i 
                  : currentPage - 2 + i
              return (
                <Pagination.Item
                  key={page}
                  active={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Pagination.Item>
              )
            })}
            <Pagination.Next 
              disabled={currentPage === totalPages} 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
            />
          </Pagination>
        </div>
      )}
    </div>
  )
}

export default DataTable