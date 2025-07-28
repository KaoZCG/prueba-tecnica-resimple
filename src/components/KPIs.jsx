import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'

const KPIs = ({ workers }) => {
  // Se calculan los indicadores clave de desempeño (KPIs) a partir de la lista de trabajadores recibida por props.
  // Esto incluye el total de trabajadores, el total de empresas distintas, el total de áreas distintas y la suma total de sueldos.
  const totalWorkers = workers.length
  const totalCompanies = [...new Set(workers.map(w => w.NOMBRE_EMPRESA))].length
  const totalAreas = [...new Set(workers.map(w => w.NOMBRE_AREA))].length
  const totalSalaries = workers.reduce((sum, worker) => sum + worker.SUELDO, 0)

  return (
    // Sección de KPIs principales, cada uno en una tarjeta con ícono y valor destacado.
    <Row className="mb-4 g-4">
      <Col md={6} lg={3}>
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="bg-resimple-accent rounded-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="text-resimple-dark fs-6 fw-bold">Gastos Totales</Card.Title>
                <Card.Text className="text-resimple-primary fs-3 fw-bold mb-0">
                  ${totalSalaries.toLocaleString()}
                </Card.Text>
              </div>
              <div className="bg-resimple-primary rounded-circle p-3">
                <i className="bi bi-currency-dollar text-white fs-4"></i>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="bg-resimple-accent rounded-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="text-resimple-dark fs-6 fw-bold">Trabajadores</Card.Title>
                <Card.Text className="text-resimple-primary fs-3 fw-bold mb-0">
                  {totalWorkers}
                </Card.Text>
              </div>
              <div className="bg-resimple-primary rounded-circle p-3">
                <i className="bi bi-people-fill text-white fs-4"></i>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="bg-resimple-accent rounded-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="text-resimple-dark fs-6 fw-bold">Empresas</Card.Title>
                <Card.Text className="text-resimple-primary fs-3 fw-bold mb-0">
                  {totalCompanies}
                </Card.Text>
              </div>
              <div className="bg-resimple-primary rounded-circle p-3">
                <i className="bi bi-building text-white fs-4"></i>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} lg={3}>
        <Card className="border-0 shadow-sm h-100">
          <Card.Body className="bg-resimple-accent rounded-3">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title className="text-resimple-dark fs-6 fw-bold">Áreas</Card.Title>
                <Card.Text className="text-resimple-primary fs-3 fw-bold mb-0">
                  {totalAreas}
                </Card.Text>
              </div>
              <div className="bg-resimple-primary rounded-circle p-3">
                <i className="bi bi-diagram-3 text-white fs-4"></i>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default KPIs