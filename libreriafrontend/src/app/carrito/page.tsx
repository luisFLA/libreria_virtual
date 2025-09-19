"use client";
import { useCarrito } from "../Context/carrito-context";

export default function CarritoPage() {
  const { items, quitar, vaciar, confirmar, total } = useCarrito();
  return (
    <main className="container" style={{ padding: 32, minHeight: 400 }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>Carrito</h1>
      {items.length === 0 ? (
        <div className="muted" style={{ textAlign: "center", margin: 40 }}>Tu carrito está vacío.</div>
      ) : (
        <>
          <table style={{ width: "100%", marginBottom: 24 }}>
            <thead>
              <tr style={{ textAlign: "left", background: "#fafafa" }}>
                <th style={{ padding: 8 }}>Libro</th>
                <th style={{ padding: 8 }}>Cantidad</th>
                <th style={{ padding: 8 }}>Precio</th>
                <th style={{ padding: 8 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id_libro}>
                  <td style={{ padding: 8 }}>{item.titulo}</td>
                  <td style={{ padding: 8 }}>{item.cantidad}</td>
                  <td style={{ padding: 8 }}>L. {item.precio ?? 0}</td>
                  <td style={{ padding: 8 }}>
                    <button className="btn" onClick={() => quitar(item.id_libro)}>Quitar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <button className="btn" onClick={vaciar}>Vaciar carrito</button>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Total: L. {total}</div>
            <button className="btn btn-primary" onClick={async () => { await confirmar(); alert('¡Pedido realizado!'); }}>Confirmar pedido</button>
          </div>
        </>
      )}
    </main>
  );
}
