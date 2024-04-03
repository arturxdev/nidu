"use client";
import { Transaction } from "@/entities/transaccions";
import dayjs from "dayjs";

type Props = {
  transactions: Transaction[]
}
export default function TransactionTable(props: Props) {
  const updateCategory = async (transaction: Transaction) => {
    try {

      const res = await fetch(`/api/transaction`, {
        method: 'PUT',
        body: JSON.stringify(transaction),
        headers: {
          contentType: 'application/json'
        }
      })
      if (res.status !== 200) throw new Error('Fallo al actualizar')
      const data = await res.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <table className="table mt-10 w-full">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Tarjeta</th>
          <th>Referencia</th>
          <th>Estatus</th>
          <th>Categoria</th>
          <th>Descripcion</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {props.transactions.map((transaction) => (
          <tr key={transaction.id}>
            <th>{dayjs(transaction.date).format("DD/MM/YYYY")}</th>
            <td>{transaction.amount}</td>
            <td>{transaction.card}</td>
            <td>{transaction.description}</td>
            <td>{transaction.status}</td>
            <td>
              <select className="select select-bordered w-full max-w-xs" defaultValue={transaction.category} onChange={(e) => { transaction.category = e.target.value }}>
                <option disabled >Selecciona categoria</option>
                <option>Ahorro</option>
                <option>Comida</option>
                <option>subscripcion</option>
                <option>libre</option>
                <option>Transporte</option>
                <option>Efectivo</option>
              </select>
            </td>
            <td>
              <input type="text" placeholder="Type here" defaultValue={transaction.descriptionUser} onChange={(e) => { transaction.descriptionUser = e.target.value }} className="input input-bordered w-full max-w-xs" />
            </td>
            <td>
              <button className="btn btn-neutral btn-xs" onClick={() => { updateCategory(transaction) }}>
                Guardar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
