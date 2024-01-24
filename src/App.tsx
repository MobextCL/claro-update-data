import { useEffect, useState } from "react";
import "./App.css";

const gridStyle = {
  display: "grid",
  gap: "1rem",
};

function Form({
  handleSubmit,
}: {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form style={gridStyle} onSubmit={handleSubmit}>
      <div style={gridStyle}>
        <label htmlFor="rut">Ingresa tu rut</label>
        <input type="text" placeholder="111111-1" name="rut" />
      </div>
      <div style={gridStyle}>
        <label htmlFor="client">Numero de cliente</label>
        <input type="text" placeholder="97823497234" name="client" />
      </div>
      <button>Verificar</button>
    </form>
  );
}

function App() {
  const [verificado, setVerificado] = useState(false);
  const [user, setUser] = useState({ rut: "", client: "" });
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userForm = Object.fromEntries(data) as {
      rut: string;
      client: string;
    };
    setUser(userForm);
    // comparamos con la db si esta ok verificado es true
    setVerificado(true);
  }
  return (
    <main>
      <h1>Actualizar datos</h1>
      {!verificado ? (
        <Form handleSubmit={handleSubmit} />
      ) : (
        <FormVerificado user={user} />
      )}
    </main>
  );
}

function FormVerificado({ user }: { user: { rut: string; client: string } }) {
  const [userData, setUserData] = useState({ name: "" });
  useEffect(() => {
    console.log("buscamos los datos del cliente para llenar el form");
    setUserData({ name: "Juan Perez" }); // simulamos la busqueda en la db
  }, []);

  function handleUpdateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userForm = Object.fromEntries(data) as {
      rut: string;
      client: string;
      name: string;
    };
    console.log(user.rut, userForm);
    console.log("con el rut vamos a la db y sustituimos los datos");
    return;
  }
  return (
    <div>
      <h2>Usuario Verificado</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <form onSubmit={handleUpdateUser}>
        <div style={gridStyle}>
          <label htmlFor="rut">Rut</label>
          <input
            type="text"
            placeholder="rut"
            name="rut"
            defaultValue={user.rut}
            disabled
          />
        </div>
        <div style={gridStyle}>
          <label htmlFor="client">NUmero CLiente</label>
          <input
            type="text"
            placeholder="client"
            name="client"
            defaultValue={user.client}
            disabled
          />
        </div>

        <div style={gridStyle}>
          <label htmlFor="client">Nombre</label>
          <input
            type="text"
            placeholder="client"
            name="client"
            defaultValue={userData.name}
          />
        </div>

        <button>Actualizar</button>
      </form>
    </div>
  );
}

export default App;
