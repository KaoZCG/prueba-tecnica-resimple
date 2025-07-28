// Este componente define la estructura general de la aplicación, incluyendo el header con el título y la descripción,
// y un contenedor principal donde se renderizan los componentes hijos (children) que representan el contenido de cada página.
const Layout = ({ children }) => {
  return (
    <div className="resimple-theme">
      <header className="header py-4 mb-4">
        <div className="container">
          <h1 className="display-5 fw-bold">ReSimple</h1>
          <p className="lead text-muted">Prueba técnica - Visualización de datos</p>
        </div>
      </header>
      <main className="container">
        {children}
      </main>
    </div>
  )
}

export default Layout