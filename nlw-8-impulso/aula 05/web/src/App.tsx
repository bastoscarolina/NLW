import { Widget } from "./components/widget";

export function App(){
  return <Widget/>
}

/*import { useState } from 'react'
interface ButtonProps {
  text?:string; //a ? deixa a propriedade opcional
}

function Button(props: ButtonProps){
  return <button className='button'>{props.text ?? 'Qual foi?'} </button> // depois do ?? vc coloca o valor default para caso nenhum parametro seja passado
}

function App() {
  return <div className='flex gap-1'>
    <Button text='Enviar'/>
    <Button text='Cancelar'/>
    <Button text='Atualizar'/>
    <Button/>
  </div>
}

export default App
*/