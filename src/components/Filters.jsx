import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import Select from 'react-select'

const Filters = ({ companies, areas, filters, setFilters }) => {
  // Maneja los cambios en los campos de los filtros y actualiza el estado correspondiente
  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  // Restaura los filtros a sus valores iniciales
  const resetFilters = () => {
    setFilters({
      company: '',
      area: '',
      searchTerm: '',
      minSalary: '',
      maxSalary: ''
    })
  }

  const areaOptions = [
    { value: '', label: 'Todas las áreas' },
    ...areas.map(area => ({ value: area, label: area }))
  ]

  const companyOptions = [
    { value: '', label: 'Todas las empresas' },
    ...companies.map(company => ({ value: company, label: company }))
  ]

  return (
    // Contenedor principal de los filtros de búsqueda
    <div className="filters-container p-4 mb-4 bg-white rounded shadow-sm">
      {/* Título de la sección de filtros */}
      <h5 className="mb-4">Filtros de búsqueda</h5>
      {/* Formulario con los distintos filtros disponibles */}
      <Form>
        <Row>
          {/* Filtro por empresa */}
          <Col md={6} lg={3} className="mb-3">
            <Form.Group>
              <Form.Label>Empresa</Form.Label>
              <Select
                options={companyOptions}
                value={companyOptions.find(opt => opt.value === filters.company)}
                onChange={selected => setFilters(prev => ({ ...prev, company: selected.value }))}
                placeholder="Todas las empresas"
                menuPlacement="auto"
                menuPortalTarget={document.body}
                styles={{
                  menu: base => ({
                    ...base,
                    maxHeight: '40vh',
                    overflowY: 'auto',
                    zIndex: 9999
                  }),
                  control: base => ({
                    ...base,
                    overflow: 'visible'
                  })
                }}
                theme={theme => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: 'rgba(0,161,154,0.15)', 
                    primary: '#00A19A',              
                  }
                })}
              />
            </Form.Group>
          </Col>
          {/* Filtro por área */}
          <Col md={6} lg={3} className="mb-3">
            <Form.Group>
              <Form.Label>Área</Form.Label>
              <Select
                options={areaOptions}
                value={areaOptions.find(opt => opt.value === filters.area)}
                onChange={selected => setFilters(prev => ({ ...prev, area: selected.value }))}
                placeholder="Todas las áreas"
                menuPlacement="auto"
                menuPortalTarget={document.body}
                styles={{
                  menu: base => ({
                    ...base,
                    maxHeight: '40vh',
                    overflowY: 'auto',
                    zIndex: 9999
                  }),
                  control: base => ({
                    ...base,
                    overflow: 'visible'
                  })
                }}
                theme={theme => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary25: 'rgba(0,161,154,0.15)', 
                    primary: '#00A19A',             
                  }
                })}
              />
            </Form.Group>
          </Col>
          {/* Filtro por RUT o nombre */}
          <Col md={6} lg={3} className="mb-3">
            <Form.Group>
              <Form.Label>RUT o Nombre</Form.Label>
              <Form.Control
                type="text"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleChange}
                placeholder="Buscar..."
              />
            </Form.Group>
          </Col>
          {/* Filtro por rango de sueldo */}
          <Col md={6} lg={3} className="mb-3">
            <Form.Group>
              <Form.Label>Rango de sueldo</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="number"
                  name="minSalary"
                  value={filters.minSalary}
                  onChange={handleChange}
                  placeholder="Mínimo"
                />
                <Form.Control
                  type="number"
                  name="maxSalary"
                  value={filters.maxSalary}
                  onChange={handleChange}
                  placeholder="Máximo"
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        {/* Botón para limpiar todos los filtros */}
        <div className="d-flex justify-content-end gap-2">
          <Button 
            variant="outline-secondary" 
            onClick={resetFilters}
          >
            Limpiar filtros
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Filters