import React, { useState, useEffect } from 'react';
import axios from 'axios';
const URL = `${window.location.protocol}//${window.location.hostname}:8000`;

const APARTAMENTOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function RadioApartamentos(props) {
  return (<div>{APARTAMENTOS.map(name => (
    <div className="control" key={name}>
      <label className="radio">
        <input className="radio" type="radio" name="apartamento" value={name} onChange={e => props.onChange(e.target.value)} />
        Apartamento {name}
      </label>
    </div>
  ))}</div>);
}

function Apartamentos() {
  const [visitante, setVisitante] = useState("");
  const [apartamento, setApartamento] = useState(0);
  const [state, setState] = useState(true);

  useEffect(() => {
    if(!state){
      setState(true);
    }
  });

  const avisar = () => {
    const callback = (res) => {
      alert(res.data);
      setApartamento(0);
      setVisitante('');
      setState(false);//Invalidando o state para não renderizar mais a lista. (Para renderizar a mesma atualizada posteriormente pelo useEffect)
    };
    if (apartamento) {
      console.log(`Avisando o apartamento ${apartamento} que o ${visitante} chegou!`);

      if (!visitante) {
        axios.get(`${URL}/door/${apartamento}`).then(callback);
      } else {
        axios.get(`${URL}/door/${apartamento}/${visitante}`).then(callback);
      }
    } else {
      alert("Apartamento não selecionado!");
    }
  };

  return (
    <div className="content">
      <div className="box">
        <h1>Os moradores serão notificados via Telegram</h1>
        <p>Os moradores receberão uma mensagem no telegram informando que existe alguém na porta, você tem a opção de se identificar.</p>
      </div>
      <form className="box">
        <div className="field">
          <label className="label">Visitante</label>
          <div className="control">
            <input className="input" type="text" placeholder="Visitante" value={visitante} onChange={e => setVisitante(e.target.value)} />
          </div>
        </div>

        {(state ? <RadioApartamentos value={apartamento} onChange={setApartamento} /> : <span></span>)}

        <button type="button" className="button is-primary" onClick={avisar}>Avisar</button>
      </form>
    </div>
  );
}

export default Apartamentos;
